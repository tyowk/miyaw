module.exports = {
    name: "help",
    aliases: "h",
    code: `
$reply[$messageId;false]
$cooldown[3s;]
$thumbnail[$userAvatar[$clientId]]
$addField[Other Commands;\`\`\`
eval, exec, djseval, ping
\`\`\`]
$addField[Playground;\`\`\`
Coming soon!
\`\`\`]
$addField[Music Commands;\`\`\`
play, resume, pause, skip, disconnect, connect, stop, nowplaying, 247
\`\`\`]
$color[Green]
$suppressErrors
`
};
