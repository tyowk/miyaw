module.exports = {
    type: "queueEnd",
    $if: "old",
    code: `$if[$getGuildVar[247]==false]
$leaveVC
$endif
$if[$playerStatus!=stopped]
$description[The queue has ended, add another song using the *play command]
$endif
$suppressErrors`
};
