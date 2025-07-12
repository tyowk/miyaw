module.exports = {
    name: "exec",
    aliases: "ex",
    code: `
$reply[$messageId;false]
$description[\`\`\`js
$textTrim[$textSlice[$nonEscape[$exec[$message]];0;1900]]
\`\`\`]
$addButton[1;Delete;danger;delete;false]
$onlyIf[$authorId==1009314804525178920;]
`
};
