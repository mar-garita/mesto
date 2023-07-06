import { openPopup } from "./index.js";
import { cardsListItems, popupImage, linkPopupImage, captionPopupImage } from "./index.js";


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
    _setEventListeners(cardElement) {
        // Кнопка удаления
        const buttonDeleteCard = cardElement.querySelector('.cards__btn-delete');
        buttonDeleteCard.addEventListener('click', function () {
            cardsListItems.removeChild(cardElement);
        });

        // Кнопка like
        const buttonLikeCard = cardElement.querySelector('.cards__btn-like');
        buttonLikeCard.addEventListener('click', function (evt) {
            evt.target.classList.toggle('cards__btn-like_active');
        });

        // Открывает попап с картинкой при нажатии на картинку
        const imageCard = cardElement.querySelector('.cards__image');
        imageCard.addEventListener('click', function () {
            openPopup(popupImage);

            linkPopupImage.src = imageCard.src;
            linkPopupImage.alt = imageCard.alt;

            captionPopupImage.textContent = imageCard.alt;
        });
    }

    createCard() {
        // Получает щаблон для новой карточки
        this.cardElement = this._getTemplate();

        // Задает значения элементам новой карточки
        const titleImage = this.cardElement.querySelector('#cards-title');
        titleImage.textContent = this.cardTitle;

        const linkImage = this.cardElement.querySelector('#cards-image');
        linkImage.src = this.cardLink;
        linkImage.alt = this.cardTitle;

        this._setEventListeners(this.cardElement);
        return this.cardElement;
    }
}
