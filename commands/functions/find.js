const Fuse = require("fuse.js");
const functionData = require("./functions.json");

module.exports = (name) => {
    const results = new Fuse(functionData, {
        keys: ["function"],
        includeScore: false,
        threshold: 0.9
    }).search(name.replace("$", ""));

    if (results.length === 0) return;
    return results.slice(0, 5).map((result) => result.item.function);
};
