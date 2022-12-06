import homePage from './pages/homePage';
import singleItem from './pages/singleItemPage';
import favouritesPage from './pages/favouritesPage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventEmitter from './utils/EventEmitter';
import Favourites from './favourites/favouritesModel';

const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites()
};


//Тестирование. После - удалить!
window.state = state;

const routes = {
    '/': homePage,
    'item': singleItem,
    'favourites': favouritesPage,
    'bids': bidsPage
}

function findComponentByPath(path, routes) {
    return routes[path];
}

// Задача роутера:
// - понять, что у нас написано в адресной строке
// - вычленить часть, кот. является маршрутом
// - выполнить поиск по routes, чтобы понять какой компонент запустить

// Router
function router() {
    const pathArray = location.hash.split('/');
    const currentPath = pathArray[0] && pathArray[1] ? pathArray[1] : '/';
 
    state.routeParams = pathArray[2] ? pathArray[2] : ''
    
    const component = findComponentByPath(currentPath, routes) || errorPage;
    
    component(state);
}

// Запускаем роутер:
// Когда меняется хэш / адрес ссылки
window.addEventListener('hashchange', router);
// При загрузке страницы
window.addEventListener('load', router);