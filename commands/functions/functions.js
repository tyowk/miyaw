const Fuse = require("fuse.js");
const functionData = require("./functions.json");

module.exports = (name) => {
    if (!name) return;
    const exactMatch = functionData.find((func) => func.function.toLowerCase() === name.toLowerCase());
    if (exactMatch) return exactMatch;

    const result = new Fuse(functionData, {
        keys: ["function"],
        includeScore: true,
        threshold: 0.1
    }).search(name.replace("$", ""));

    if (result.length === 0) return;
    return result[0].item;
};
