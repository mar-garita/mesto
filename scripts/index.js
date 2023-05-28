const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Профиль пользователя
const profileTitleEl = document.querySelector('.profile__title');
const profileSubtitleEl = document.querySelector('.profile__subtitle');

// Попап редактирования профиля пользователя
const openPopupButtonEl = document.querySelector('#profile-edit-button'); // Кнопка открытия попапа
const editPopupEl = document.querySelector('#edit-popup'); // Попап редактирования профиля
const editFormEl = document.querySelector('#edit-form'); // Форма редактирования профиля
const nameInputEl = document.querySelector('#name-input'); // Поле ввода имени
const jobInputEl = document.querySelector('#job-input'); // Поле ввода должности
const closePopupButtonEl = document.querySelector('#close-popup-button'); // Кнопка закрытия попапа редактирования

// Попап добавления карточки
const openAddPopupButtonEl = document.querySelector('#add-card-button'); // Кнопка открытия попапа добавления карточки
const addPopupEl = document.querySelector('#add-card-popup'); // Попап добавления карточки
const addCardFormEl = document.querySelector('#add-card-form'); // Форма добавления карточки
const closeAddPopupButtonEl = document.querySelector('#close-add-popup-button'); // Кнопка закрытия попапа

// Попап с картинкой
const popupImageEl = document.querySelector('#view-image-popup');
const closePopupImg = document.querySelector('#close-popup-img');

// Шаблон карточки
const cardsTemplate = document.querySelector('#cards-list-template');
const cardsTemplateContent = cardsTemplate.content;
const cardsListItemEl = cardsTemplateContent.querySelector('#cards-item');

// Контейнер для добавления карточек (ul)
const cardsListItemsEl = document.querySelector('#cards-list');


// Открывает попап редактирования профиля
openPopupButtonEl.addEventListener('click', function () {
    openPopup(editPopupEl);

    nameInputEl.value = profileTitleEl.textContent;
    jobInputEl.value = profileSubtitleEl.textContent;
});

// Закрывает попап редактирования профиля
closePopupButtonEl.addEventListener('click', function () {
    closePopup(editPopupEl);
});

// Сохраняет измененные данные пользователя
editFormEl.addEventListener('submit', handleFormSubmit);

// Открывает попап добавления карточки
openAddPopupButtonEl.addEventListener('click', function () {
    openPopup(addPopupEl);
});

// Закрывает попап добавления карточки
closeAddPopupButtonEl.addEventListener('click', function () {
    closePopup(addPopupEl);
});

// Закрывает попап с картинкой
closePopupImg.addEventListener('click', function () {
    closePopup(popupImageEl);
})


// Обработчик «отправки» формы, срабатывает при нажатии на "Сохранить"
// Получает значение полей jobInput и nameInput из свойства value и
// записывает их в профиль пользователя
function handleFormSubmit (event) {
    event.preventDefault(); // Отмена стандартной отправки формы

    profileTitleEl.textContent = nameInputEl.value;
    profileSubtitleEl.textContent = jobInputEl.value;

    closePopup(editPopupEl);
}

// Слушатель кнопки "Создать" в попапе добавления карточки,
// отправляет форму
addCardFormEl.addEventListener('submit', function (event) {
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
    closePopup(addPopupEl);
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
    const newCard = cardsListItemEl.cloneNode(true);

    // задает значения элементам новой карточки
    const titleImageEl = newCard.querySelector('#cards-title');
    titleImageEl.textContent = title;
    const linkImageEl = newCard.querySelector('#cards-image');
    linkImageEl.src = link;
    linkImageEl.alt = title;


    // Кнопка удаления
    const deleteButton = newCard.querySelector('.cards__btn-delete');
    deleteButton.addEventListener('click', function () {
        cardsListItemsEl.removeChild(newCard);
    });

    // Кнопка like
    const likeCardButtonEl = newCard.querySelector('.cards__btn-like');
    likeCardButtonEl.addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__btn-like_active');
    })

    // Открывает попап с картинкой при нажатии на картинку
    const imageCardEl = newCard.querySelector('.cards__image');
    imageCardEl.addEventListener('click', function () {
        openPopup(popupImageEl);

        const linkPopupImageEl = popupImageEl.querySelector('.popup-img__image');
        linkPopupImageEl.src = link;
        linkPopupImageEl.alt = title;

        const popupImgCaption = popupImageEl.querySelector('.popup-img__caption');
        popupImgCaption.textContent = title;
    })

    return newCard;
}

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
}

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}
