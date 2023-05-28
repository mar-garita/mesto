// Профиль пользователя
const titleProfileEl = document.querySelector('.profile__title');
const subtitleProfileEl = document.querySelector('.profile__subtitle');
const buttonOpenEditPopupEl = document.querySelector('#profile-edit-button');
const buttonOpenAddPopupEl = document.querySelector('#add-card-button');

// Попап редактирования профиля пользователя
const popupEditProfileEl = document.querySelector('#edit-popup');
const formEditProfileEl = document.querySelector('#edit-form');
const inputNameEl = document.querySelector('#name-input');
const inputJobEl = document.querySelector('#job-input');
const buttonCloseEditPopupEl = document.querySelector('#close-popup-button');

// Попап добавления карточки
const popupAddCardEl = document.querySelector('#add-card-popup');
const formAddCardEl = document.querySelector('#add-card-form');
const buttonCloseAddPopupEl = document.querySelector('#close-add-popup-button');

// Попап с картинкой
const popupImageEl = document.querySelector('#view-image-popup');
const linkPopupImageEl = popupImageEl.querySelector('.popup-img__image');
const captionPopupImageEl = popupImageEl.querySelector('.popup-img__caption');
const buttonClosePopupImageEl = document.querySelector('#close-popup-img');

// Шаблон карточки
const templateCards = document.querySelector('#cards-list-template');
const templateCardsContent = templateCards.content;
const itemCardsListEl = templateCardsContent.querySelector('#cards-item');

// Контейнер для добавления карточек (ul)
const cardsListItemsEl = document.querySelector('#cards-list');


// Открывает попап редактирования профиля
buttonOpenEditPopupEl.addEventListener('click', function () {
    openPopup(popupEditProfileEl);

    inputNameEl.value = titleProfileEl.textContent;
    inputJobEl.value = subtitleProfileEl.textContent;
});

// Закрывает попап редактирования профиля
buttonCloseEditPopupEl.addEventListener('click', function () {
    closePopup(popupEditProfileEl);
});

// Сохраняет измененные данные пользователя
formEditProfileEl.addEventListener('submit', submitFormEditProfile);

// Открывает попап добавления карточки
buttonOpenAddPopupEl.addEventListener('click', function () {
    openPopup(popupAddCardEl);
});

// Закрывает попап добавления карточки
buttonCloseAddPopupEl.addEventListener('click', function () {
    closePopup(popupAddCardEl);
});

// Закрывает попап с картинкой
buttonClosePopupImageEl.addEventListener('click', function () {
    closePopup(popupImageEl);
})


// Обработчик «отправки» формы, срабатывает при нажатии на "Сохранить"
// Получает значение полей jobInput и nameInput из свойства value и
// записывает их в профиль пользователя
function submitFormEditProfile (event) {
    event.preventDefault(); // Отмена стандартной отправки формы

    titleProfileEl.textContent = inputNameEl.value;
    subtitleProfileEl.textContent = inputJobEl.value;

    closePopup(popupEditProfileEl);
}

// Слушатель кнопки "Создать" в попапе добавления карточки,
// отправляет форму
formAddCardEl.addEventListener('submit', function (event) {
    event.preventDefault();

    // Получает данные инпутов
    // target - место, где произошло событие submit (в данном случае событие произошло на форме)
    const form = event.target; // получает форму
    const formData = new FormData(form); // FormData получает текущие значения полей формы
    const values = Object.fromEntries(formData); // fromEntries преобразует список пар ключ-значение в объект

    const title = values['title'];
    const link = values['link-image'];

    const newCard = createCard(title, link);
    cardsListItemsEl.prepend(newCard);

    form.reset(); // очищает поля ввода
    closePopup(popupAddCardEl);
});

// Функция проходит по массиву initialCards и для каждого объекта создает
// на странице карточку, добавляя ее в начало списка карточек
initialCards.forEach(function (item) {
    const newCard = createCard(item.name, item.link);
    cardsListItemsEl.prepend(newCard);
});

function createCard (title, link) {
    // Клонирует элемент для новой карточки
    // (true - глубокое клонирование со всеми элементами)
    const newCard = itemCardsListEl.cloneNode(true);

    // задает значения элементам новой карточки
    const titleImageEl = newCard.querySelector('#cards-title');
    titleImageEl.textContent = title;

    const linkImageEl = newCard.querySelector('#cards-image');
    linkImageEl.src = link;
    linkImageEl.alt = title;


    // Кнопка удаления
    const buttonDeleteCardEl = newCard.querySelector('.cards__btn-delete');
    buttonDeleteCardEl.addEventListener('click', function () {
        cardsListItemsEl.removeChild(newCard);
    });

    // Кнопка like
    const buttonLikeCardEl = newCard.querySelector('.cards__btn-like');
    buttonLikeCardEl.addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__btn-like_active');
    })

    // Открывает попап с картинкой при нажатии на картинку
    const imageCardEl = newCard.querySelector('.cards__image');
    imageCardEl.addEventListener('click', function () {
        openPopup(popupImageEl);

        linkPopupImageEl.src = link;
        linkPopupImageEl.alt = title;

        captionPopupImageEl.textContent = title;
    })

    return newCard;
}

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
}

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}
