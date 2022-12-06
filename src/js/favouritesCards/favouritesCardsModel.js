export default class FavouritesCards {
    constructor(favsList) {
        this.favsList = favsList;
    }

    async getFavs() {
        const ids = this.favsList.toString();
        const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`;
        const result = await fetch(queryString);
        const data = await result.json();
        this.cards = data;
    }
}