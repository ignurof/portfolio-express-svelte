let blockList = [];

const AddToBlock = (username) => {
    blockList.push(username);
}

const IsUserBlocked = (username) => {
    let blockedStatus = false;
    let blockAmount = 0;
    //TODO: This could possible be a .map instead
    blockList.map((x) => {
        if(x != username) return;

        blockAmount++;
        //console.log(blockAmount);
    });

    return new Promise((resolve, reject) => {
        if(blockAmount < 3){
            // Not blocked
            resolve(blockedStatus);
        } else{
            // Blocked ( This is what gets sent to the catch exception where this method is called )
            blockedStatus = true;
            reject(blockedStatus);
        }
    });
}

const RemoveUserBlock = (username) => {
    blockList.map((x) => {
        if(x != username) return;

        blockList.splice(x, 1);
    });
}

module.exports = {
    AddToBlock,
    IsUserBlocked,
    RemoveUserBlock
};