// Профиль пользователя
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const buttonOpenEditPopup = document.querySelector('#profile-edit-button');
const buttonOpenAddPopup = document.querySelector('#add-card-button');

// Попап редактирования профиля пользователя
const popupEditProfile = document.querySelector('#edit-popup');
const formEditProfile = document.querySelector('#edit-form');
const inputName = document.querySelector('#name-input');
const inputJob = document.querySelector('#job-input');
const buttonCloseEditPopup = document.querySelector('#close-popup-button');

// Попап добавления карточки
const popupAddCard = document.querySelector('#add-card-popup');
const formAddCard = document.querySelector('#add-card-form');
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

const overlayPopup = document.querySelector('.popup');

// Открывает попап редактирования профиля
buttonOpenEditPopup.addEventListener('click', function () {
    openPopup(popupEditProfile);

    inputName.value = titleProfile.textContent;
    inputJob.value = subtitleProfile.textContent;
});

// Закрывает попап редактирования профиля
buttonCloseEditPopup.addEventListener('click', () => closePopup(popupEditProfile));

// Сохраняет измененные данные пользователя
formEditProfile.addEventListener('submit', submitFormEditProfile);

// Открывает попап добавления карточки
buttonOpenAddPopup.addEventListener('click', () => openPopup(popupAddCard));

// Закрывает попап добавления карточки
buttonCloseAddPopup.addEventListener('click', () => closePopup(popupAddCard));

// Закрывает попап с картинкой
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));


// Обработчик «отправки» формы, срабатывает при нажатии на "Сохранить"
// Получает значение полей jobInput и nameInput из свойства value и
// записывает их в профиль пользователя
function submitFormEditProfile (event) {
    event.preventDefault(); // Отмена стандартной отправки формы

    titleProfile.textContent = inputName.value;
    subtitleProfile.textContent = inputJob.value;

    closePopup(popupEditProfile);
}

// Слушатель кнопки "Создать" в попапе добавления карточки,
// отправляет форму
formAddCard.addEventListener('submit', function (event) {
    event.preventDefault();

    // Получает данные инпутов
    // target - место, где произошло событие submit (в данном случае событие произошло на форме)
    const form = event.target; // получает форму
    const formData = new FormData(form); // FormData получает текущие значения полей формы
    const values = Object.fromEntries(formData); // fromEntries преобразует список пар ключ-значение в объект

    const title = values['title'];
    const link = values['link-image'];

    const newCard = createCard(title, link);
    cardsListItems.prepend(newCard);

    form.reset();
    closePopup(popupAddCard);
});

// Функция проходит по массиву initialCards и для каждого объекта создает
// на странице карточку, добавляя ее в начало списка карточек
initialCards.forEach(function (item) {
    const newCard = createCard(item.name, item.link);
    cardsListItems.prepend(newCard);
});

function createCard (title, link) {
    // Клонирует элемент для новой карточки
    // (true - глубокое клонирование со всеми элементами)
    const newCard = itemCardsList.cloneNode(true);

    // задает значения элементам новой карточки
    const titleImageEl = newCard.querySelector('#cards-title');
    titleImageEl.textContent = title;

    const linkImageEl = newCard.querySelector('#cards-image');
    linkImageEl.src = link;
    linkImageEl.alt = title;


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

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePopup(popupEl);
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target === popupEl) {
            closePopup(popupEl);
        }

    });
}

function closePopup(popupEl) {
    const form = popupEl.querySelector('.popup__form'); // ищет форму
    if (form) {
        form.reset(); // если в попапе ест форма, очищает поля ввода
    }
    popupEl.classList.remove('popup_opened');
}
