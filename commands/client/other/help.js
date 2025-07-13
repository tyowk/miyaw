module.exports = {
    name: "help",
    aliases: "h",
    code: `
$isInteraction
$reply[$messageId;false]
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
$cooldown[3s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
