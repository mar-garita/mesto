export class FormValidator {
    constructor({formSelector, ...rest}, formElement) {
        this.formSelector = {formSelector, ...rest};
        this.formElement = formElement;
    }
    // Показывает ошибку
    _showError = (formElement, inputElement, errorMessage, inputErrorClass) => {
        // Находит элемент ошибки и добавляет ему стили и текст ошибки
        const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
    };

// Скрывает ошибку
    _hideError = (formElement, inputElement, inputErrorClass) => {
        // Находит элемент ошибки и удаляет у него стили и текст ошибки
        const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
    };

// Проверяет массив полей на валидность
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            // Если поле невалидно, колбэк вернёт true,
            // обход массива прекратится и вся функция вернёт true
            return !inputElement.validity.valid;
        })
    };

// Проверяет валидность одного поля ввода и вызывает функцию добавления/удаления ошибки
    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            // Если в поле введены невалидные данные, показывает ошибку
            const errorMessage = inputElement.validationMessage;
            this._showError(formElement, inputElement, errorMessage, this.formSelector.inputErrorClass);
        } else {
            // Валидные — скрывает ошибку
            this._hideError(formElement, inputElement, this.formSelector.inputErrorClass);
        }
    };

// Функция отвечает за блокировку кнопки «Отправить»
    _toggleButtonState = (inputList, buttonElement) => {
        // Если в форме есть невалидное поле – деактивирует кнопку
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', true);
        } else {
            // Активирует кнопку
            buttonElement.removeAttribute('disabled');
        }
    };

// Устанавливает слушатель события input для полей ввода
    _setEventListeners = (formElement, inputSelector) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector('.popup__save-button');

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                // Проверяет валидность поля
                this._checkInputValidity(formElement, inputElement);
                // Проверяет состояние кнопки при каждом изменении символа в поле
                this._toggleButtonState(inputList, buttonElement);
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
