import NODES from "./variables.js";
import {countItemPrice, getFormattedPrice} from "./helpers.js";

/**
 *  Взвращает шаблон карточки товара.
 * */
export function generateProductCard(cardInfo, currency = 'сом') {
    return `<div class="items-list__item" data-id="${cardInfo.id}">
                <div class="item-content-wrapper">
                    <div class="item-info">
                        <div class="display-flex align-items-center">
                            <div class="checkbox-wrapper checkbox-mobile">
                                <input class="checkbox-input" id=${cardInfo.id} type="checkbox" checked>
                                <label class="checkbox__label" for=${cardInfo.id}></label>
                            </div>
                            
                            <img class="item-info__img" src=${cardInfo.img_src} alt="Item image">
                        </div>
        
                        <div class="item-info__desc">
                            <div class="item-price item-price_mobile">
                                <div class="item-price__current">
                                    <span class="price">${getFormattedPrice(countItemPrice(cardInfo.price.current, cardInfo.quantity))}</span>
                                    <span class="currency">${currency}</span>
                                </div>
                
                                <div class="item-price__prev">
                                    <span>${getFormattedPrice(countItemPrice(cardInfo.price.previous, cardInfo.quantity))}</span>
                                    <span>${currency}</span>
                                </div>
                            </div>
                            
                            <h3 class="item-info__title">${cardInfo.title}</h3>
                            
                            ${cardInfo.features && Object.keys(cardInfo.features).length > 0 ? `<div class="item-info__features">
                                    ${cardInfo.features.color ? `<div class="features__color">Цвет: <span>${cardInfo.features.color}</span></div>` : ''}
                                    ${cardInfo.features.size ? `<div class="features__size">Размер: <span>${cardInfo.features.size}</span></div>` : ''}
                                    </div>` : ''}
        
                            <div class="item-info__extra">
                                <span>${cardInfo.extra.location}</span>
                                <span class="item-info__tooltip">${cardInfo.extra.business_entity} <img src="assets/icons/info_icon.svg" alt="info"></span>
                                
                                <div class="item-info__tooltip-info">
                                    <h4>OOO «МЕГАПРОФСТИЛЬ»</h4>
                                    <p>ОГРН: 5167746237148</p>
                                    <p>129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="item-content-wrapper">
                    <div class="item-actions">
                        <div class="counter" data-cur_price=${cardInfo.price.current} data-prev_price=${cardInfo.price.previous} data-counter_id=${cardInfo.id}>
                            <button class="counter__btn minus" data-btn_type="minus">−</button>
                            <input class="counter__value" value=${cardInfo.quantity} readonly>
                            <button class="counter__btn plus" data-btn_type="plus">+</button>
                        </div>
        
                        ${cardInfo.leftQuantity < 10 ? `<div class="items-left">Осталось <span>${cardInfo.leftQuantity - cardInfo.quantity}</span> шт.</div>` : ''}
        
                        <div class="actions">
                            <div class="actions__isFavorite">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="#000">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 2.05857C2.26592 2.75224 1.76687 3.83284 1.99496 5.42928C2.22335 7.02783 3.26497 8.68522 4.80439 10.3478C6.25868 11.9184 8.10965 13.4437 9.99999 14.874C11.8903 13.4437 13.7413 11.9184 15.1956 10.3478C16.7351 8.68521 17.7767 7.02783 18.005 5.4293C18.2331 3.83285 17.734 2.75224 16.9659 2.05856C16.1767 1.34572 15.055 1 14 1C12.132 1 11.0924 2.08479 10.5177 2.68443C10.4581 2.7466 10.4035 2.80356 10.3535 2.85355C10.1583 3.04882 9.84169 3.04882 9.64643 2.85355C9.59644 2.80356 9.54185 2.7466 9.48227 2.68443C8.9076 2.08479 7.868 1 5.99999 1C4.94498 1 3.82328 1.34573 3.03399 2.05857ZM2.36374 1.31643C3.37372 0.404274 4.75205 0 5.99999 0C8.07126 0 9.34542 1.11257 9.99999 1.77862C10.6545 1.11257 11.9287 0 14 0C15.2479 0 16.6262 0.404275 17.6362 1.31644C18.6674 2.24776 19.2669 3.66715 18.995 5.5707C18.7233 7.47217 17.515 9.31479 15.9294 11.0272C14.3355 12.7486 12.3064 14.3952 10.3 15.9C10.1222 16.0333 9.87776 16.0333 9.69999 15.9C7.69356 14.3952 5.66446 12.7485 4.07063 11.0272C2.48506 9.31478 1.27668 7.47217 1.00501 5.57072C0.733043 3.66716 1.33253 2.24776 2.36374 1.31643Z" fill="black"/>
                                </svg>
                            </div>
                            <div class="actions__delete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#000">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                    </div>
        
                    <div class="item-price">
                        <div class="item-price__current">
                            <span class="price">${getFormattedPrice(countItemPrice(cardInfo.price.current, cardInfo.quantity))}</span>
                            <span class="currency">${currency}</span>
                        </div>
        
                        <div class="item-price__prev">
                            <span>${getFormattedPrice(countItemPrice(cardInfo.price.previous, cardInfo.quantity))}</span>
                            <span>${currency}</span>
                        </div>
                        
                        <div class="item-price__extra-info">
                            <div class="display-flex justify-space-between">
                                <span>Скидка 55%</span>
                                <span>−300 сом</span>
                            </div>
                            <div class="display-flex justify-space-between">
                                <span>Скидка покупателя 10%</span>
                                <span>−30 сом</span>
                            </div>  
                        </div>
                    </div>
                </div>
         </div>`;
}

