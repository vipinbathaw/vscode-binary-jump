// vscode module contains the VS Code extensiblity API
const vscode = require('vscode');

doJump = direction => {

    // get the active text editor
    const editor = vscode.window.activeTextEditor;

    // we can jump only if there is some file opened isn't it :x
    if (!editor || !editor.document) return;

    // make sure there is no selection
    if (!editor.selection.isEmpty) return;

    // get the current position, it gives the line and character where the cursor is
    const position = editor.selection.active;

    let newPosition = null;
    let cursorPosition = position.character;
    let lineText = editor.document.lineAt(position.line).text;

    // make sure there is some text to work on
    if (lineText.trim().length < 1) return;

    switch (direction) {
        case 'left':
            // remove whitespaces from start of the string
            var text = lineText.replace(/^\s+/g, '');
            // calculate the left half position
            var positionHalf = Math.floor((cursorPosition - (lineText.length - text.length)) / 2);
            // create new position using existing position
            newPosition = position.with(position.line, cursorPosition - positionHalf);
            break;
        case 'right':
            // remove whitespace from right of the current line text
            var text = lineText.replace(/\s+$/g, '');
            // calculate the right half position
            var positionHalf = cursorPosition + Math.ceil((text.length - cursorPosition) / 2);
            // create new position using existing position
            newPosition = position.with(position.line, positionHalf);
            break;

        default:
            vscode.window.showInformationMessage('You should reinstall the binary-jump extension, it\'s behaving weird :/');
            break;
    }

    // create new selection for updating
    if (newPosition != null) {
        var newSelection = new vscode.Selection(newPosition, newPosition);
        // finally update the current selection
        editor.selection = newSelection;
    }
}

// activate function is executed when the extension is activated
exports.activate = (context) => {
    let sub = context.subscriptions;
    // registering command for left jump shortcut key
    sub.push(vscode.commands.registerCommand('binaryJump.binaryLeftJump', () => { doJump('left') }));
    // registering command for right jump shortcut key
    sub.push(vscode.commands.registerCommand('binaryJump.binaryRightJump', () => { doJump('right') }));
};

// deactivate function is executed when the extension is deactivated
exports.deactivate = () => {
    console.log(':\'(');
}
