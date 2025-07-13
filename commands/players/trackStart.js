module.exports = {
    type: "trackStart",
    code: `
$setNowPlaying[$get[id]]
$let[id;$sendMessage[{newEmbed:{description:Now Playing $nonEscape[$songInfo[title]]}};true]]
$suppressErrors
`
};
