import * as view from './listingView';

export default function(state) {
    console.log('Component listing started!');

    // рендеринг на старте контейнера для карточек
    view.render();

    // рендер карточек
    state.results.forEach(function(item) {
        view.renderCard(item, state.favourites.isFav(item.id))
    })

    // Запускаем прослушку клика на иконки "Добавить в избранное"
    addToFavsListener();

    // рендеринг после клика на кнопку
    state.emitter.subscribe('event:render-listing', () => {
        //Очистка контейнера с карточками
        view.clearListingContainer();
        // Отрендерить карточки
        state.results.forEach(function(item) {
            view.renderCard(item, state.favourites.isFav(item.id))
        });
        // Запускаем прослушку клика на иконки "Добавить в избранное"
        addToFavsListener();
    });

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