// Валидация как в вебинаре

const validators = {
    name: validateInputName,
    about: validateInputAbout,
    title: validateInputTitle,
    link: validateInputLinkImage
}

const classNames = {
    input: 'popup__input',
    inputInvalid: 'popup__input_invalid',
    error: 'popup__error'
}

function handleSubmit(values, evt) {
    evt.preventDefault();
    console.log(values);
    console.log(evt);
}

function handleError() {
    console.error('Form Error');
}


function enableValidation(form, validators, classNames, handleSubmit, handleError) {
    // Параметр key – атрибут name поля ввода

    const buttonSubmit = form.querySelector('.popup__save-button');

    // Находит валидатор по ключу, передает ему значение value и вызывает его
    const validate = (key, value) => {
        const validator = validators[key];
        return validator(value); // null/текст ошибки
    }

    // Ищет в форме поле ввода по классу (classNames.input) и атрибуту name
    const getInputElement = key => {
        return form.querySelector(`.${classNames.input}[name=${key}]`);
    }

    // Ищет в форме элемент ошибки по классу (classNames.input) и атрибуту data-key = текущий name
    const getErrorElement = key => {
        return form.querySelector(`.${classNames.error}[data-key=${key}]`); // null/элемент ошибки
    }

    // Добавляет элемент ошибки
    const setError = (key, errorMessage) => {
        console.log(`setError for ${key}`)
        // Добавляет полю 'невалидные' стили
        const input = getInputElement(key);
        input.classList.add(classNames.inputInvalid);

        // Получает элемент ошибки
        let errorElement = getErrorElement(key);

        // Если элемента ошибки нет, то создает его и добавляет в верстку
        if (!errorElement) {
            errorElement = document.createElement('p');
            input.after(errorElement);
        }

        errorElement.textContent = errorMessage;
        errorElement.classList.add(classNames.error);
        // Добавляет ключ (с таким же значением, как name у поля ввода, в котором произошла ошибка),
        // чтобы getErrorElement смог найти элемент ошибки по ключу
        errorElement.dataset.key = key;
    }

    // Удаляет ошибку
    const clearError = key => {
        const input = getInputElement(key);
        input.classList.remove(classNames.inputInvalid);

        const errorElement = getErrorElement(key);
        if (errorElement) {
            errorElement.remove();
        }
    }

    const validateForm = event => {
        const form = event.currentTarget;
        const listError = Array.from(form.querySelectorAll('.popup__error'));
        const listInput = Array.from(form.querySelectorAll('.popup__input'));

        if (listError.length === 0 && listInput.length !== 0 && listInput[0].value.length > 1 && listInput[1].value.length > 1) {
            console.log(`FORM VALID`)
            return true;
        }

        console.log(`FORM INVALID`)
        return false;
    }

    const setSubmitButtonState = isFormValid => {
        // Если форма валидная, разблокирует кнопку сабмит
        if (isFormValid) {
            buttonSubmit.removeAttribute('disabled');
        } else {
            // Если форма невалидная, то заблокирует
            buttonSubmit.setAttribute('disabled', true);
        }
    }


    form.addEventListener('input', event => {
        const input = event.target; // поле, в котором произошло событие
        const key = input.name;
        const value = input.value;

        const error = validate(key, value); // null/ошибка
        const isFormValid = false;

        // Нет ошибки: очищает ошибку и активирует кнопку
        if (!error) {
            clearError(key);
            const isFormValid = validateForm(event);
            setSubmitButtonState(isFormValid);
            return;
        }

        // Есть ошибка: добавляет ошибку и деактивирует кнопку
        setError(key, error);
        setSubmitButtonState(isFormValid);
    });

    form.addEventListener('submit', event => {
        // Получает все данные из фомы
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData);

        let isFormValid = validateForm(event);

        // Форма невалидна: отменяет отправку формы
        if (!isFormValid) {
            event.preventDefault();
            handleError();
            return;
        }

        // Форма валидна: отправляет в консоль данные, которые ввел пользователь
        handleSubmit(values, event);
        // Отправляет данные формы
        submitForm(form, values);
    });
}

// Валидаторы полей ввода

function validateInputName(value) {
    if (!value) {
        return 'Введите имя';
    }

    if (value.length < 2 || value.length > 40) {
        return `Имя должно быть от 2 до 40 символов`;
    }

    return null;
}

function validateInputAbout(value) {
    if (!value) {
        return 'Введите информацию о себе';
    }

    if (value.length < 2 || value.length > 200) {
        return `Информация о себе должна быть от 2 до 200 символов`;
    }

    return null;
}

function validateInputTitle(value) {
    if (!value) {
        return 'Введите название';
    }

    if (value.length < 2 || value.length > 30) {
        return `Название должно быть от 2 до 30 символов`;
    }

    return null;
}

function validateInputLinkImage(value) {
    const input = document.createElement('input');

    // Добавляет элементу <input> атрибуты
    input.type = 'url';
    input.required = true;
    input.value = value;

    const isValid = input.checkValidity();

    if (!value) {
        return 'Введите ссылку';
    }
    if (!isValid) {
        return 'Некорректная ссылка';
    }

    return null;
}
