import { globalState, initData } from "../utils/data.js"
initData();

class Media {
    constructor(
        a
    ){
        this.id = a.id
        this.photographerId = a.photographerId
        this.title = a.title
        this.image = a.image
        this.video = a.video
        this.likes = a.likes
        this.date = a.date
        this.price = a.price
    }
}
export class MediaFactory{
    db = []
    async init() {
        this.createMedia(globalState.media)
    }
    /**
     * 
     * @param {photographerId} id 
     * @returns Media[]
     */
    get(id){
        return this.db.filter((item)=>{
            console.log(item.photographerId == id)
           return item.photographerId === id
        })
    }
    createMedia(medias){
        medias.map((item) => {
            this.db.push(new Media(item))
        })
    }
}   
