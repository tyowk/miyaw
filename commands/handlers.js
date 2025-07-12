module.exports = (client) => {
    const cd = new Map();

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

    client.functionManager.createFunction({
        name: "$cooldown",
        type: "djs",
        code: async (d) => {
            const data = d.util.aoiFunc(d);
            let isError = false;
            let [time = "3s", error = ""] = data.inside.splits;
            time = d.helpers.time.parse(time).ms;

            const key = `${d.command.name || "unknown"}_${d.author.id}`;
            const c = cd.get(key);

            if (!c) {
                cd.set(key, Date.now() + time);
                setTimeout(() => cd.delete(key), time);
            } else if (Date.now() < c) {
                const { humanize } = d.helpers.time.format(c - Date.now());
                error = await d.util.errorParser(
                    error.replaceAll("%time%", () => humanize()),
                    d
                );
                isError = true;
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
    });
};
