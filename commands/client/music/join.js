module.exports = {
    name: "join",
    aliases: "connect",
    $if: "old",
    code: `
$joinVC
$cooldown[3s;]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
