module.exports = {
    name: "ping",
    code: `
$isInteraction
$reply[$messageId;false]
Meow: $pingms
API: $if[$isCommandInteraction==true;$interactionPing;$messagePing]ms
Database: $databasePingms
$if[$hasPlayer==true;Player: $playerPingms]

Uptime: $uptime
$cooldown[3s;{newEmbed:{description:Oops... Try again in %time%}}{deleteIn:5s}{suppress}]
$suppressErrors
`
};
