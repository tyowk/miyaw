module.exports = {
    name: "skip",
    aliases: "sk",
    $if: "old",
    code: `
$isInteraction
$reply[$messageId;false]
$if[$hasPlayer==true&&$playerStatus==playing]
$description[Skipped to the next track]
$skipTrack
$endif
$cooldown[3s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId==$voiceId[$clientId];{newEmbed:{description:You are not in the same voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:There are no active players on this server!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
