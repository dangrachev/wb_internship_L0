import NODES from './variables.js';
import {productsMockData} from './mock-data.js';
import {generateProductCard, fillDeliveryList, generateDeliveringItems, } from './templates-generators.js';
import {getFormattedPrice, normalizePrice, countItemPrice, calculateDiscount, printProductsCountBadge, getItemsQuantity} from './helpers.js';


document.addEventListener('DOMContentLoaded', () => {
    fillGoodsList(productsMockData);
    fillDeliveryList(getDeliveringItemsData());

    //fillAbsentProductsList(productsMockData);

    // Изменение размера шрифта цен взависимости от их длинны
    [...document.querySelectorAll('.price')].forEach(price => {
        if (price.textContent.length > 6) {
            price.style.fontSize = '16px';
        }
    });

});
function fillGoodsList(items) {
    NODES.productsList.innerHTML = '';
    items.forEach((productData) => {
        NODES.productsList.insertAdjacentHTML('beforeend', generateProductCard(productData));
    });
    calculateAllCosts();

    // Счетчик для каждой карточки товара + подсчет стоимости
    document.querySelectorAll('.counter__btn').forEach((btn, i)=> {
        // Логика счетчика
        btn.addEventListener('click', (e) => {
            const btnType = btn.dataset.btn_type;
            const counterInput = btn.parentElement.querySelector('.counter__value');
            const counterQuantity = counterInput.value;

            btnType === 'plus'
                ? increaseCounter(counterInput, counterQuantity)
                : decreaseCounter(counterInput, counterQuantity);
        });

        // Подсчет стоимости
        btn.addEventListener('click', (e) => {
            // Элемент с ценой товара
            const curPriceElem = btn.closest('.item-actions').nextElementSibling.querySelector('.price');
            const prevPriceElem = btn.closest('.item-actions').nextElementSibling.querySelector('.item-price__prev').children[0];
            const priceElemMobile = btn.closest('.item-content-wrapper').previousElementSibling.querySelector('.item-price_mobile');


            // Значение счетчика
            let counterQuantity = btn.parentElement.querySelector('.counter__value').value;
            // Цена за единицу конкретного товара
            const itemCurPrice = btn.closest('.counter').dataset.cur_price;
            const itemPrevPrice = btn.closest('.counter').dataset.prev_price;

            if (counterQuantity >= 1) {
                // Сумма конкретного товара
                let price = Math.floor(+counterQuantity * +itemCurPrice);
                console.log(price);
                curPriceElem.innerText = `${getFormattedPrice(price)}`;
                priceElemMobile.children[0].children[0].innerText = `${getFormattedPrice(price)}`;

                if (curPriceElem.innerText.length > 6) {
                    // Размер шрифта цены в зависимости от длины
                    curPriceElem.style.fontSize = '16px';
                }

                // Сумма конкретного товара без скидки
                let prevPrice = Math.floor(+counterQuantity * +itemPrevPrice);
                prevPriceElem.innerText = `${getFormattedPrice(prevPrice)}`;
                priceElemMobile.children[1].children[0].innerText = `${getFormattedPrice(prevPrice)}`;


                // Бейдж с колличеством товаров
                /*delivery.querySelectorAll('.delivery__chosen-item').forEach(item => {
                    item.children[0].innerText = printProductsCountBadge(getTotalQuantity());
                });*/

                calculateAllCosts();

                fillDeliveryList(getDeliveringItemsData());
            }
        });
    });

    NODES.navigation_carts.forEach(item => {
        item.children[0].innerText = printProductsCountBadge(getItemsQuantity(), item);
    })
    

    const checkboxes = document.querySelectorAll('.checkbox-input');
    // Choose all items
    document.querySelector('input[id=checkbox-all]').addEventListener('change', (e) => {
        if (e.target.checked) {
            checkboxes.forEach(checkbox => {
                if (checkbox.id !== 'checkbox_direct-debit-confirm') checkbox.checked = true;
            });
        } else {
            checkboxes.forEach(checkbox => {
                if (checkbox.id !== 'checkbox_direct-debit-confirm') checkbox.checked = false;
            });
        }
    });

    // Event listeners for checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            fillDeliveryList(getDeliveringItemsData());

            // Бейдж с колличеством товаров
            /*delivery.querySelectorAll('.delivery__chosen-item').forEach(item => {
                item.children[0].innerText = printProductsCountBadge(getTotalQuantity());
            });*/

            calculateAllCosts();


            if (checkbox.id !== NODES.input_debitConfirm.id && NODES.input_debitConfirm.checked) {
                const items = getChosenItems();

                // Общая сумма текстом в кнопке Заказать
                NODES.btn_order.innerText = `Оплатить ${items.length > 0 ? getFormattedPrice(getTotalPrice(items)) + ' сом' : ''}`;
            }
        });
    });

    // Deleting buttons
    document.querySelectorAll('.actions__delete').forEach(btn => btn.addEventListener('click', (e) => {
        const itemForDelete = e.target.closest('.items-list__item');
        console.log(itemForDelete);

        if (itemForDelete && itemForDelete.classList.contains('absent-item')) {
            console.log('absent-item');
            return;
        } else if (e.target.closest('.form_radio-item')) {
            const targetRadio = e.target.closest('.form_radio-item');
            console.log('radio-item', targetRadio);
            return;
        } else {
            productsMockData = productsMockData.filter(item => item.id !== itemForDelete.dataset.id);
        }
        fillGoodsList(productsMockData);

        calculateAllCosts();
        fillDeliveryList(getDeliveringItemsData());
    }));
}


