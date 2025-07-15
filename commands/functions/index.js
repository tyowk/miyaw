const find = require("./find");
const func = require("./functions");
const fetchFunc = require("./fetch");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        try {
            if (!message.content?.startsWith("*")) return;

            const args = message.content.trim().slice(1).split(/ +/g) || [];
            const commandName = args.shift()?.toLowerCase();

            if (!["function", "func", "functions"].includes(commandName)) return;

            const funcName = args.shift();
            if (funcName === "--fetch" && message.author.id === "1009314804525178920") {
                const [res, err] = await fetchFunc();
                if (err)
                    return await message.reply({
                        embeds: [
                            {
                                description: `\`\`\`js\n${err.stack.slice(0, 3500)}\`\`\``
                            }
                        ],
                        allowedMentions: {
                            repliedUser: false
                        }
                    });
                return await message.reply({
                    embeds: [
                        {
                            description: res
                        }
                    ],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            }

            if (!funcName) {
                return await message
                    .reply({
                        embeds: [
                            {
                                description: "Uh oh... Looks like there are no functions that match your query.",
                                color: 0xff0000
                            }
                        ],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })
                    .then((msg) => setTimeout(async () => await msg.delete().catch(() => {}), 5000));
            }

            const data = func(funcName);
            const findData = find(funcName);

            if (!data) {
                return await message
                    .reply({
                        embeds: [
                            {
                                description: `Uh oh... It looks like none of the functions match your query.\nDid you mean one of these?\n\n${
                                    findData?.length > 0 ? findData.map((f) => `* ${f}`).join("\n") : "Oops... Something is wrong..."
                                }`,
                                color: 0xff0000,
                                thumbnail: {
                                    url: client.user.displayAvatarURL()
                                }
                            }
                        ],
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        type: 2,
                                        label: "Delete",
                                        style: 4,
                                        custom_id: "delete",
                                        disabled: false
                                    }
                                ]
                            }
                        ],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })
                    .then((msg) => setTimeout(async () => await msg.delete().catch(() => {}), 30000));
            }

            return await message.reply({
                embeds: [
                    {
                        color: 0xffffff,
                        title: data.function || "Unknown Function",
                        description:
                            data.example && data.example !== ""
                                ? data.example.length > 4000
                                    ? `The example for this function is too big, better to look at the documentation website!\n${data.documentation}`
                                    : data.example
                                : "There is no example for this function!",
                        footer: {
                            text: `${data.type || "Aoi.Js"}  |  ${message.author.displayName || message.author.username}`,
                            icon_url: message.author.displayAvatarURL()
                        },
                        fields: [
                            {
                                name: "Information",
                                value: `${data.description || ""}\n${data.tip || ""}\n\n\`\`\`sh\n${data.usage.replaceAll("`", "")}\n\`\`\``
                            }
                        ]
                    }
                ],
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 2,
                                label: "Documentation",
                                style: 5,
                                url: data.documentation,
                                disabled: false
                            },
                            {
                                type: 2,
                                label: "Source Code",
                                style: 5,
                                url: data.source || "https://aoi.js.org",
                                disabled: false
                            }
                        ]
                    },
                    {
                        type: 1,
                        components: [
                            {
                                type: 2,
                                label: "Delete",
                                style: 4,
                                custom_id: "delete",
                                disabled: false,
                                emoji: { id: "1192838355004694680" }
                            },
                            data.parameters?.length > 0
                                ? {
                                      type: 2,
                                      label: "Show Parameters",
                                      style: 2,
                                      custom_id: `parameters_${data.function}`,
                                      disabled: false,
                                      emoji: { id: "1199249630181990411" }
                                  }
                                : null
                        ].filter(Boolean)
                    }
                ],
                allowedMentions: {
                    repliedUser: false
                }
            });
        } catch (err) {
            return await message
                .reply({
                    embeds: [
                        {
                            color: 0xff0000,
                            title: "Something is wrong... Try again later!",
                            description: `\`\`\`js\n${err.stack?.slice(0, 3500) || "Unknown Error"}\`\`\``
                        }
                    ]
                })
                .then((msg) => setTimeout(async () => await msg.delete().catch(() => null), 10_000));
        }
    });

    client.on("interactionCreate", async (i) => {
        try {
            const [customId, funcName] = i.customId?.split("_") || [];
            if (customId !== "parameters") return;
            const data = func(funcName);
            if (!data || data.parameters?.length === 0) return;
            const params = data.parameters.map((p, i) => {
                return {
                    name: `${i + 1}. **${p.field}${p.required ? "*" : p.field.endsWith("?") ? "" : "?"}**`,
                    value: `* **Type: ${p.type || "unknown"}**\n\n\n> ${p.description?.replace(/\n/gi, () => "\n> ") || "No description for this parameter"}`
                };
            });

            return await i.reply({
                embeds: [
                    {
                        color: 0xffffff,
                        title: data.function || "Unknown Function",
                        ...(data.usage
                            ? {
                                  description: `\`\`\`sh\n${data.usage}\`\`\``
                              }
                            : {}),
                        fields: params,
                        footer: {
                            text: `${data.type || "Aoi.Js"}  |  ${i.user.displayName || i.user.username}`,
                            icon_url: i.user.displayAvatarURL()
                        },
                        thumbnail: { url: client.user.displayAvatarURL() }
                    }
                ],
                flags: 64
            });
        } catch (err) {
            return await i.reply({
                flags: 64,
                embeds: [
                    {
                        color: 0xff0000,
                        title: "Something is wrong... Try again later!",
                        description: `\`\`\`js\n${err.stack?.slice(0, 3500) || "Unknown Error"}\`\`\``
                    }
                ]
            });
        }
    });
};
