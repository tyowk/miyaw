module.exports = {
    name: "pause",
    $if: "old",
    code: `
$isInteraction
$reply[$messageId;false]
$if[$playerStatus==playing]
$description[Paused the player]
$pauseTrack
$endif
$cooldown[3s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$onlyIf[$playerStatus!=destroyed;{newEmbed:{description:No tracks are currently playing!}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId==$voiceId[$clientId];{newEmbed:{description:You are not in the same voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:There are no active players on this server!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
