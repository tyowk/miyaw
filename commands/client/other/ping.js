module.exports = [
    {
        name: "ping",
        code: `
$reply[$messageId;false]
$cooldown[3s;]
Meow: $pingms
API: $messagePingms
Database: $databasePingms
$if[$hasPlayer==true;Player: $playerPingms]

Uptime: $uptime
$suppressErrors
`
    },
    {
        name: "ping",
        type: "interaction",
        prototype: "slash",
        code: `
$cooldown[3s;]
$interactionReply[
Meow: $pingms
API: $interactionPingms
Database: $databasePingms
$if[$hasPlayer==true;Player: $playerPingms]

Uptime: $uptime
]
$suppressErrors
`
    }
];
