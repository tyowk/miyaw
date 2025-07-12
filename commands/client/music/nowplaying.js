module.exports = {
    name: "nowplaying",
    aliases: "np",
    code: `
$reply[$messageId;false]
$cooldown[3s;]
$image[$songInfo[thumbnail]]
$title[Now Playing $songInfo[title];$songInfo[url]]
$footer[$humanizeMs[$currentTrackDuration] / $songInfo[duration]  |  $songInfo[requester.username]]
$suppressErrors
`
};
