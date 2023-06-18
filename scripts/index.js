const forms = document.querySelectorAll('.popup__form');

// Профиль пользователя
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const buttonOpenEditPopup = document.querySelector('#profile-edit-button');
const buttonOpenAddPopup = document.querySelector('#add-card-button');

// Попап редактирования профиля пользователя
const popupEditProfile = document.querySelector('#edit-popup');
const inputName = document.querySelector('#name-input');
const inputAbout = document.querySelector('#about-input');
const buttonCloseEditPopup = document.querySelector('#close-popup-button');

// Попап добавления карточки
const popupAddCard = document.querySelector('#add-card-popup');
const buttonCloseAddPopup = document.querySelector('#close-add-popup-button');

// Попап с картинкой
const popupImage = document.querySelector('#view-image-popup');
const linkPopupImage = popupImage.querySelector('.popup-img__image');
const captionPopupImage = popupImage.querySelector('.popup-img__caption');
const buttonClosePopupImage = document.querySelector('#close-popup-img');

// Шаблон карточки
const templateCards = document.querySelector('#cards-list-template');
const templateCardsContent = templateCards.content;
const itemCardsList = templateCardsContent.querySelector('#cards-item');

// Контейнер для добавления карточек (ul)
const cardsListItems = document.querySelector('#cards-list');


// Проходит по массиву initialCards и для каждого объекта создает
// на странице карточку, добавляя ее в начало списка карточек
initialCards.forEach(function (item) {
    const newCard = createCard(item.name, item.link);
    cardsListItems.prepend(newCard);
});

// На все формы вешает валидатор
forms.forEach((form) => {
    enableValidation(form, validators, classNames, handleSubmit, handleError);
});

// Открывает попап редактирования профиля
buttonOpenEditPopup.addEventListener('click', function () {
    openPopup(popupEditProfile);

    inputName.value = titleProfile.textContent;
    inputAbout.value = subtitleProfile.textContent;
});

// Закрывает попап редактирования профиля
buttonCloseEditPopup.addEventListener('click', () => closePopup(popupEditProfile));

// Открывает попап добавления карточки
buttonOpenAddPopup.addEventListener('click', () => openPopup(popupAddCard));

// Закрывает попап добавления карточки
buttonCloseAddPopup.addEventListener('click', () => closePopup(popupAddCard));

// Закрывает попап с картинкой
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));


// Обработчик формы редактирования профиля
function submitFormEditProfile() {
    // Получает значение полей aboutInput и nameInput из свойства value и записывает их в профиль пользователя
    titleProfile.textContent = inputName.value;
    subtitleProfile.textContent = inputAbout.value;

    closePopup(popupEditProfile);
}

// Обработчик формы добавления карточки
function submitFormAddCard(values) {
    const title = values['title'];
    const link = values['link'];

    // Создает карточку
    const newCard = createCard(title, link);
    cardsListItems.prepend(newCard);

    // form.reset();
    closePopup(popupAddCard);
}

// Отправляет форму, вызывается в валидаторе
function submitForm(form, values) {
    if (form['id'] === 'add-card-form') {
        submitFormAddCard(values);
    } else if (form['id'] === 'edit-form') {
        submitFormEditProfile();
    }
}

function createCard(title, link) {
    // Клонирует элемент для новой карточки
    // (true - глубокое клонирование со всеми элементами)
    const newCard = itemCardsList.cloneNode(true);

    // Задает значения элементам новой карточки
    const titleImage = newCard.querySelector('#cards-title');
    titleImage.textContent = title;

    const linkImage = newCard.querySelector('#cards-image');
    linkImage.src = link;
    linkImage.alt = title;

    // Кнопка удаления
    const buttonDeleteCard = newCard.querySelector('.cards__btn-delete');
    buttonDeleteCard.addEventListener('click', function () {
        cardsListItems.removeChild(newCard);
    });

    // Кнопка like
    const buttonLikeCard = newCard.querySelector('.cards__btn-like');
    buttonLikeCard.addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__btn-like_active');
    });

    // Открывает попап с картинкой при нажатии на картинку
    const imageCard = newCard.querySelector('.cards__image');
    imageCard.addEventListener('click', function () {
        openPopup(popupImage);

        linkPopupImage.src = link;
        linkPopupImage.alt = title;

        captionPopupImage.textContent = title;
    });


    return newCard;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    resetForm(popup);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePopup(popup);
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target === popup) {
            closePopup(popup);
        }
    });
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeErrorElements(popup);
}

// Удаляет стили и элементы ошибок в попапе
function removeErrorElements(popup) {
    const errors = popup.querySelectorAll('.popup__error');
    errors.forEach((error) => {
        error.parentNode.removeChild(error);
    });

    const inputs = popup.querySelectorAll('.popup__input');
    inputs.forEach((input) => {
        input.classList.remove('popup__input_invalid');
        input.removeAttribute('data-dirty');
    });
}

// Очищает поля формы
function resetForm(popup) {
    const form = popup.querySelector('.popup__form');
    if (form) {
        form.reset();
    }
}
