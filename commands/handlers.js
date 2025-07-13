const { Routes } = require("discord.js");

module.exports = (client) => {
    const cd = new Map();
    client.on("interactionCreate", async (i) => await require("./interaction")(i, client));

    client.variables({
        247: false,
        number: 0,
        string: "test",
        object: {
            property: "test"
        },
        array: [1, 2, 3, 4]
    });

    client.status({
        name: "*help  |  npm install aoi.js",
        type: "Custom",
        time: 20,
        status: "idle"
    });

    client.functionManager.createFunction(
        {
            name: "$cooldown",
            type: "djs",
            code: async (d) => {
                const data = d.util.aoiFunc(d);
                let isError = false;
                let [time = "3s", error = ""] = data.inside.splits;
                time = d.helpers.time.parse(time).ms;

                const key = `${d.command.name || "unknown"}_${d.author.id}`;
                const c = cd.get(key);

                if (Date.now() < c) {
                    const { humanize } = d.helpers.time.format(c - Date.now());
                    if (!error.includes("{interaction}") && d.data.interaction) error += "{interaction}";
                    error = await d.util.errorParser(
                        error.replaceAll("%time%", () => humanize()),
                        d
                    );
                    isError = true;
                    if (d.data.interaction && d.data.interaction?.deferred) {
                        d.data.interaction.reply = d.data.interaction?.editReply?.bind(d.data.interaction);
                        error.options.defer = false;
                    }
                    await d.aoiError.makeMessageError(d.client, d.channel, error.data ?? error, error?.options, d);
                } else {
                    cd.set(key, Date.now() + time);
                    setTimeout(() => cd.delete(key), time);
                }

                return {
                    code: d.util.setCode(data),
                    error: isError
                };
            }
        },
        {
            name: "$isInteraction",
            type: "djs",
            code: async (d) => {
                const data = d.util.aoiFunc(d);
                const code = d.util.setCode(data);

                const interaction = d.data.interaction;
                if (!interaction) return { code };

                let message = {
                    content: code?.addBrackets(),
                    embeds: d.embeds,
                    files: d.files,
                    components: d.components,
                    attachments: d.files,
                    flags: d.data.flags
                };

                if (d.data.dm?.status === true) {
                    let member = interaction?.member;
                    if (d.data.dm?.user !== interaction.user.id) member = await d.client.users.cache.get(d.data.dm?.user);
                    if (!member) return { code };

                    await interaction?.member?.send(message).catch(() => {});
                    return { code };
                }

                if (interaction.deferred) message = await interaction?.editReply(message).catch(() => {});
                else message = await interaction?.reply(message).catch(() => {});

                if (d.data.deleteIn) setTimeout(() => message?.delete()?.catch(() => {}), d.data.deleteIn);
                return { code };
            }
        },
        {
            name: "$onlyIf",
            type: "djs",
            code: async (d) => {
                const data = d.util.aoiFunc(d);
                if (data.err) return d.error(data.err);
                let error = false;

                let [condition, err = ""] = data.inside.splits;

                if (!eval(d.helpers.checkCondition.solve(d.helpers.mustEscape(condition)))) {
                    error = true;
                    if (err?.trim() !== "") {
                        if (!err.includes("{interaction}") && d.data.interaction) err += "{interaction}";
                        err = await d.util.errorParser(err, d);

                        if (d.data.interaction && d.data.interaction?.deferred) {
                            d.data.interaction.reply = d.data.interaction?.editReply?.bind(d.data.interaction);
                            err.options.defer = false;
                        }
                        d.aoiError.makeMessageError(d.client, d.channel, err.data || err, err.options, d);
                    }
                }

                return {
                    code: d.util.setCode(data),
                    error
                };
            }
        },
        {
            name: "$getContext",
            type: "djs",
            code: (d, args = d.args, interaction = d.data.interaction) => {
                const data = d.util.aoiFunc(d);
                if (data.err) return d.error(data.err);

                let [option, msg = "all", index = "1", returnSelf = "false"] = data.inside.splits;

                option = option?.addBrackets()?.toLowerCase();
                msg = msg?.addBrackets()?.toLowerCase()?.split(":");

                const extractUrl = (str) => {
                    const matched = str.match(/<(https?:\/\/[^>]+)>/);
                    return matched ? matched[1] : null;
                };

                switch (true) {
                    case !!interaction:
                        if (option === "false" || option === "none") {
                            return d.client.returnCode(d, data);
                        }

                        switch (option) {
                            case "subcommand":
                                data.result = interaction.options.getSubcommand();
                                break;
                            default:
                                data.result = interaction.options.get(option?.addBrackets())?.value;
                                break;
                        }
                        break;

                    case msg[0] === "mentioned":
                        const userIndex = Number(index || msg[1] || 1) - 1;
                        const mentionedUser = [...d.mentions.users.values()][userIndex];

                        if (mentionedUser) {
                            data.result = mentionedUser.id;
                        } else if (returnSelf === "true" || msg[2] === "true") {
                            data.result = d.author?.id;
                        } else {
                            data.result = "";
                        }
                        break;

                    case msg === "false" || msg === "none":
                        return d.client.returnCode(d, data);

                    default:
                        msg = msg.join(":");
                        data.result = msg === "all" ? d.args.join(" ") : args[Number(msg) - 1];
                        break;
                }

                if (typeof data.result === "string") {
                    const url = extractUrl(data.result);
                    if (url) {
                        data.result = url;
                    }
                }

                return {
                    code: d.util.setCode(data)
                };
            }
        }
    );

    if (client.options.register)
        client.rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: require("./commands")
        });
};
