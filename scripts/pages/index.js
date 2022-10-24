// async function getPhotographers() {
//     // Penser à remplacer par les données récupérées dans le json
//     const photographers = [
//         {
//             "name": "Ma data test",
//             "id": 1,
//             "city": "Paris",
//             "country": "France",
//             "tagline": "Ceci est ma data test",
//             "price": 400,
//             "portrait": "account.png"
//         },
//         {
//             "name": "Autre data test",
//             "id": 2,
//             "city": "Londres",
//             "country": "UK",
//             "tagline": "Ceci est ma data test 2",
//             "price": 500,
//             "portrait": "account.png"
//         },
//     ]
//     // et bien retourner le tableau photographers seulement une fois
//     return ({
//         photographers: [...photographers, ...photographers, ...photographers]})
// }

// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerFactory(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// };

// async function init() {
//     // Récupère les datas des photographes
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// };

// init();
import { MediaFactory } from "../factories/Media";
import { PhotographerFactory } from "../factories/photographer";
import { globalState, initData } from "../utils/data";

const main = async () => {
    await initData()

    const mediaDB = new MediaFactory()
    const photographers = new PhotographerFactory()
}

const getPhotographer = () => {
    globalState.photographers.forEach((photographer) => {
        photographer.id
        photographer.name
        photographer.city,
        photographer.country,
        photographer.tagline,
        photographer.price,
        photographer.portrait
    })
    photographers.display()

    const displayPhotographer = () => {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.getUserCardDom(82)
    }
    getPhotographer()
    displayPhotographer()
}

main()