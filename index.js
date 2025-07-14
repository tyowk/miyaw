const { AoiClient } = require("aoi.js");
const { Database } = require("aoijs.mysql");
const { Manager } = require("aoijs.lavalink");
require("dotenv").config();

const client = new AoiClient({
    token: process.env.TOKEN,
    prefix: "*",
    intents: ["MessageContent", "Guilds", "GuildMessages", "GuildVoiceStates"],
    events: ["onMessage", "onInteractionCreate", "onMessageUpdate"],
    register: true,
    disableAoiDB: true,
    respondOnEdit: {
        commands: true,
        time: 60_000,
        nonPrefixed: false
    }
});

new Database(client, {
    url: process.env.DATABASE,
    tables: ["main"],
    keepAoiDB: false
});

const voice = new Manager(client, {
    debug: false,
    deleteNowPlaying: true,
    nodes: [
        {
            name: "node",
            host: process.env.HOST,
            port: process.env.PORT,
            auth: process.env.AUTH,
            secure: false
        }
    ]
});

require("./commands/handlers")(client);
client.loadCommands("commands/client");
voice.loadVoiceEvents("commands/players");
