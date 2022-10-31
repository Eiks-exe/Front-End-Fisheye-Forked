export const globalState = {
    photographers: [],
    media: []
}

export const initData =async () => {
    const response  = await fetch("../../data/photographers.json")
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }

    const data = await response.json();
    globalState.media = data.media;
    globalState.photographers = data.photographers;
}
