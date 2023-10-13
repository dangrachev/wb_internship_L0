import NODES from './variables.js';
import {fakeAddresses, fakeCardsData} from './mock-data.js';
import {generatePaymentModalContent, generateAddressModalContent} from './templates-generators.js';


document.addEventListener('DOMContentLoaded', (e) => {

    // Отображаем радио инпуты с данными по адрессам (по умолчанию в пункт выдачи)
    fillRadioItems(NODES.delivery_addresses, fakeAddresses.pvz, generateAddressModalContent);
    // Отображаем радио инпуты с данными по картам
    fillRadioItems(NODES.modal_payment.querySelector('.form_radio-items'), fakeCardsData, generatePaymentModalContent);
});


function fillRadioItems(node, data, callback) {
    node.innerHTML = '';

    data.forEach((item, i) => {
        node.insertAdjacentHTML('beforeend', callback(item, i));
    });
}



// Закрыть модальное окно
NODES.modal_closeBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        hideModal(e.target.closest('.cart__modal-wrapper'));
    });
});

// Подтверждение выбора в модальном окне
NODES.modal_confirmBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const input = e.target.parentNode.querySelector('input[type=radio]');
        const form = input.closest('.form_radio-items');
        const formData = new FormData(form);

        console.log(formData.get('radio_value'));
        console.log(formData.get('delivery'));

        if (input.classList.contains('credit-card__input')) {
            insertModalFormData('payment', formData);
        } else {
            insertModalFormData('address', formData);
        }

        hideModal(input.closest('.cart__modal-wrapper'));
    });
});


// Переключение способа доставки
document.querySelectorAll('.delivery-method__input').forEach(method => {
    if (method.checked) {
        console.log(method);
        method.parentElement.style.border = `2px solid #CB11AB`;
    }

    method.addEventListener('change', (e) => {
        if (e.target.checked) {
            e.target.parentElement.style.border = `2px solid #CB11AB`;
        }
        NODES.modal_deliveryMethod.forEach(method => {
            if (method !== e.target.parentElement) {
                method.style.border = `2px solid rgba(203, 17, 171, 0.15)`;
            }
        });

        if (e.target.id === 'delivery-courier') {
            fillRadioItems(NODES.delivery_addresses, fakeAddresses.myAddresses, generateAddressModalContent);
        } else {
            fillRadioItems(NODES.delivery_addresses, fakeAddresses.pvz, generateAddressModalContent);
        }
    })
})

/**
 * Вставляет выбранные данные из модального окна в соответствующие узлы
 * */
function insertModalFormData(contentType, formData) {
    switch (contentType) {
        case 'payment':
            const paymentCard = NODES.paymentMethod.querySelector('.payment-method__card');
            paymentCard.children[0].src = `assets/icons/${formData.get('radio_value')}_icon.svg`;

            const totalInfo_card = NODES.totalInfo_payment.querySelector('.payment-method__card');
            totalInfo_card.children[0].src = `assets/icons/${formData.get('radio_value')}_icon.svg`;

            break;
        case 'address':
            const pvz = NODES.delivery.querySelector('.delivery__pvz');
            pvz.querySelector('.pvz__content').children[0].innerText = formData.get('radio_value');
            pvz.querySelector('.pvz__title').children[0].innerText = formData.get('delivery');

            const deliveryBy = formData.get('delivery').toLowerCase();
            NODES.totalInfo_delivery.querySelector('.form__title').children[0].innerText =
                deliveryBy === 'курьером' ? `Доставка ${deliveryBy}` : `Доставка в ${deliveryBy}`;

            const address = NODES.totalInfo_block.querySelector('.total-info__address');
            address.innerText = formData.get('radio_value');

            break;
    }
}
function showModal(modal) {
    modal.classList.remove('hidden');
}
function hideModal(modal) {
    modal.classList.add('hidden');
}


// Редактировать способ оплаты
const editPayment = NODES.totalInfo_payment.querySelector('.edit-field');
editPayment.addEventListener('click', () => {
    //fillRadioItems(modal_payment.querySelector('.form_radio-items'), fakeCardsData, generatePaymentModalContent);

    showModal(NODES.modal_payment);
});
const changePaymentMethod = NODES.paymentMethod.querySelector('.form__change-info-btn');
changePaymentMethod.addEventListener('click', () => {
    //fillRadioItems(modal_payment.querySelector('.form_radio-items'), fakeCardsData, generatePaymentModalContent);

    showModal(NODES.modal_payment);
});


// Изменить адрес доставки
const editAddress = NODES.totalInfo_delivery.querySelector('.edit-field');
editAddress.addEventListener('click', () => {
    //fillRadioItems(delivery_addresses, fakeAddresses.pvz, generateAddressModalContent);

    showModal(NODES.modal_delivery);
});
const changeAddress = NODES.delivery.querySelector('.form__change-info-btn');
changeAddress.addEventListener('click', () => {
    //fillRadioItems(delivery_addresses, fakeAddresses.pvz, generateAddressModalContent);

    showModal(NODES.modal_delivery);
});




