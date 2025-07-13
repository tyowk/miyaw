module.exports = {
    name: "play",
    $if: "old",
    defer: true,
    code: `
$isInteraction
$reply[$messageId;false]
$description[Added to Queue $songInfo[title;$queueLength]]
$playTrack[$getContext[song;all];youtube]
$cooldown[3s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$if[$hasPlayer==false]
$joinVC
$else
$onlyIf[$voiceId==$voiceId[$clientId];{newEmbed:{description:You are not in the same voice channel!}}{deleteIn:5s}{suppress}]
$endif
$onlyIf[$getContext[song;all]!=;{newEmbed:{description:Please provide a valid song title or url!}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
