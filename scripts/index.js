const openPopupButtonEl = document.querySelector('#open-popup-button');
const closePopupButtonEl = document.querySelector('#close-popup-button');
const editPopupEl = document.querySelector('#edit-popup');
const profileTitleEl = document.querySelector('.profile__title');
const profileSubtitleEl = document.querySelector('.profile__subtitle');
const nameInputEl = document.querySelector('#name-input');
const infoInputEl = document.querySelector('#info-input');
const editFormEl = document.querySelector('#edit-form');

openPopupButtonEl.addEventListener('click', function () {
    openPopup(editPopupEl);
});

closePopupButtonEl.addEventListener('click', function () {
    closePopup(editPopupEl);
});

nameInputEl.value = profileTitleEl.textContent;
infoInputEl.value = profileSubtitleEl.textContent;

editFormEl.addEventListener('submit', function (event) {
    event.preventDefault();

    profileTitleEl.textContent = nameInputEl.value;
    profileSubtitleEl.textContent = infoInputEl.value;

    closePopup(editPopupEl);
});

function openPopup(popupEl) {
    popupEl.classList.add('popup_is-opened');
}

function closePopup(popupEl) {
    popupEl.classList.remove('popup_is-opened');
}