/**
 * Возвращает шаблон отмеченного товара для блока доставки.
 * */
export function generateDeliveringItems(data) {
    return `<div class="delivery__date-item">
                <div class="delivery__date"><strong>${data.date}</strong></div>

                <div class="delivery__chosen-items">
                    ${data.items.map(item => `<div class="delivery__chosen-item">
                        <div class="cart__quantity-badge" ${item.quantity < 2 && `style="display: none"`}>${item.quantity}</div>
                        <img src=${item.src} alt="">
                    </div>`).join(' ')}
                </div>
            </div>`;
}

export function fillDeliveryList(deliveryData) {
    NODES.deliveringItems.innerHTML = '';

    deliveryData.forEach(data => {
        NODES.deliveringItems.insertAdjacentHTML('beforeend', generateDeliveringItems(data));
    });
}



/**
 * Возвращает шаблон карты для модального окна Способ оплаты.
 * */
export function generatePaymentModalContent(cardData, i) {
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
export function generateAddressModalContent(address, i) {
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



/*function fillAbsentProductsList(items) {
    absentProductsList.innerHTML = '';
    items.forEach(productData => {
        absentProductsList.insertAdjacentHTML('beforeend', generateAbsentProducts(productData));
    });

}*/

/*
/!**
 *  Взвращает шаблон карточки отсутствующего продукта.
 * *!/
function generateAbsentProducts(cardInfo) {
    return `<div class="absent-item items-list__item">
                <div class="item-info">
                    <img class="item-info__img" src=${cardInfo.img_src} alt="Item image">

                    <div class="item-info__desc">
                        <h3 class="item-info__title">${cardInfo.title}</h3>

                        ${cardInfo.features && Object.keys(cardInfo.features).length > 0 ? `<div class="item-info__features">
                                    ${cardInfo.features.color ? `<div class="features__color">Цвет: <span>${cardInfo.features.color}</span></div>` : ''}
                                    ${cardInfo.features.size ? `<div class="features__size">Размер: <span>${cardInfo.features.size}</span></div>` : ''}
                                    </div>` : ''}
                    </div>
                </div>

                <div class="item-actions">
                    <div class="actions">
                        <div class="actions__isFavorite">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="#000">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 2.05857C2.26592 2.75224 1.76687 3.83284 1.99496 5.42928C2.22335 7.02783 3.26497 8.68522 4.80439 10.3478C6.25868 11.9184 8.10965 13.4437 9.99999 14.874C11.8903 13.4437 13.7413 11.9184 15.1956 10.3478C16.7351 8.68521 17.7767 7.02783 18.005 5.4293C18.2331 3.83285 17.734 2.75224 16.9659 2.05856C16.1767 1.34572 15.055 1 14 1C12.132 1 11.0924 2.08479 10.5177 2.68443C10.4581 2.7466 10.4035 2.80356 10.3535 2.85355C10.1583 3.04882 9.84169 3.04882 9.64643 2.85355C9.59644 2.80356 9.54185 2.7466 9.48227 2.68443C8.9076 2.08479 7.868 1 5.99999 1C4.94498 1 3.82328 1.34573 3.03399 2.05857ZM2.36374 1.31643C3.37372 0.404274 4.75205 0 5.99999 0C8.07126 0 9.34542 1.11257 9.99999 1.77862C10.6545 1.11257 11.9287 0 14 0C15.2479 0 16.6262 0.404275 17.6362 1.31644C18.6674 2.24776 19.2669 3.66715 18.995 5.5707C18.7233 7.47217 17.515 9.31479 15.9294 11.0272C14.3355 12.7486 12.3064 14.3952 10.3 15.9C10.1222 16.0333 9.87776 16.0333 9.69999 15.9C7.69356 14.3952 5.66446 12.7485 4.07063 11.0272C2.48506 9.31478 1.27668 7.47217 1.00501 5.57072C0.733043 3.66716 1.33253 2.24776 2.36374 1.31643Z" fill="black"/>
                            </svg>
                        </div>

                        <div class="actions__delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#000">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>`;
}
*/