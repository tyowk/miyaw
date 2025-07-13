module.exports = {
    name: "exec",
    aliases: "ex",
    code: `
$reply[$messageId;false]
$description[\`\`\`js
 
$textTrim[$textSlice[$nonEscape[$replaceText[$replaceText[$exec[$message];#SEMI#;⁏];\`\`\`;ˋˋˋ]];0;1900]]
\`\`\`]
$addButton[1;Delete;danger;delete;false]
$onlyIf[$authorId==1009314804525178920;]
`
};
