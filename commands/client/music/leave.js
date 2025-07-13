module.exports = {
    name: "disconnect",
    aliases: ["leave", "dc", "stop"],
    $if: "old",
    code: `
$isInteraction
$reply[$messageId;false]
$if[$hasPlayer==true&&$getGuildVar[247]==false]
$leaveVC
$description[Exiting the voice channel, bye bye!]
$else
$if[$playerStatus==playing]
$stopTrack
$endif
$description[24/7 mode is active, I can't exit the voice channel!]
$color[Red]
$endif
$cooldown[3s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId==$voiceId[$clientId];{newEmbed:{description:You are not in the same voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:There are no active players on this server!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
