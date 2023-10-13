import './variables.js';
import './mock-data';
import './templates-generators';
import './helpers.js';
import './validation.js';
import './product-card.js';
import './modal-window.js';
import NODES from "./variables.js";
import {getChosenItems, getTotalPrice, getTotalQuantity} from "./product-card.js";
import {getFormattedPrice, normalizePrice} from "./helpers.js";



// Accordion
document.querySelectorAll('.accordion-trigger').forEach((el) => {
    el.addEventListener('click', () => {
        el.classList.toggle('accordion-trigger-active');
        const content = el.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.overflow = 'visible';
        } else {
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
        }

        // Меняем checkbox на инфу о количестве
        NODES.checkbox_wrapper.classList.toggle('hidden');
        NODES.quantity_info.classList.toggle('hidden');
        NODES.quantity_info.innerText = `${getTotalQuantity()} товаров · ${getFormattedPrice(getTotalPrice())} сом`
    });
});

// Изменение текста кнопки Заказать
NODES.input_debitConfirm.addEventListener('change', (e) => {
    if (e.target.checked) {
        const price = getFormattedPrice(getTotalPrice(getChosenItems()));
        NODES.btn_order.innerText = normalizePrice(price) > 0 ? `Оплатить ${price} сом` : 'Оплатить';
    } else {
        NODES.btn_order.innerText = 'Заказать';
    }
});

// Кнопка `заказать`
NODES.btn_order.addEventListener('click' , () => {
   const items = getChosenItems();
   if (items.length < 1) {
       alert('Выберите товар(ы) для оплаты');
   }

});



// Mobile navigation items
NODES.navigation_items.forEach(item => {
    item.addEventListener('click', (e) => {
        const parentNode = e.target.closest('.navigation__item');
        const svgPath = parentNode.querySelectorAll('path');
        console.log(svgPath, parentNode);
        console.log(e.target);

        parentNode.classList.toggle('navigation__item_active');

        NODES.navigation_items.forEach(item => {
            if (item !== parentNode) {
                if (item.classList.contains('navigation__item_active')) {
                    item.classList.remove('navigation__item_active');
                }

                item.querySelectorAll('path').forEach(path => {
                    path.attributes['fill'].nodeValue = '#CCCCCC';
                });
            } else {
                svgPath.forEach(path => {
                    path.attributes['fill'].nodeValue = '#CB11AB';
                });
            }
        });
    });
});


