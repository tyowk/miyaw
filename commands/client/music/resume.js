module.exports = {
    name: "resume",
    $if: "old",
    code: `
$cooldown[3s;]
$if[$playerStatus==paused]
$description[Resumed the player]
$resumeTrack
$endif
$onlyIf[$voiceId==$voiceId[$clientId];{newEmbed:{description:You are not in the same voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:There are no active players on this server!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
