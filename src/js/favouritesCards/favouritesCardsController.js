import FavouritesCards from './favouritesCardsModel';
import * as view from './favouritesCardsView';

export default async function(state) {
    // Получить список объектов, кот. находытся в избранном
    const favsList = state.favourites.favs;
	console.log("TCL: favsList", favsList)

    // Получение данных с сервера
    const favouritesCards = new FavouritesCards(favsList);
    await favouritesCards.getFavs();

    // Отображаем контейнер и карточки
    view.renderPage(favouritesCards.cards);

    // Запускаем прослушку клика на иконки "Добавить в избранное"
    addToFavsListener();

    // Ф-я для работы иконок "Добавить в избранное"
    function addToFavsListener() {
        Array.from(document.getElementsByClassName('card__like')).forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                // Находим id объекта, по которому кликнули
                const currentId = e.target.closest('.card').dataset.id;
                // Добавляем/убираем элемент из избранного
                state.favourites.toggleFav(currentId);
                // Включаем/Выключаем иконку с избранным
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
            })
        })
    }
}