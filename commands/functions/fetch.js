const FS = require("node:fs");
const PATH = require("node:path");

module.exports = async () => {
    try {
        const json = await fetch("https://raw.githubusercontent.com/tyowk/aoijs.api/refs/heads/main/functions/functions.json").then((x) => x.json());
        FS.rmSync(PATH.join(__dirname, "functions.json"), { force: true });
        FS.writeFileSync(PATH.join(__dirname, "functions.json"), JSON.stringify(json, null, 4));
        return [`Successfully fetching ${json.length} functions from API!`, null];
    } catch (err) {
        return [null, err];
    }
};
