module.exports = {
    name: "skip",
    aliases: "sk",
    $if: "old",
    code: `
$reply[$messageId;false]
$cooldown[3s;]
$if[$hasPlayer==true&&$playerStatus==playing]
$description[Skipped to the next track]
$skipTrack
$endif
$onlyIf[$voiceId==$voiceId[$clientId];{newEmbed:{description:You are not in the same voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$voiceId!=;{newEmbed:{description:You are not in a voice channel!}}{deleteIn:5s}{suppress}]
$onlyIf[$hasPlayer==true;{newEmbed:{description:There are no active players on this server!}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
