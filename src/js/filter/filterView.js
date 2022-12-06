import 'url-search-params-polyfill'

const elements = {
    // метода возвращает актуальную коллекцию элементов
    filterSelect: document.getElementsByClassName('filter__dropdown'),
    filterRooms: document.getElementsByClassName('rooms__checkbox'),
    filterFields: document.getElementsByClassName('range__input'),
    filterSubmit: document.getElementsByClassName('filter__show'),

}

export function render(params) {

    // complexNames: Array(4)
    //     0: "Генеральский"
    //     1: "Квантум"
    //     2: "Лесной"
    //     3: "Речной"

    // <option value="Генеральский">ЖК Генеральский</option> <option value="Речной">ЖК Речной</option> <option value="Лесной">ЖК Лесной</option> <option value="Квантум">ЖК Квантум</option>

    let complexNames = '';
    params.complexNames.forEach((name) => {
        complexNames += `<option value="${name}">ЖК ${name}</option>`;
    })

    // <input
    //     name="rooms"
    //     type="checkbox"
    //     id="rooms_1"
    //     class="rooms__checkbox"
    //     value="1"
    // /><label for="rooms_1" class="rooms__btn">1</label>

    let rooms = '';
    params.roomValues.forEach((value) => {
        rooms += `<input
                //     name="rooms"
                //     type="checkbox"
                //     id="rooms_${value}"
                //     class="rooms__checkbox"
                //     value="${value}"
                // /><label for="rooms_${value}" class="rooms__btn">${value}</label>`
    });

    const markup = `<!-- Filter -->
        <form id='filter-form' method="GET" class="container p-0">
            <div class="heading-1">Выбор квартир:</div>
            <div class="filter">
                <div class="filter__col">
                    <div class="filter__label">Выбор проекта:</div>
                    <select name="complex" id="" class="filter__dropdown">
                        <option value="all">Все проекты</option>
                        ${complexNames}
                    </select>
                </div>
                <div class="filter__col rooms">
                    <div class="filter__label">Комнат:</div>
                    <div class="rooms__wrapper">
                        ${rooms}
                    </div>
                </div>
                <div class="filter__col">
                    <div class="filter__label">Площадь:</div>
                    <div class="range__wrapper">
                        <label class="range">
                            <div for="" class="range__label">от</div>
                            <input
                                name="sqmin"
                                min="0"
                                type="number"
                                class="range__input"
                                placeholder="${params.squareMin}" 
                                value="${params.squareMin}"
                            />
                            <div class="range__value">м2</div>
                        </label>
                        <label class="range">
                            <div for="" class="range__label">до</div>
                            <input
                                name="sqmax"
                                min="0"
                                type="number"
                                class="range__input"
                                placeholder="${params.squareMax}" 
                                value="${params.squareMax}"
                            />
                            <div class="range__value">м2</div>
                        </label>
                    </div>
                </div>
                <div class="filter__col">
                    <div class="filter__label">Стоимость:</div>
                    <div class="range__wrapper">
                        <div class="range">
                            <label for="" class="range__label">от</label>
                            <input
                                type="number"
                                name="pricemin"
                                min="0"
                                class="range__input range__input--price"
                                placeholder="${params.priceMin}" 
                                value="${params.priceMin}"
                            />
                            <div class="range__value">₽</div>
                        </div>
                        <div class="range">
                            <label for="" class="range__label">до</label>
                            <input
                                type="number"
                                name="pricemax"
                                min="0"
                                class="range__input range__input--price"
                                placeholder="${params.priceMax}" 
                                value="${params.priceMax}"
                            />
                            <div class="range__value">₽</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filter__buttons">
                <button class="filter__show">Показать объекты</button>
                <button type='reset' class="filter__reset">Сбросить фильтр</button>
            </div>
        </form>
    <!-- // Filter -->`;

    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup);
}

export function changeButtonText(number) {
    const btn = elements.filterSubmit[0];
    btn.innerText = number > 0 ? `Показать ${number} объектов`: 'Объекты не найдены. Измените условия поиска'
    // Disable btn при пустом экземпляре
    btn.disabled = number === 0;
}

// ф-я для получения всех данных с формы
export function getInput() {
    const searchParams = new URLSearchParams();

    // 1. Значение с селекта
    if (elements.filterSelect[0].value !== 'all') {
        searchParams.append(
            elements.filterSelect[0].name,
            elements.filterSelect[0].value
        )
    }

    // 2. Параметры комнат
    const roomsValues = [];
    Array.from(elements.filterRooms).forEach((checkbox) => {
        if (checkbox.value !== '' && checkbox.checked) {
            roomsValues.push(checkbox.value);
        }
    })

    const roomsValuesString = roomsValues.join(',');
    if (roomsValuesString !== '') {
        searchParams.append('rooms', roomsValuesString);
    }

    // 3. Значения площадь и цена - input
    Array.from(elements.filterFields).forEach(input => {
        if (input != '') {
            // name должно соответствовать нашей документации
            searchParams.append(input.name, input.value)
        }
    })

    const queryString = searchParams.toString();

    if (queryString) {
        return '?' + queryString;
    } else {
        return '';
    }

}