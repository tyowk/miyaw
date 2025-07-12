module.exports = {
    name: "djseval",
    aliases: "djs",
    code: `
$reply[$messageId;false]
$description[\`\`\`js
$textTrim[$textSlice[$nonEscape[$djsEval[$message;true]];0;1900]]
\`\`\`]
$addButton[1;Delete;danger;delete;false]
$onlyIf[$authorId==1009314804525178920;]
`
};
