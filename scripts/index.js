import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Профиль пользователя
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const buttonOpenEditPopup = document.querySelector('#profile-edit-button');
const buttonOpenAddPopup = document.querySelector('#add-card-button');

// Попап редактирования профиля пользователя
const popupEditProfile = document.querySelector('#edit-popup');
const formEditPopup = document.querySelector('#edit-form');
const inputName = document.querySelector('#input-name');
const inputAbout = document.querySelector('#input-about');

// Попап добавления карточки
const popupAddCard = document.querySelector('#add-card-popup');
const formAddCard = document.querySelector('#add-card-form');

// Список всех крестиков в попапах
const closeButtons = document.querySelectorAll('.popup__close-button');

// Контейнер для добавления карточек (ul)
const cardsListItems = document.querySelector('#cards-list');

// Шаблон карточки
const templateSelector = '#cards-list-template';

// Селекторы для валидатора
const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_invalid',
    saveButton: '.popup__save-button'
}

// Попап с картинкой
export const popupImage = document.querySelector('#view-image-popup'); // Попап с картинкой
export const linkPopupImage = popupImage.querySelector('.popup-img__image');
export const captionPopupImage = popupImage.querySelector('.popup-img__caption');


// Валидаторы форм попапов
const popupEditProfileValidator = new FormValidator (formSelectors, popupEditProfile);
popupEditProfileValidator.enableValidation();

const popupAddCardValidator = new FormValidator (formSelectors, popupAddCard);
popupAddCardValidator.enableValidation();


// Проходит по массиву initialCards и для каждого объекта создает
// на странице карточку, добавляя ее в начало списка карточек
initialCards.forEach(function (item) {
    const newCard = new Card (item.link, item.title, templateSelector);
    const cardElement = newCard.createCard();
    cardsListItems.prepend(cardElement);
});


// На все кнопки-крестики в попапах устанавливает обработчик закрытия
closeButtons.forEach((button) => {
    // closest() возвращает ближайший родительский элемент (или сам элемент),
    // который соответствует заданному CSS-селектору
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

// Открывает попап редактирования профиля
buttonOpenEditPopup.addEventListener('click', function () {
    openPopup(popupEditProfile);

    inputName.value = titleProfile.textContent;
    inputAbout.value = subtitleProfile.textContent;

    // Валидатор управляет кнопкой и очищает ошибки
    popupEditProfileValidator.resetValidation();
});

// Открывает попап добавления карточки
buttonOpenAddPopup.addEventListener('click', () => {
    openPopup(popupAddCard);

    formAddCard.reset();
    // Валидатор управляет кнопкой и очищает ошибки
    popupAddCardValidator.resetValidation();
});

formAddCard.addEventListener('submit', submitFormAddCard);
formEditPopup.addEventListener('submit', submitFormEditProfile);


// Обработчик формы редактирования профиля
function submitFormEditProfile() {
    // Получает значение полей aboutInput и nameInput из свойства value и записывает их в профиль пользователя
    titleProfile.textContent = inputName.value;
    subtitleProfile.textContent = inputAbout.value;

    closePopup(popupEditProfile);
}

// Обработчик формы добавления карточки
function submitFormAddCard(event) {
    // Получает данные инпутов
    // target - место, где произошло событие submit (в данном случае событие произошло на форме)
    const form = event.target; // получает форму
    const formData = new FormData(form); // FormData получает текущие значения полей формы
    const values = Object.fromEntries(formData); // fromEntries преобразует список пар ключ-значение в объект

    const title = values['title'];
    const link = values['link'];

    // Создает экземпляр карточки
    const newCard = new Card (link, title, templateSelector);
    const cardElement = newCard.createCard();
    cardsListItems.prepend(cardElement);

    closePopup(popupAddCard);
}


export function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', closePopupByEscape);
    document.addEventListener('mousedown', closePopupByOverlay);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closePopupByEscape);
    document.removeEventListener('mousedown', closePopupByOverlay);
}

function closePopupByEscape(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closePopupByOverlay(event) {
    const openedPopup = document.querySelector('.popup_opened');
    if (event.target === openedPopup) {
        closePopup(openedPopup);
    }
}
