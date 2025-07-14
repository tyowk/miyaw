const find = require("./find");
const func = require("./functions");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (!message.content?.startsWith("*")) return;
        const args = message.content?.trim().slice(1).split(/ +/g) || [];
        const commandName = args.shift()?.toLowerCase();
        if (!["function", "func", "functions"].includes(commandName)) return;

        const funcName = args.shift();
        if (!funcName)
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
                .then((msg) => setTimeout(async () => await msg.delete().catch(() => {}), 5_000));

        const data = func(funcName);
        const findData = find(funcName);
        if (!data)
            return await message
                .reply({
                    embeds: [
                        {
                            description: `Uh oh... It looks like none of the functions match your query.\nDid you mean one of these?\n\n${findData?.length > 0 ? findData.map((f) => `* ${f}`).join("\n") : "Oopps... Something is wrong..."}`,
                            color: 0xff0000,
                            thumbnail: { url: client.user.displayAvatarURL() }
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
                .then((msg) => setTimeout(async () => await msg.delete().catch(() => {}), 30_000));

        const msg = await message.reply({
            embeds: [
                {
                    color: 0xffffff,
                    title: data.function || "Unknown Function",
                    description:
                        data.example && data.example !== ""
                            ? data.example?.length > 4000
                                ? "The example for this function is too big, better to look at the documentation website!\n" + data.documentation
                                : data.example
                            : "There is no example for this function!",
                    footer: {
                        text: (data.type || "Aoi.Js") + "  |  " + (message.author.displayName || message.author.username),
                        icon_url: message.author.displayAvatarURL()
                    },
                    fields: [
                        {
                            name: "Information",
                            value: `${data.description || ""}${"\n" + (data.tip || "")}\n\n\`\`\`sh\n${data.usage.replaceAll("`", "")}\`\`\``
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
                            label: "Delete",
                            style: 4,
                            custom_id: "delete",
                            disabled: false
                        },
                        {
                            type: 2,
                            label: "Docs",
                            style: 5,
                            url: data.documentation,
                            disabled: false
                        },
                        data.parameters?.length > 0
                            ? {
                                  type: 2,
                                  label: "Parameters",
                                  style: 2,
                                  custom_id: "parameters",
                                  disabled: true
                              }
                            : null
                    ].filter(Boolean)
                }
            ],
            allowedMentions: {
                repliedUser: false
            }
        });
    });
};