function increaseCounter(elem, val) {
    elem.value = +val + 1;

    if (elem.value > 1) {
        // красим минус
        elem.parentElement.children[0].style.color = '#000';
    }
}
function decreaseCounter(elem, val) {
    if (elem.value > 1) {
        elem.value = +val - 1;
    }

    if (elem.value < 2) {
        // красим минус
        elem.parentElement.children[0].style.color = '#cdcdcd';
        elem.parentElement.children[0].disabled = true;
    }
}



/**
 * Возвращает итоговую стоимость.
 * @param itemsID массив id отмеченных товаров.
 * */
export function getTotalPrice(itemsID = null) {
    let totalPrice = 0;

    if (!itemsID) {
        // Все карточки товаров
        const items = NODES.productsList.querySelectorAll('.items-list__item');
        items.forEach(item => {
            const price = item.querySelector('.price');

            totalPrice += +normalizePrice(price.innerText);
        });
    } else {
        const itemsCards = document.querySelectorAll(`[data-id]`);
        // Только карточки с отмеченным чекбоксом
        itemsID.forEach(item => {
            itemsCards.forEach(card => {
                if (card.dataset.id === item.cardID) {
                    totalPrice += +item.curPrice;
                }
            });
        });
    }

    return Math.floor(totalPrice);
}

/**
 * Возвращает итоговую стоимость БЕЗ скидки.
 * @param itemsID массив id отмеченных товаров. Если передается, то стоимость вычисляется исходя из него.
 * */
export function getTotalPrevPrice(itemsID = null) {
    let totalPrevPrice = 0;

    if (!itemsID) {
        // Выбирает все карточки товаров
        document.querySelectorAll('.item-price__prev').forEach(node => {
            totalPrevPrice += +normalizePrice(node.children[0].innerText);
        });
    } else {
        const itemsCards = document.querySelectorAll(`[data-id]`);
        // Только карточки с отмеченным чекбоксом
        itemsID.forEach(item => {
            itemsCards.forEach(card => {
                if (card.dataset.id === item.cardID) {
                    totalPrevPrice += +item.prevPrice;
                }
            });
        });
    }

    return Math.floor(totalPrevPrice);
}



/**
 * Возвращает колличество всех товаров.
 * */
export function getTotalQuantity() {
    let totalQuantity = 0;

    const allCounters = document.querySelectorAll('.counter__value');
    allCounters.forEach((input) => {
        totalQuantity += +input.value
    });

    return totalQuantity;
}

/**
 * Возвращает массив id карточек, у которых отмечен checkbox.
 * */
