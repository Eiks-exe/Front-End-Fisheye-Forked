import { globalState, initData } from "../utils/data.js";
initData();
export class Photographer {
    constructor(
        id,
        name,
        city,
        country,
        tagline,
        price,
        portrait
    ){
        this.id = id
        this.name= name
        this.city = city
        this.country = country
        this.tagline = tagline
        this.price = price
        this.portrait = portrait
    }

}
export class PhotographerFactory {
    db = []

    async init() {
        globalState.photographers.forEach((photographer) => {
            this.create(
                new Photographer(
                        photographer.id,
                        photographer.name,
                        photographer.city,
                        photographer.country,
                        photographer.tagline,
                        photographer.price,
                        photographer.portrait
                    )
            )
        })
    }

    create(newValue){
        if (newValue instanceof Photographer){
            const newPhotographer = newValue;
            console.log(newPhotographer.name);
            this.db.push(newPhotographer)
            return this.db;
        } else {
            throw new Error(`${newValue} isnt a instance of Photographer`)
        }
    }
    display(){
        return this.db
    }
    get(id) {
        const user =  this.db.filter((photographer) => {
            return photographer.id === id 
        })
        return user;
    }

    getUserCardDom(id) {
        const user = this.db.filter((photographer)=>{
            return photographer.id === id;
        })[0]
        const link = document.createElement('a')
        link.setAttribute("href", `../../photographer.html?id=${user.id}`)
        const picture = `../../assets/photographers/${user.portrait}`;
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", user.portrait)
        const h2 = document.createElement( 'h2' );
        const country = document.createElement('address');
        const tagline = document.createElement('p')
        const price = document.createElement('span')
        h2.textContent = user.name;
        country.textContent = `${user.city}, ${user.country}`;
        tagline.textContent = user.tagline;
        price.textContent = `${user.price}€/jour`;

        article.appendChild(link)
        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(country);
        link.appendChild(tagline);
        link.appendChild(price);
        return (article);
    }
}