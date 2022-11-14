import { MediaFactory } from "../factories/Media.js"
import { PhotographerFactory } from "../factories/photographer.js"
import { globalState, initData } from "../utils/data.js"
import { openLightbox, closeLightbox, next, previous } from "./component/lightbox.js"
import { eventLike } from "./events/likes.js"



//Mettre le code JavaScript lié à la page photographer.html
const navQuery = window.location.search
const urlParam = new URLSearchParams(navQuery)
const paramId = urlParam.get("id")

//Dom elements
//LightBox

document.getElementById("lightbox_close").addEventListener('click', () => {
    closeLightbox()
})

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
    document.getElementById('total_likes').innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`
}

const mediaImgVid = (type, title, filename) => {
    const MediaImg = document.createElement(type)
    MediaImg.setAttribute("src", `../../assets/images/${filename}`)
    MediaImg.setAttribute("alt", title)
    return MediaImg
}
let filteredList
const displayMedias = (items) => {
    let totalLikes = 0
    const mediaFrag = document.createDocumentFragment();
    filteredList = items.map((item, i) => {
        const mediaItem = document.createElement("div")
        const content = document.createElement("div")
        const mediaName = document.createElement("div")
        const mediaLikes = document.createElement("div")
        const mediaLink = document.createElement("a")
        const likeIcon = document.createElement("i")


        let mediaImg = undefined
        if (item.image) {
            console.log(item.image)
            mediaImg = mediaImgVid("img", item.title, item.image)
            mediaLink.setAttribute("href", `../../assets/images/${item.image}`)
            mediaLink.addEventListener("click", (e) => {
                e.preventDefault()
                openLightbox(i, `../../assets/images/${item.image}`)
            })
        } else {
            mediaImg = mediaImgVid("video", item.title, item.video)
            mediaLink.setAttribute("href", `../../assets/images/${item.video}`)
            mediaLink.addEventListener("click", (e) => {
                e.preventDefault()
                openLightbox(i, `../../assets/images/${item.video}`)
            })
        }
        
        // video hover

        if(item.video){
            mediaLink.addEventListener(("mouseover"), ()=>{
                hoverVideo()
            })
            mediaLink.addEventListener(("mouseout"), ()=> {
                hideVideo()
            })
        }

        mediaItem.setAttribute("class", "media_item")
        mediaItem.setAttribute("id", i)
        content.setAttribute("class", "content ")
        mediaName.setAttribute("class", "media_name")
        mediaLikes.setAttribute("class", "media_likes")
        mediaLink.setAttribute("title", item.title)
        mediaLink.setAttribute("tabindex", "0")
        likeIcon.setAttribute("class", "fa-solid fa-heart")

        mediaName.textContent = item.title
        mediaLikes.innerHTML = `${item.likes}`
        totalLikes += item.likes

        content.appendChild(mediaName)
        content.appendChild(mediaLikes)
        mediaLikes.appendChild(likeIcon)
        mediaLink.appendChild(mediaImg)
        mediaItem.appendChild(mediaLink)
        mediaItem.appendChild(content)
        mediaFrag.appendChild(mediaItem)



        return item
    });
    document.getElementById('media_grid').replaceChildren(mediaFrag)
    return totalLikes
}

// next&previous

export const getImgById = (id) => {
    if(filteredList.length > 0) {
        console.log(filteredList[id])
        if (filteredList[id].image) {
            return {media: filteredList[id].image, title: filteredList[id].title}
        } else {
            return {media: filteredList[id].video, title: filteredList[id].title}
        }
    } else {
        return undefined 
    }
}
window.addEventListener("keydown", (e)=>{
    if(e.key === "ArrowRight"){
        next()
    } else if (e.key === "ArrowLeft"){
        previous()
    }
})

document.getElementById("previous").addEventListener("click", () => { previous() })
document.getElementById("next").addEventListener("click", () => { next() })


const contact_submit = (e) => {
    e.preventDefault()
    const first = document.getElementById("first").value
    const last = document.getElementById("last").value
    const email = document.getElementById("email").value
    const msg = document.getElementById("message").value

    console.log({ "prénom": first, "nom": last, "email": email, "msg": msg })
}
document.getElementById("contact_form").addEventListener("submit", (event) => {
    contact_submit(event)
})

document.getElementById("select-btn").addEventListener("click", ()=>{
    document.getElementById("select_listbox").removeAttribute("listbox-close")
})


//video

const hoverVideo = ()=>{
    //TODO: start the video
}

const hideVideo = ()=> {
    //TODO: stop the video
}

eventLike()
photographerPage()





