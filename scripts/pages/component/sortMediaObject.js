export const sortMediaObjects = (mediaArray, sortBy) => {
    switch (sortBy) {
    case 'titre':
        return mediaArray.sort((a, b) => { return a["title"] < b["title"] ? -1 : 1; });
    case 'popularité': 
        return mediaArray.sort((a, b) => { return a["likes"] < b["likes"] ? 1 : -1; });
    default:
        return mediaArray.sort((a, b) => { return a[sortBy] < b[sortBy] ? 1 : -1; });
    }
}