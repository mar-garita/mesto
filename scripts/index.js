// Кнопка открытия попапа редактирования профиля пользователя
const openPopupButtonEl = document.querySelector('#open-popup-button');

// Данные пользователя в профиле
const profileTitleEl = document.querySelector('.profile__title');
const profileSubtitleEl = document.querySelector('.profile__subtitle');

// Попап редактирования профиля пользователя
const editPopupEl = document.querySelector('#edit-popup');

// Форма редактирования профиля пользователя
const editFormEl = document.querySelector('#edit-form');

// Поля формы редактирования профиля пользователя
const nameInputEl = document.querySelector('#name-input');
const jobInputEl = document.querySelector('#job-input');

// Кнопка закрытия попапа редактирования профиля
const closePopupButtonEl = document.querySelector('#close-popup-button');


openPopupButtonEl.addEventListener('click', function () {
    openPopup(editPopupEl);
});

closePopupButtonEl.addEventListener('click', function () {
    closePopup(editPopupEl);
});

editFormEl.addEventListener('submit', handleFormSubmit);


// Обработчик «отправки» формы, срабатывает при нажатии на "Сохранить"
// Получает значение полей jobInput и nameInput из свойства value и
// записывает их в профиль пользователя
function handleFormSubmit (evt) {
    evt.preventDefault(); // Отмена стандартной отправки формы

    profileTitleEl.textContent = nameInputEl.value;
    profileSubtitleEl.textContent = jobInputEl.value;

    closePopup(editPopupEl);
}

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');

    nameInputEl.value = profileTitleEl.textContent;
    jobInputEl.value = profileSubtitleEl.textContent;
}

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}
