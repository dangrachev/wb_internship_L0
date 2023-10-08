
const fakeCardsData = [
    {card_name: 'mir', card_number: '1234 56•• •••• 1234', isSelected: true},
    {card_name: 'visa', card_number: '1234 56•• •••• 1234', isSelected: false},
    {card_name: 'mastercard', card_number: '1234 56•• •••• 1234', isSelected: false},
    {card_name: 'maestro', card_number: '1234 56•• •••• 1234', isSelected: false}
];
const fakeAddresses = {
    myAddresses: [
        {address: 'Бишкек, улица Табышалиева, 57', isSelected: true},
        {address: 'Бишкек, улица Жукеева-Пудовкина, 77/1', isSelected: false},
        {address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1', isSelected: false},
    ],
    pvz: [
        {address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1', rating: ' ', isSelected: true},
        {address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1', rating: '4.99', isSelected: false},
        {address: 'г. Бишкек, улица Табышалиева, д. 57', rating: '4.99', isSelected: false},
    ]
};


document.addEventListener('DOMContentLoaded', (e) => {

    // Отображаем радио инпуты с данными по адрессам (по умолчанию в пункт выдачи)
    fillRadioItems(delivery_addresses, fakeAddresses.pvz, generateAddressModalContent);
    // Отображаем радио инпуты с данными по картам
    fillRadioItems(modal_payment.querySelector('.form_radio-items'), fakeCardsData, generatePaymentModalContent);
});


function fillRadioItems(node, data, callback) {
    node.innerHTML = '';

    data.forEach((item, i) => {
        node.insertAdjacentHTML('beforeend', callback(item, i));
    });
}

/**
 * Возвращает шаблон карты для модального окна Способ оплаты.
 * */
function generatePaymentModalContent(cardData, i) {
    return `<div class="form_radio-item">
                <input class="credit-card__input" id=${cardData.card_name + "_card"} type="radio" 
                       name="radio_value" value=${cardData.card_name} 
                       ${cardData.isSelected ? `checked='checked'` : ''}>
                       
                <label class="credit-card__label" for=${cardData.card_name + "_card"}>
                    <img src=${"assets/icons/" + cardData.card_name + "_icon.svg"} alt="" class="credit-card__icon">
                    <span>${cardData.card_number}</span>
                </label>
            </div>`;
}

/**
 * Возвращает шаблон адреса для модального окна Способ доставки.
 * */
function generateAddressModalContent(address, i) {
    return `<div class="form_radio-item">
                <input class="address__input" id=${'address_' + i} type="radio" 
                       name="radio_value" value=${'"' + address.address + '"'} 
                       ${address.isSelected ? `checked='checked'` : ''}>
                       
                <label class="address__label" for=${'address_' + i}>
                    <span>${address.address}</span>
                    ${address.rating ? `<span><span><img src="assets/icons/star_icon.svg" alt=""/></span>${address.rating || ''} <span style="color: grey">Пункт выдачи</span></span>` : ''}
                </label>
                
                <div class="actions__delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#000">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                    </svg>
                </div>
            </div>`;
}



// Закрыть модальное окно
modal_closeBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        hideModal(e.target.closest('.cart__modal-wrapper'));
    });
});

// Подтверждение выбора в модальном окне
modal_confirmBtn.forEach(btn => {
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
[...document.querySelectorAll('.delivery-method__input')].forEach(method => {
    if (method.checked) {
        console.log(method);
        method.parentElement.style.border = `2px solid #CB11AB`;
    }

    method.addEventListener('change', (e) => {
        if (e.target.checked) {
            e.target.parentElement.style.border = `2px solid #CB11AB`;
        }
        modal_deliveryMethod.forEach(method => {
            if (method !== e.target.parentElement) {
                method.style.border = `2px solid rgba(203, 17, 171, 0.15)`;
            }
        });

        if (e.target.id === 'delivery-courier') {
            fillRadioItems(delivery_addresses, fakeAddresses.myAddresses, generateAddressModalContent);
        } else {
            fillRadioItems(delivery_addresses, fakeAddresses.pvz, generateAddressModalContent);
        }
    })
})

/**
 * Вставляет выбранные данные из модального окна в соответствующие узлы
 * */
function insertModalFormData(contentType, formData) {
    switch (contentType) {
        case 'payment':
            const paymentCard = paymentMethod.querySelector('.payment-method__card');
            paymentCard.children[0].src = `assets/icons/${formData.get('radio_value')}_icon.svg`;

            const totalInfo_card = totalInfo_payment.querySelector('.payment-method__card');
            totalInfo_card.children[0].src = `assets/icons/${formData.get('radio_value')}_icon.svg`;

            break;
        case 'address':
            const pvz = delivery.querySelector('.delivery__pvz');
            pvz.querySelector('.pvz__content').children[0].innerText = formData.get('radio_value');
            pvz.querySelector('.pvz__title').children[0].innerText = formData.get('delivery');

            const deliveryBy = formData.get('delivery').toLowerCase();
            totalInfo_delivery.querySelector('.form__title').children[0].innerText =
                deliveryBy === 'курьером' ? `Доставка ${deliveryBy}` : `Доставка в ${deliveryBy}`;

            const address = totalInfo_block.querySelector('.total-info__address');
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
const editPayment = totalInfo_payment.querySelector('.edit-field');
editPayment.addEventListener('click', () => {
    //fillRadioItems(modal_payment.querySelector('.form_radio-items'), fakeCardsData, generatePaymentModalContent);

    showModal(modal_payment);
});
const changePaymentMethod = paymentMethod.querySelector('.form__change-info-btn');
changePaymentMethod.addEventListener('click', () => {
    //fillRadioItems(modal_payment.querySelector('.form_radio-items'), fakeCardsData, generatePaymentModalContent);

    showModal(modal_payment);
});


// Изменить адрес доставки
const editAddress = totalInfo_delivery.querySelector('.edit-field');
editAddress.addEventListener('click', () => {
    //fillRadioItems(delivery_addresses, fakeAddresses.pvz, generateAddressModalContent);

    showModal(modal_delivery);
});
const changeAddress = delivery.querySelector('.form__change-info-btn');
changeAddress.addEventListener('click', () => {
    //fillRadioItems(delivery_addresses, fakeAddresses.pvz, generateAddressModalContent);

    showModal(modal_delivery);
});




