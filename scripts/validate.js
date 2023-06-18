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


    form.addEventListener('input', event => {
        const input = event.target; // поле, в котором произошло событие
        const key = input.name;
        const value = input.value;

        const error = validate(key, value); // null/ошибка

        // Нет ошибки и data-dirty="false": очищает ошибку после того как с поля убираем фокус
        if (!error) {
            input.blur = () => {
                input.dataset.dirty = 'true';
            };
            clearError(key);
            return;
        }

        // Есть ошибка и dataset.dirty === 'true': сразу показывает ошибку
        if (input.dataset.dirty === 'true') {
            setError(key, error);
            return;
        }

        input.addEventListener('blur', () => {
            input.dataset.dirty = 'true';
            const error = validate(event.target.name, event.target.value);
            if (error) {
                setError(key, error);
            }},
            { once: true }
        );
    });

    form.addEventListener('submit', event => {
        // Получает все данные из фомы
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData);

        // По умолчанию форма валидна
        let isFormValid = true;

        // Проходит по всем полям formData
        formData.forEach((value, key) => {
            const input = getInputElement(key);
            input.dataset.dirty = 'true';

            const error = validate(key, value); // возвращает null/текст ошибки

            if (!error) {
                return; // форма валидна
            }

            // Ошибка есть, форма невалидна
            setError(key, error);
            isFormValid = false;
        });

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
