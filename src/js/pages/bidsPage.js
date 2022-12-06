import bids from './../bids/bidsController';

export default function(state) {
    // Очищаем контейнер
    document.querySelector('#app').innerHTML = '';
    // Запускаем компонент bids
    bids(state);

}