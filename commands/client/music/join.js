module.exports = {
    name: "connect",
    aliases: "join",
    $if: "old",
    code: `
$isInteraction
$reply[$messageId;false]
$joinVC
$description[Joined <#$voiceId>!]
$cooldown[3s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
