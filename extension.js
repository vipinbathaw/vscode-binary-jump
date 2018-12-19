const vscode = require('vscode');

binaryLeftJump = () => {
    vscode.window.showInformationMessage('left :\\');
}

binaryRightJump = () => {
    vscode.window.showInformationMessage('right :/');
}

exports.activate = (context) => {
    let sub = context.subscriptions;
    sub.push(vscode.commands.registerCommand('binaryJump.binaryLeftJump', binaryLeftJump));
    sub.push(vscode.commands.registerCommand('binaryJump.binaryRightJump', binaryRightJump));
};
