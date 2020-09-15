// vscode module contains the VS Code extensiblity API
const vscode = require('vscode');

// The position before any calls to binaryjump are made, cleard when user moves cursor
// Needed for chaining commands
let lastPosition = null;
let lastDirection = null;
let positionStart = null;
let positionEnd = null;
let newPosition = null;

// if user moves position reset binary jump chain, needed to keep track of last position before jumps
const activeEditorChangeListener = vscode.window.onDidChangeTextEditorSelection(e => {
    if (newPosition !== null && !newPosition.isEqual(vscode.window.activeTextEditor.selection.active))
        lastPosition = null;
});

doJump = direction => {
    // get the active text editor
    const editor = vscode.window.activeTextEditor;

    // we can jump only if there is some file opened isn't it :x
    if (!editor || !editor.document) return;

    // make sure there is no selection
    if (!editor.selection.isEmpty) return;

    // make sure there is a range
    if (editor.visibleRanges.length === 0) return;

    const isVerticalMovement = d => d === 'up' || d === 'down';
    const isHorizontalMovement = d => d === 'left' || d === 'right';

    // chech if 2 directions are both vertical or both horiaontal
    const isSameOrientation = (d1, d2) =>
        (isVerticalMovement(d1) && isVerticalMovement(d2)) || (isHorizontalMovement(d1) && isHorizontalMovement(d2));

    // if direction changes reset
    if (!isSameOrientation(direction, lastDirection)) lastPosition = null;

    // get the current position, it gives the line and character where the cursor is
    const position = editor.selection.active;
    const range = editor.visibleRanges[0];

    // Calculate text positions
    const lineText = editor.document.lineAt(position.line).text;
    const lineTextNoWhiteSpace = lineText.replace(/^\s+/g, '');
    const whiteSpaceLength = lineText.length - lineTextNoWhiteSpace.length;

    // Init top and bottom of file position as well as start and end of line, relative to current cursor position
    const topVisible = range.start;
    const bottomVisible = range.end;
    const startLine = position.with(position.line, whiteSpaceLength);
    const endLine = position.with(position.line, lineText.length);

    //  If lastPosition is null this means the user made some inputs, now begin a new jumping chain
    if (lastPosition === null) {
        if (isHorizontalMovement(direction)) {
            positionStart = startLine;
            positionEnd = endLine;
        } else {
            positionStart = topVisible;
            positionEnd = bottomVisible;
        }
    } else {
        // use the last binary jump position to calculate the the current jump
        positionStart = position.compareTo(lastPosition) < 0 ? positionStart : lastPosition;
        positionEnd = position.compareTo(lastPosition) > 0 ? positionEnd : lastPosition;
    }

    // Set last position and direction, will be used the next time this fucntion is called
    lastPosition = position;
    lastDirection = direction;

    // Find middle of 2 positions
    const middle = (pos1, pos2) => {
        return new vscode.Position(
            Math.floor((pos1.line + pos2.line) / 2),
            Math.floor((pos1.character + pos2.character) / 2)
        );
    };

    switch (direction) {
        case 'left':
        case 'up':
            newPosition = middle(positionStart, position);
            break;
        case 'right':
        case 'down':
            newPosition = middle(positionEnd, position);
            break;
        default:
            vscode.window.showInformationMessage(
                "You should reinstall the binary-jump extension, it's behaving weird :/"
            );
            break;
    }

    // create new selection for updating
    if (newPosition != null) {
        var newSelection = new vscode.Selection(newPosition, newPosition);
        // finally update the current selection
        editor.selection = newSelection;
    }
};

// activate function is executed when the extension is activated
exports.activate = context => {
    let sub = context.subscriptions;
    // registering command for left jump shortcut key
    sub.push(
        vscode.commands.registerCommand('binaryJump.binaryLeftJump', () => {
            doJump('left');
        })
    );
    // registering command for right jump shortcut key
    sub.push(
        vscode.commands.registerCommand('binaryJump.binaryRightJump', () => {
            doJump('right');
        })
    );
    // registering command for up jump shortcut key
    sub.push(
        vscode.commands.registerCommand('binaryJump.binaryUpJump', () => {
            doJump('up');
        })
    );
    // registering command for down jump shortcut key
    sub.push(
        vscode.commands.registerCommand('binaryJump.binaryDownJump', () => {
            doJump('down');
        })
    );
    // registering command for up jump shortcut key
    sub.push(activeEditorChangeListener);
};

// deactivate function is executed when the extension is deactivated
exports.deactivate = () => {
    console.log(":'(");
};
