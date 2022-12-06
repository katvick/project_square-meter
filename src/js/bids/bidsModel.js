export default class Bids {
    constructor() {

    }

    async getBids() {
        try {
            const queryString = 'http://jsproject.webcademy.ru/bids';
            const result = await fetch(queryString);
            const data = await result.json();
            this.bids = data;
        } catch (error) {
            console.log(error);
            alert('Error with getting Bits');
        }
        
    }
}