
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
        checkbox_wrapper.classList.toggle('hidden');
        quantity_info.classList.toggle('hidden');
        quantity_info.innerText = `${getTotalQuantity()} товаров · ${getFormattedPrice(getTotalPrice())} сом`
    });
});

// Изменение текста кнопки Заказать
input_debitConfirm.addEventListener('change', (e) => {
    if (e.target.checked) {
        const price = getFormattedPrice(getTotalPrice(getChosenItems()));
        btn_order.innerText = normalizePrice(price) > 0 ? `Оплатить ${price} сом` : 'Оплатить';
    } else {
        btn_order.innerText = 'Заказать';
    }
});

// Кнопка `заказать`
btn_order.addEventListener('click' , () => {
   const items = getChosenItems();
   if (items.length < 1) {
       alert('Выберите товар(ы) для оплаты');
   }

});



// Hover on absent product card
const absentGoods = document.querySelectorAll('.absent-item');
absentGoods.forEach(item => {
    // console.log(item)
    if (window.screen.width > 321) {
        item.addEventListener('mouseover', (e) => {
            const actionsEl = item.children.item(1);
            actionsEl.style.opacity = '1';
        });

        item.addEventListener('mouseout', (e) => {
            const actionsEl = item.children.item(1);
            actionsEl.style.opacity = '0';
        });
    }
});


// Mobile navigation items
navigation_items.forEach(item => {
    item.addEventListener('click', (e) => {
        const parentNode = e.target.closest('.navigation__item');
        const svgPath = parentNode.querySelectorAll('path');
        console.log(svgPath, parentNode);
        console.log(e.target);

        parentNode.classList.toggle('navigation__item_active');

        navigation_items.forEach(item => {
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



/**
 * Отображает бейдж с количеством товаров
 * */
function printProductsCountBadge(num, node) {
    if (num > 1) {
        node.children[0].classList.remove('hidden');
        return num;
    } else {
        node.children[0].classList.add('hidden');
    }
}

/**
 * Отображает количество товаров
 * */
function printItemsCount(num) {
    if (num > 0) {
        cartQuantity.classList.remove('hidden');
        return num;
    } else {
        cartQuantity.classList.add('hidden');
    }
}


/**
 * Возвращает количество карточек товаров
 * */
function getItemsQuantity() {
    return document.querySelectorAll('[data-id]').length;
}
