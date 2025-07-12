module.exports = {
    name: "play",
    $if: "old",
    code: `
$cooldown[3s;]
$description[Added to Queue $songInfo[title;$queueLength]]
$playTrack[$message;youtube]
$if[$hasPlayer==false]
$joinVC
$else
$onlyIf[$voiceId==$voiceId[$clientId];{newEmbed:{description:You are not in the same voice channel!}}{deleteIn:5s}{suppress}]
$endif
$onlyIf[$message!=;{newEmbed:{description:Please provide a valid song title or url!}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
