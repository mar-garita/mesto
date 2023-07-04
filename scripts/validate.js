// const listSelector =


// Показывает ошибку
const showError = (formElement, inputElement, errorMessage, {inputErrorClass}) => {
    // Находит элемент ошибки и добавляет ему стили и текст ошибки
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
};

// Скрывает ошибку
const hideError = (formElement, inputElement, {inputErrorClass}) => {
    // Находит элемент ошибки и удаляет у него стили и текст ошибки
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    console.log(errorElement)
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
};

// Проверяет массив полей на валидность
const hasInvalidInput = (inputList) => {
    console.log(`hasInvalidInput`)
    return inputList.some((inputElement) => {
        // Если поле невалидно, колбэк вернёт true,
        // обход массива прекратится и вся функция вернёт true
        console.log(!inputElement.validity.valid);
        return !inputElement.validity.valid;
    })
};

// Проверяет валидность одного поля ввода и вызывает функцию добавления/удаления ошибки
const checkInputValidity = (formElement, inputElement, {...rest}) => {
    if (!inputElement.validity.valid) {
        // Если в поле введены невалидные данные, показывает ошибку
        const errorMessage = inputElement.validationMessage;
        showError(formElement, inputElement, errorMessage, rest);
    } else {
        // Валидные — скрывает ошибку
        hideError(formElement, inputElement, rest);
    }
};

// Функция отвечает за блокировку кнопки «Отправить»
const toggleButtonState = (inputList, buttonElement) => {
    console.log(`toggleButtonState`)
    // Если в форме есть невалидное поле – деактивирует кнопку
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
    } else {
        // Активирует кнопку
        buttonElement.removeAttribute('disabled');
    }
};

// Устанавливает слушатель события input для полей ввода
const setEventListeners = (formElement, {inputSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector('.popup__save-button');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            // Проверяет валидность поля
            checkInputValidity(formElement, inputElement, rest);
            // Проверяет состояние кнопки при каждом изменении символа в поле
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// Включает валидацию
const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        // Для каждой формы вызывает функцию, которая устанавливает слушатель события input для полей ввода
        formList.forEach((formElement) => {
            setEventListeners(formElement, rest);
        });
    });
}

enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        inputErrorClass: 'popup__input_invalid',
    });
