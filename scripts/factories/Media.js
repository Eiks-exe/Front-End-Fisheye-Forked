class Video {
    constructor(
        id,
        photographersId,
        title,
        video,
        likes,
        date,
        price
    ){
        this.id = id
        this.photographersId = photographersId
        this.title = title
        this.video = video
        this.likes = likes
        this.date = date
        this.price = price
    }
}
class Image {
    constructor(
        id,
        photographersId,
        title,
        image,
        likes,
        date,
        price
    ){
        this.id = id
        this.photographersId = photographersId
        this.title = title
        this.image = image
        this.likes = likes
        this.date = date
        this.price = price
    }
}

class Media {
    constructor(
        id,
        photographersId,
        title,
        likes,
        date,
        price
    ){
        this.id = id
        this.photographersId = photographersId
        this.title = title
        this.likes = likes
        this.date = date
        this.price = price
    }
}
export class MediaFactory{
    createMedia(media){
        console.log(media, "yo")
     media.map((item) => {
        let itemKeys = Object.keys(item)
        if(itemKeys.includes("video")){
            console.log("video created id:", item.id)
            return new Video(item)
        } else if (itemKeys.includes("image")){
            console.log("image created id:", item.id)
            return new Image(item)
        } else {
            console.log(item.id)
            throw new Error("Error! the element isnt a video nor a image")
        }
     })
    }
}   
