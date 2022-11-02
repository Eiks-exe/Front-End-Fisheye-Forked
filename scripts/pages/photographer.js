import { MediaFactory } from "../factories/Media.js"
import { PhotographerFactory } from "../factories/photographer.js"
import { globalState, initData } from "../utils/data.js"



//Mettre le code JavaScript lié à la page photographer.html
const navQuery = window.location.search
const urlParam = new URLSearchParams(navQuery)
const paramId = urlParam.get("id")

//Dom elements


const photographerPage = async () => {
    const photographers = new PhotographerFactory()
    await initData()
    await photographers.init()



    // console.log(globalState.photographers.filter((user)=> {
    //     return user.id === parseInt(paramId)
    // }))
    const user = photographers.get(parseInt(paramId))
    if (user.length == 0) return;
    console.log(user[0]);

    const medias = new MediaFactory()
    await medias.init()
    const userMedias = medias.get(parseInt(paramId))
    const totalLikes = displayMedias(userMedias);
    updateUi(user[0], totalLikes);
}

const updateUi = (user, totalLikes) => {
    document.getElementById('user_name').textContent = user.name;
    document.getElementById('user_address').textContent = `${user.city}, ${user.country}`;
    document.getElementById('user_tagline').textContent = user.tagline;
    document.getElementById('user_picture').src = `../../assets/photographers/${user.portrait}`;
    document.getElementById('price').textContent = `${user.price}€/jours`;
    document.getElementById('total_likes').textContent = `${totalLikes}💖`
}

const mediaImgVid = (type, title, filename) => {
    const MediaImg = document.createElement(type)
    MediaImg.setAttribute("src", `../../assets/images/${filename}`)
    MediaImg.setAttribute("alt", title)
    return MediaImg
}

const displayMedias = (items) => {
    let totalLikes = 0
    const mediaFrag = document.createDocumentFragment();
    items.forEach((item) => {
        const mediaItem = document.createElement("div")
        const content = document.createElement("div")
        const mediaName = document.createElement("div")
        const mediaLikes = document.createElement("div")
        const mediaLink = document.createElement("a")

        let mediaImg = undefined
        if (item.image) {
            mediaImg = mediaImgVid("img", item.title, item.image)
            mediaLink.setAttribute("href", `../../assets/images/${item.image}`)
        } else {
            mediaImg = mediaImgVid("video", item.title, item.video)
            mediaLink.setAttribute("href", `../../assets/images/${item.video}`)
        }

        mediaItem.setAttribute("class", "media_item")
        content.setAttribute("class", "content ")
        mediaName.setAttribute("class", "media_name")
        mediaLikes.setAttribute("class", "media_likes")
        mediaLink.setAttribute("title", item.title)
        mediaLink.setAttribute("tabindex", "0")

        mediaName.textContent = item.title
        mediaLikes.textContent = `${item.likes}💖`
        totalLikes += item.likes

        content.appendChild(mediaName)
        content.appendChild(mediaLikes)
        mediaLink.appendChild(mediaImg)
        mediaItem.appendChild(mediaLink)
        mediaItem.appendChild(content)
        mediaFrag.appendChild(mediaItem)
    });
    document.getElementById('media_grid').replaceChildren(mediaFrag)
    return totalLikes
}


photographerPage()




