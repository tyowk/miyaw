module.exports = {
    name: "nowplaying",
    aliases: "np",
    code: `
$isInteraction
$reply[$messageId;false]
$image[$songInfo[thumbnail]]
$title[Now Playing $songInfo[title];$songInfo[url]]
$footer[$humanizeMs[$currentTrackDuration] / $songInfo[duration]  |  $songInfo[requester.username]]
$cooldown[3s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$onlyIf[$playerStatus!=destroyed;{newEmbed:{description:No tracks are currently playing!}}{deleteIn:5s}{suppress}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:There are no active players on this server!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
