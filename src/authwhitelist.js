// FIXME: This whitelist currently gets reset on server shutdown/crash (and it should probably get reset on timer)
let authWhitelist = [];

const GetAuthList = () => {
    return authWhitelist;
}

const ResetAuthList = () => {
    // Very rudimentary reset of array, but this should free up the memory
    // While this: array = []; would have created another spot in memory, I think
    authWhitelist.length = 0;
}

const AddToAuth = (newItem) => {
    authWhitelist.push(newItem);
}

module.exports = {
    GetAuthList,
    ResetAuthList,
    AddToAuth
};