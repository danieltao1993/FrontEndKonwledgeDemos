'use strict';

module.exports = function (style) {
    const styleIDs = [];
    const sourceIDs = [];

    for (const id in style.sources) {
        const source = style.sources[id];

        if (source.type !== "vector")
            continue;

        const match = /^minemap:\/\/(.*)/.exec(source.url);
        if (!match)
            continue;

        styleIDs.push(id);
        sourceIDs.push(match[1]);
    }

    if (styleIDs.length < 2)
        return style;

    styleIDs.forEach((id) => {
        delete style.sources[id];
    });

    const compositeID = sourceIDs.join(",");

    style.sources[compositeID] = {
        "type": "vector",
        "url": `minemap://${compositeID}`
    };

    style.layers.forEach((layer) => {
        if (styleIDs.indexOf(layer.source) >= 0) {
            layer.source = compositeID;
        }
    });

    return style;
};