export function dataDeleteKeys(data, keys) {
    for (let i in keys) {
        delete data[keys[i]];
    }
};