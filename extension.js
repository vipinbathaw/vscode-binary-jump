// vscode module contains the VS Code extensiblity API
const vscode = require('vscode');

// implementation of left jump command
binaryLeftJump = () => {
    vscode.window.showInformationMessage('left :\\');
}

// implementation of right jump command
binaryRightJump = () => {
    vscode.window.showInformationMessage('right :/');
}

// activate function is executed when the extension is activated
exports.activate = (context) => {
    let sub = context.subscriptions;
    // registering command for left jump shortcut key
    sub.push(vscode.commands.registerCommand('binaryJump.binaryLeftJump', binaryLeftJump));
    // registering command for right jump shortcut key
    sub.push(vscode.commands.registerCommand('binaryJump.binaryRightJump', binaryRightJump));
};

// deactivate function is executed when the extension is deactivated
exports.deactivate = () => {
    console.log(':\'(');
}
