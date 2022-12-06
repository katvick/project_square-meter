export default class Filter {
    constructor() {
        this.query = '';
    }

    // async возвращает промис
    async getParams() {
        try {
            const queryString = 'http://jsproject.webcademy.ru/itemsinfo';

            // 1. fetch возвращает нам промис с ответом с сервера
            // 2. у полученного промиса вызываем метод json(), но это все равно еще промис
            // 3. выполняем промис, возвращаем непосредственно сами данные и сохраняем их в св-во объекта Filter

            const response = await fetch(queryString);
            const data = await response.json();
            this.params = data;
        } catch(error) {
            alert(error);
        }
    }

    async getResults() {
        try {
            const queryString = `http://jsproject.webcademy.ru/items${this.query}`;
            const response = await fetch(queryString);
            const data = await response.json();
            this.result = data;
            console.log("TCL: Filter -> getResults -> this.result ", this.result )
        } catch(error) {
            alert(error);
        }
    }
}