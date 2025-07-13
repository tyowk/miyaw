module.exports = {
    name: "reload",
    aliases: "re",
    code: `
$reply[$messageId;false]
$description[Reloaded $commandsCount commands!]
$updateCommands
$onlyIf[$authorId==1009314804525178920;]
`
};
