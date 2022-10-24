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
        console.log(this.db)
    }

    getUserCardDom(id) {
        const user = this.db.filter((photographer)=>{
            return photographer.id === id;
        })[0]
        
        const picture = `assets/photographers/${user.portrait}`;
        
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = user.name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
}