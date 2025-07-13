module.exports = [
    {
        name: "ping",
        description: "Ping? Pong!",
        type: 1,
        options: []
    },
    {
        name: "help",
        description: "Help? What help do you need?",
        type: 1,
        options: []
    },
    {
        name: "play",
        description: "Add new track to the guild queue",
        type: 1,
        options: [
            {
                name: "song",
                description: "Song title or a valid url",
                type: 3,
                required: true
            }
        ]
    },
    {
        name: "connect",
        description: "Connect to voice channel",
        type: 1,
        options: []
    },
    {
        name: "disconnect",
        description: "Disconnect from voice channel",
        type: 1,
        options: []
    },
    {
        name: "pause",
        description: "Pause the player",
        type: 1,
        options: []
    },
    {
        name: "resume",
        description: "Resume the player",
        type: 1,
        options: []
    },
    {
        name: "skip",
        description: "Skip to the next track",
        type: 1,
        options: []
    },
    {
        name: "nowplaying",
        description: "View the currently playing track",
        type: 1,
        options: []
    },
    {
        name: "247",
        description: "Toggle 24/7 mode",
        type: 1,
        options: []
    }
];
