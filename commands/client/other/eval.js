module.exports = {
    name: "eval",
    aliases: "e",
    code: `
	$description[\`\`\`js
$textTrim[$textSlice[$nonEscape[$eval[$message;true;true;true;true;true]];0;1900]]
\`\`\`]
$addButton[1;Delete;danger;delete;false]
$onlyIf[$authorId==1009314804525178920;]`
};
