# Binary Jump
Binary Jump is a VS Code extension that helps in faster code navigation by allowing you to jump half the distance from current cursor to either direction.

## How it work
Below are the shortcut keys to use this extension.

#### Left Jump
| Shortcut Keys | Platform |
| ------------- | -------- |
| `ctrl+alt+meta+left` | Windows or Unix |
| `ctrl+cmd+alt+left` | Mac |

#### Right Jump
| Shortcut Keys | Platform |
| ------------- | -------- |
| `ctrl+alt+meta+right` | Windows or Unix |
| `ctrl+cmd+alt+right` | Mac |

`meta` key is same as the window sign key on your keyboard.
To help understand better how it works and how it is useful, let's see it in action.

![](https://raw.githubusercontent.com/vipinbathaw/binary-jump/master/img/binary-jump-left.gif)

In above code if you want to change the text `Applying options` you can go the start of the line by pressing home button then do block jumps using `ctrl+right` but that will still take 3-4 keypresses to get there.
By using binary jump you can get there in 2 keypresses using a left jump (`ctrl+alt+meta+left`) and then one block jump (`ctrl+left`)

Here's another example where let's say you want to change the parameters of the replace_components function. You can do a binary jump at opt and then one block jump

![](https://raw.githubusercontent.com/vipinbathaw/binary-jump/master/img/binary-jump-right.gif)

You can use custom keybindings for the jumps by assigning your keys to the commands `binaryJump.binaryRightJump` and `binaryJump.binaryLeftJump`
