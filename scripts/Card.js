// Шаблон карточки
// const templateCards = document.querySelector('#cards-list-template');
// const templateCardsContent = templateCards.content;
// const itemCardsList = templateCardsContent.querySelector('#cards-item');

import { openPopup } from "./index.js";

const cardsListItems = document.querySelector('#cards-list');

// Попап с картинкой
const popupImage = document.querySelector('#view-image-popup');
const linkPopupImage = popupImage.querySelector('.popup-img__image');
const captionPopupImage = popupImage.querySelector('.popup-img__caption');

export class Card {
    constructor(cardLink, cardTitle, templateSelector) {
        this.cardLink = cardLink;
        this.cardTitle = cardTitle;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('#cards-item')
            .cloneNode(true);

        return cardElement;
    }

    // Обработчики карточки
    _setEventListeners() {
        // Кнопка удаления
        const buttonDeleteCard = this.cardElement.querySelector('.cards__btn-delete');
        buttonDeleteCard.addEventListener('click', function () {
            cardsListItems.removeChild(buttonDeleteCard.parentElement);
        });

        // Кнопка like
        const buttonLikeCard = this.cardElement.querySelector('.cards__btn-like');
        buttonLikeCard.addEventListener('click', function (evt) {
            evt.target.classList.toggle('cards__btn-like_active');
        });

        // Открывает попап с картинкой при нажатии на картинку
        const imageCard = this.cardElement.querySelector('.cards__image');
        imageCard.addEventListener('click', function () {
            openPopup(popupImage);

            linkPopupImage.src = imageCard.src;
            linkPopupImage.alt = imageCard.alt;

            captionPopupImage.textContent = imageCard.alt;
        });
    }

    createCard() {
        // Клонирует элемент для новой карточки
        // (true - глубокое клонирование со всеми элементами)
        // const newCard = itemCardsList.cloneNode(true);
        this.cardElement = this._getTemplate();

        // Задает значения элементам новой карточки
        // const titleImage = newCard.querySelector('#cards-title');
        // titleImage.textContent = title;
        const titleImage = this.cardElement.querySelector('#cards-title');
        titleImage.textContent = this.cardTitle;

        // const linkImage = newCard.querySelector('#cards-image');
        // linkImage.src = link;
        // linkImage.alt = title;
        const linkImage = this.cardElement.querySelector('#cards-image');
        linkImage.src = this.cardLink;
        linkImage.alt = this.cardTitle;

        // // Кнопка удаления
        // const buttonDeleteCard = this.cardElement.querySelector('.cards__btn-delete');
        // buttonDeleteCard.addEventListener('click', function () {
        //     console.log(this.cardElement)
        //     cardsListItems.removeChild(this.cardElement);
        // });
        //
        // // Кнопка like
        // const buttonLikeCard = this.cardElement.querySelector('.cards__btn-like');
        // buttonLikeCard.addEventListener('click', function (evt) {
        //     evt.target.classList.toggle('cards__btn-like_active');
        // });
        //
        // // Открывает попап с картинкой при нажатии на картинку
        // const imageCard = this.cardElement.querySelector('.cards__image');
        // imageCard.addEventListener('click', function () {
        //     openPopup(popupImage);
        //
        //     console.log(`this.cardLink`)
        //     console.log(this.cardElement)
        //     popupImage.querySelector('.popup-img__image').src = this.cardLink;
        //     linkPopupImage.alt = this.cardTitle;
        //
        //     captionPopupImage.textContent = this.cardTitle;
        // });

        this._setEventListeners();

        return this.cardElement;
    }
}