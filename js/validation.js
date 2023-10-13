import NODES from './variables.js';


document.addEventListener('DOMContentLoaded', () => {
    NODES.recipient_form.addEventListener('submit', (e) => {
        e.preventDefault();

        let error = formValidate(e.target);

        const formData = new FormData(NODES.recipient_form);
        // Форматируем номер телефона
        formData.set('phone', clearPhoneNumber(formData.get('phone')));

        if (error === 0) {
            //console.log('all correct');

            /*const response = await fetch('', {
                method: 'POST',
                body: formData
            });*/

            //recipient_form.reset();
        } else {
            // Если форма не заполнена или есть ошибки, произойдет скролл к форме
            /* Для мобильной версии
            const screenWidth = window.innerWidth;
            if (screenWidth <= 860) {
                recipientForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }*/

            // Поставил скроллинг при любой ширине экрана
            NODES.recipientForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Не позволяет вводить буквы в инпут ИНН
    NODES.input_inn.addEventListener('input', (e) => {
        NODES.input_inn.value = NODES.input_inn.value.replace(/[^0-9]/g, '');
    });

    NODES.form_inputs.forEach(input => {
        // Валидируем каждый инпут отдельно
        input.addEventListener('change', (e) => {
            hideError(input);

            // Проверка на пустоту инпута
            if (input.value === '') {
                showError(input);
                console.log('input empty error');
            } else if (input.classList.contains('_email')) {
                // Валидация email
                if (!emailValidation(input)) {
                    showError(input, 'wrong');
                    console.log('email error');
                }
            } else if (input.classList.contains('_phone')) {
                // Валидация телефона
                if (!phoneValidation(input)) {
                    showError(input, 'wrong');
                    console.log('phone error');
                }
            } else if (input.classList.contains('_inn')) {
                // Валидация ИНН
                if (!innValidation(input)) {
                    showError(input, 'wrong');
                    console.log('inn error');
                }
            }
        })
    });

    function formValidate() {
        // Валидируем всю форму после события submit
        let error = 0;
        const inputs = document.querySelectorAll('._required');

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            hideError(input);

            // Проверка на пустоту инпута
            if (input.value === '') {
                showError(input);
                error++;
                console.log('input empty error');
            } else if (input.classList.contains('_email')) {
                // Валидация email
                if (!emailValidation(input)) {
                    showError(input, 'wrong');
                    error++;
                    console.log('email error');
                }
            } else if (input.classList.contains('_phone')) {
                if (!phoneValidation(input)) {
                    showError(input, 'wrong');
                    error++;
                    console.log('phone error');
                }
            } else if (input.classList.contains('_inn')) {
                if (!innValidation(input)) {
                    showError(input, 'wrong');
                    error++;
                    console.log('inn error');
                }
            }
        }
        return error;
    }

    function showError(input, type = 'empty') {
        input.classList.add('_error');

        switch (type) {
            case 'empty':
                input.parentElement.querySelector('.error-label_empty').classList.remove('hidden');
                //console.log(input.parentElement.querySelector('.error-label_empty'));
                break;
            case 'wrong':
                input.parentElement.querySelector('.error-label_wrong').classList.remove('hidden');
                //console.log(input.parentElement.querySelector('.error-label_wrong'));
                break;
            default:
                return;
        }
    }
    function hideError(input) {
        input.classList.remove('_error');
        input.parentElement.querySelectorAll('.form__label').forEach(label => label.classList.add('hidden'));
    }

    function emailValidation(input) {
       return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(input.value);
    }

    /**
     * Проверяет по нескольким форматам: "+9 999 999 99 99", "+9 (999) 999-99-99", "+9 (999) 999 99 99", "+9 999 999-99-99".
     * */
    function phoneValidation(input) {
        return /^\+\d{1}\s(?:\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(input.value);
    }

    function innValidation(input) {
        return /^\d{14}$/.test(input.value);
    }

    /**
     * Убирает пробелы, тире, скобки
     * */
    function clearPhoneNumber(str) {
        return str.replace(/[\s\(\)\-]/g, '');
    }
});


