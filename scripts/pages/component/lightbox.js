import { getImgById } from "../photographer.js"


let currentId = 0
const image = document.getElementById("lightbox_img")
const title = document.getElementById("lb_title")

/**
 * 
 * @param {*} id 
 * @param {*} filename 
 */
export const openLightbox = async (id, filename) => {
  currentId = id
  const item = getImgById(id)
  const boxContainer = document.getElementById("box_container")
  boxContainer.style.display = "block"
  let x = filename.split("/")
  updateLb({ media: x[x.length - 1], title: item.title })
  const close = document.getElementById("lightbox_close")
  close.focus()

  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableContent = boxContainer.querySelectorAll(focusableElements);
  boxContainer.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (e.key === "ArrowRight") {
      next()
    } else if (e.key === "ArrowLeft") {
      previous()
    } else if (e.key === "Escape") {
      closeLightbox()
    } else if (e.key === "Tab"){
      captureTab(e, focusableContent);
    }
  })
}

export const closeLightbox = () => {
  document.getElementById("box_container").style.display = "none"
}

export const previous = () => {
  const item = getImgById(currentId - 1)
  if (item) {
    updateLb(item)
    currentId -= 1
  }
}

export const next = () => {
  const item = getImgById(currentId + 1)
  if (item) {
    updateLb(item)
    currentId += 1
  }
}

const updateLb = (item) => {
  const vidElement = document.getElementById("video")
  vidElement.setAttribute("controls", "")
  title.innerHTML = item.title
  if (item.media.includes("mp4")) {
    const vidSrc = document.createElement('source')
    vidElement.appendChild(vidSrc)
    vidElement.style.display = 'block'
    image.style.display = 'none'
    vidSrc.src = `../../../assets/images/${item.media}`
  } else {
    vidElement.style.display = 'none'
    image.style.display = 'block'
    image.src = `../../../assets/images/${item.media}`
  }
}

export const captureTab = (event, focusableContent) => {
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (event.key === "Tab") {
        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus(); 
                event.preventDefault();
            }
        }
    }
}