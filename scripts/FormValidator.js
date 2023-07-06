export class FormValidator {
    constructor({formSelector, ...rest}, formElement) {
        this.formSelector = {formSelector, ...rest};
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(this.formSelector.inputSelector));
        this.buttonElement = formElement.querySelector(this.formSelector.saveButton);
    }
    // Показывает ошибку
    _showError = (inputElement, errorMessage) => {
        // Находит элемент ошибки и добавляет ему стили и текст ошибки
        const errorElement = this.formElement.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.add(this.formSelector.inputErrorClass);
        errorElement.textContent = errorMessage;
    };

// Скрывает ошибку
    _hideError = (inputElement) => {
        // Находит элемент ошибки и удаляет у него стили и текст ошибки
        const errorElement = this.formElement.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.remove(this.formSelector.inputErrorClass);
        errorElement.textContent = '';
    };

    // Управляет кнопкой и очищает поля ввода при открытии попапа, вызывается в index.js
    resetValidation() {
        this._toggleButtonState();

        this.inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        });
    }

    // Проверяет массив полей на валидность
    _hasInvalidInput = () => {
        return this.inputList.some((inputElement) => {
            // Если поле невалидно, колбэк вернёт true,
            // обход массива прекратится и вся функция вернёт true
            return !inputElement.validity.valid;
        })
    };

    // Проверяет валидность одного поля ввода и вызывает функцию добавления/удаления ошибки
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            // Если в поле введены невалидные данные, показывает ошибку
            const errorMessage = inputElement.validationMessage;
            this._showError(inputElement, errorMessage);
        } else {
            // Валидные — скрывает ошибку
            this._hideError(inputElement);
        }
    };

    // Функция отвечает за блокировку кнопки «Отправить»
    _toggleButtonState = () => {
        // Если в форме есть невалидное поле – деактивирует кнопку
        if (this._hasInvalidInput()) {
            this.buttonElement.setAttribute('disabled', true);
        } else {
            // Активирует кнопку
            this.buttonElement.removeAttribute('disabled');
        }
    };

    // Устанавливает слушатель события input для полей ввода
    _setEventListeners = () => {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                // Проверяет валидность поля
                this._checkInputValidity(inputElement);
                // Проверяет состояние кнопки при каждом изменении символа в поле
                this._toggleButtonState();
            });
        });
    };

    // Включает валидацию
    enableValidation = () => {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        // Вызывает функцию, которая устанавливает слушатель события input для полей ввода формы
        this._setEventListeners(this.formElement, this.formSelector.inputSelector);
    }
}
