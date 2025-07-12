module.exports = {
    name: "ping",
    code: `$cooldown[3s;]
Meow pong! $pingms
API pong! $messagePingms
$if[$hasPlayer==true;Player pong! $playerPingms]
$suppressErrors`
};
