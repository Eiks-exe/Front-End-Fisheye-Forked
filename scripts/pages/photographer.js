import { MediaFactory } from "../factories/Media.js"
import { PhotographerFactory } from "../factories/photographer.js"
import { globalState, initData } from "../utils/data.js"
import { openLightbox, closeLightbox, next, previous } from "./component/lightbox.js"
import { sortMediaObjects } from "./component/sortMediaObject.js"
import { eventLike } from "./events/likes.js"

let filteredList = undefined

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

    // sort
    const slctBtn = document.getElementById("select-btn")

    document.getElementById("select-btn").addEventListener("click", () => {
        const sltList = document.getElementById("select_listbox")
        slctBtn.ariaExpanded = slctBtn.ariaExpanded == "true" || !slctBtn.ariaExpanded ? "false" : "true"
        sltList.style.display = sltList.style.display == "none" || !sltList.style.display ? "block" : "none"
    })


    slctBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            slctBtn.ariaExpanded = slctBtn.ariaExpanded == "true" || !slctBtn.ariaExpanded ? "false" : "true"
        } else if (e.key === "ArrowDown" && slctBtn.ariaExpanded === "true") {
            const listBox = Array.from(document.getElementsByClassName("option"))
            for (let index = 0; index < listBox.length; index++) {
                const element = listBox[index];
                if (element.id != "selected") {
                    element.focus()
                    break;
                };
            }
        }
    })

    const selectList = document.getElementById("select_listbox")
    const options = Array.from(selectList.getElementsByClassName("option"))
    options.forEach((item) => {
        item.addEventListener("keydown", (e) => {
            e.preventDefault()
            switch (e.key) {
                case "ArrowDown":
                    console.log("siblingdown")
                    if (item.nextElementSibling) {
                        if(item.nextElementSibling.id === "selected" && item.nextElementSibling.nextElementSibling){
                            item.nextElementSibling.nextElementSibling.focus()
                        } else {
                            item.nextElementSibling.focus()
                        }
                    } 
                    break;
                case "ArrowUp":
                    if (item.previousElementSibling) {
                        if(item.previousElementSibling.id === "selected" && item.previousElementSibling.previousElementSibling){
                            item.previousElementSibling.previousElementSibling.focus()
                        } else if(!item.previousElementSibling.previousElementSibling) {
                            slctBtn.focus()
                        } 
                        else {
                            item.previousElementSibling.focus()
                        }
                    }
                    break;
                default:
                    break;
            }
        })
    })


    const sltOptions = document.getElementsByClassName("option")


    var optionsArr = Array.from(sltOptions)
    optionsArr.forEach((item) => {
        item.addEventListener("click", (e) => {
            const selectButton = document.getElementById("select-btn")
            selectButton.innerHTML = e.target.innerText + "<i class='fa-solid fa-angle-down' id='arrow_down'></i>"
            const selected = document.getElementById("selected")
            selected.removeAttribute("id")
            e.target.id = "selected"
            displayMedias(sortMediaObjects(userMedias, e.target.innerText.toLowerCase()))
        })

    })
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


const displayMedias = (items) => {
    let totalLikes = 0
    const mediaFrag = document.createDocumentFragment();
    filteredList = items
    console.log(filteredList)
    items.map((item, i) => {
        const mediaItem = document.createElement("div")
        const content = document.createElement("div")
        const mediaName = document.createElement("div")
        const mediaLikes = document.createElement("div")
        const mediaLink = document.createElement("a")
        const likeIcon = document.createElement("i")


        let mediaImg = undefined
        if (item.image) {
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

        if (item.video) {
            mediaLink.addEventListener(("mouseover"), () => {
                hoverVideo()
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
        likeIcon.setAttribute("tabindex","0")

        likeIcon.addEventListener(("click"), () => {
            mediaLikes.innerHTML = `${item.likes += 1}`
            mediaLikes.appendChild(likeIcon)
        })

        likeIcon.addEventListener(("keydown"), (e) => {
            console.log(e)
            if(e.key === "Enter"){
                mediaLikes.innerHTML = `${item.likes += 1}`
                mediaLikes.appendChild(likeIcon)
                
            }
            likeIcon.focus()
        })
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
    if (id < filteredList.length && id >= 0) {
        if (filteredList[id].image) {
            return { media: filteredList[id].image, title: filteredList[id].title }
        } else {
            return { media: filteredList[id].video, title: filteredList[id].title }
        }
    } else {
        return undefined
    }
}


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




//video

const hoverVideo = () => {
    document.getElementById("video").play()
}

const hideVideo = () => {
    document.getElementById("video").pause()

}



eventLike()
photographerPage()





