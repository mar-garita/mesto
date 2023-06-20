// Профиль пользователя
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const buttonOpenEditPopup = document.querySelector('#profile-edit-button');
const buttonOpenAddPopup = document.querySelector('#add-card-button');

// Попап редактирования профиля пользователя
const popupEditProfile = document.querySelector('#edit-popup');
const formEditPopup = document.querySelector('#edit-form');
const inputName = document.querySelector('#name-input');
const inputAbout = document.querySelector('#about-input');

// Попап добавления карточки
const popupAddCard = document.querySelector('#add-card-popup');
const formAddCard = document.querySelector('#add-card-form')

// Попап с картинкой
const popupImage = document.querySelector('#view-image-popup');
const linkPopupImage = popupImage.querySelector('.popup-img__image');
const captionPopupImage = popupImage.querySelector('.popup-img__caption');

// Шаблон карточки
const templateCards = document.querySelector('#cards-list-template');
const templateCardsContent = templateCards.content;
const itemCardsList = templateCardsContent.querySelector('#cards-item');

// Контейнер для добавления карточек (ul)
const cardsListItems = document.querySelector('#cards-list');

// Универсальные элементы попапа
const popups = document.querySelectorAll('.popup');
const forms = document.querySelectorAll('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button'); // список всех крестиков в попапах

// Проходит по массиву initialCards и для каждого объекта создает
// на странице карточку, добавляя ее в начало списка карточек
initialCards.forEach(function (item) {
    const newCard = createCard(item.name, item.link);
    cardsListItems.prepend(newCard);
});


// Обработчики универсальных элементов:

// На все формы устанавливает валидатор
forms.forEach((form) => {
    enableValidation(form, validators, classNames, handleSubmit, handleError);
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

// На все кнопки-крестики в попапах устанавливает обработчик закрытия
closeButtons.forEach((button) => {
    // closest() возвращает ближайший родительский элемент (или сам элемент),
    // который соответствует заданному CSS-селектору
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


// Обработчики уникальных элементов:

// Открывает попап редактирования профиля
buttonOpenEditPopup.addEventListener('click', function () {
    openPopup(popupEditProfile);
    removeErrorElements(formEditPopup);

    inputName.value = titleProfile.textContent;
    inputAbout.value = subtitleProfile.textContent;
});

// Открывает попап добавления карточки
buttonOpenAddPopup.addEventListener('click', () => {
    openPopup(popupAddCard);
    removeErrorElements(formAddCard);
    formAddCard.reset();
    const buttonSubmit = formAddCard.querySelector('.popup__save-button');
    // console.log(buttonSubmit)
    buttonSubmit.setAttribute('disabled', true);
});


// Обработчик формы редактирования профиля
function submitFormEditProfile() {
    // Получает значение полей aboutInput и nameInput из свойства value и записывает их в профиль пользователя
    titleProfile.textContent = inputName.value;
    subtitleProfile.textContent = inputAbout.value;

    closePopup(popupEditProfile);
}

// Обработчик формы добавления карточки
function submitFormAddCard(values, form) {
    const title = values['title'];
    const link = values['link'];

    // Создает карточку
    const newCard = createCard(title, link);
    cardsListItems.prepend(newCard);

    form.reset();
    closePopup(popupAddCard);
}

// Отправляет форму, вызывается в валидаторе
function submitForm(form, values) {
    if (form['id'] === 'add-card-form') {
        submitFormAddCard(values, form);
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

// Удаляет стили и элементы ошибок в попапе
function removeErrorElements(popup) {
    const errors = popup.querySelectorAll('.popup__error');
    errors.forEach((error) => {
        error.parentNode.removeChild(error);
    });

    const inputs = popup.querySelectorAll('.popup__input');
    inputs.forEach((input) => {
        input.classList.remove('popup__input_invalid');
    });
}
