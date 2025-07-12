module.exports = {
    name: "247",
    aliases: "24/7",
    $if: "old",
    code: `
$reply[$messageId;false]
$if[$getGuildVar[247]==false]
$setGuildVar[247;true]
$description[24/7 mode is activated, I will not exit the voice channel!]
$color[Green]
$if[$hasPlayer==false&&$voiceId!=]
$joinVC
$endif
$elseif[$getGuildVar[247]==true]
$setGuildVar[247;false]
$description[24/7 mode is disabled!]
$color[Red]
$if[$hasPlayer==true&&$playerStatus!=playing]
$leaveVC
$endif
$endelseif
$endif
$cooldown[30s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