export function getChosenItems() {
    const items = [];

    document.querySelectorAll('.checkbox-input').forEach(checkbox => {
        // Проверка отметки и отсев всех чекбоксов, не относящихся к карточкам товаров
        if (checkbox.checked && (checkbox.id !== 'checkbox-all' && checkbox.id !== 'checkbox_direct-debit-confirm')) {
            const input = checkbox.closest('.items-list__item').querySelector('.counter__value');
            const curPrice = input.closest('.counter').dataset.cur_price;
            const prevPrice = input.closest('.counter').dataset.prev_price;
            console.log(curPrice);

            items.push({
                cardID: checkbox.id,
                quantity: input.value,
                curPrice: Math.floor(+input.value * +curPrice),
                prevPrice: Math.floor(+input.value * +prevPrice)
            });
        }
    });

    //console.log(items);
    return items;
}

/**
 * Производит расчет общей суммы и скидки, и вносит данные в дом-элементы.
 * */
function calculateAllCosts() {
    // Общая сумма всех товаров
    let curTotalSum = getTotalPrice(getChosenItems());
    NODES.totalInfo_title.children[1].innerText = curTotalSum <= 0 ? '' : `${getFormattedPrice(curTotalSum)} сом`;

    // Общая сумма всех товаров без скидки
    let prevTotalSum = getTotalPrevPrice(getChosenItems());
    NODES.totalInfo_no_discount.children[1].innerText = prevTotalSum <= 0 ? '' : `${getFormattedPrice(prevTotalSum)} сом`;

    // Общая скидка
    NODES.totalInfo_discount.children[1].innerText = (curTotalSum === 0 && prevTotalSum === 0) ? '' : `- ${getFormattedPrice(calculateDiscount(curTotalSum, prevTotalSum))} сом`;

    // Если чекбокс `списать оплату сразу` активирован
    if (NODES.input_debitConfirm.checked) {
        const items = getChosenItems();

        // Общая сумма текстом в кнопке Заказать
        NODES.btn_order.innerText = `Оплатить ${items.length > 0 ? getFormattedPrice(getTotalPrice(items)) + ' сом' : ''}`;
    }
}

/**
 * Возвращает объект с информацией для блока доставки.
 * */
function getDeliveringItemsData() {
    // Массив id отмеченных товаров и количество каждой позиции
    const items = getChosenItems();

    // Объект с фото выбранных товаров
    const deliveryData = [];

    if (items.length > 0) {
        // Объект с товарами на конкретную дату
        const data = {
            date: '',
            items: []
        };
        const leftQuantity = []; // здесь храним остатки товаров, у которых заданное кол-во больше порога

        // Достаем объект товара по id и добавляем src фото в массив
        for (let i = 0; i < items.length; i++) {
            const {img_src} = productsMockData.find(product => product.id === items[i].cardID);

            let item;
            // Проверяем количество конкретного товара по ограничению
            const quantityLimit = 184
            if (items[i].quantity <= quantityLimit) {
                item = {
                    src: img_src,
                    quantity: items[i].quantity
                }
            } else {
                item = {
                    src: img_src,
                    quantity: quantityLimit
                }
                // Вычисляем остаток и пушим в массив с остатками
                leftQuantity.push({src: img_src, quantity: Math.abs(quantityLimit - items[i].quantity)});
            }

            console.log(item);
            data.items.push(item);
        }

        // Задаем дату доставки и пушим объект с датой и товарами в итоговый массив deliveryData
        data.date = '5—6 февраля';
        deliveryData.push(data);

        // Если массив с остатками не пуст, формируем новый объект с товарами на следующую дату
        if (leftQuantity.length > 0) {
            const newData = {
                date: '',
                items: []
            };
            leftQuantity.forEach(item => {
                newData.items.push(item);
            });

            // Достаем предыдущий объект с датой и товарами и берем у него дату
            let prevDeliveryDate = deliveryData[deliveryData.length - 1].date;
            prevDeliveryDate = prevDeliveryDate.match(/\d+/g); // Достаем из строки числа
            //console.log(prevDeliveryDate[0], prevDeliveryDate[1]);

            // Формируем дату для нового объекта с датой товарами на основе предыдущего (прибавляем 1 к числам)
            newData.date = `${parseInt(prevDeliveryDate[0]) + 1}—${parseInt(prevDeliveryDate[1]) + 1} февраля`;

            deliveryData.push(newData);
        }
    }

    return deliveryData;
}


