export function filterData(isYours, hasCleanCode, hasUpdatedMd, data){
    //input -> data
    //returns -> filtered data
    if(isYours){
        data = data.filter(obj => obj["isYours"]);
    }
    if(hasCleanCode){
        data = data.filter(obj => obj["hasCleanCode"]);
    }
    if(hasUpdatedMd){
        data = data.filter(obj => obj["hasUpdatedMd"]);
    }
    return data;
}