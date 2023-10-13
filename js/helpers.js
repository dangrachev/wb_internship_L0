import NODES from "./variables.js";

export function getRandomID() {
    return Math.random().toString(6).substring(2, 6) + Math.random().toString(6).substring(2, 6);
}

export function getFormattedPrice(str) {
    return String(str).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Убирает пробелы у строки с суммой
 * */
export function normalizePrice(str) {
    return String(str).replaceAll(' ', '');
}

/**
 * Возвращает цену конкретного товара на основе колличества.
 * */
export function countItemPrice(price, quantity) {
    return Math.floor(+quantity * +price);
}

/**
 * Возвращает скидку (не в процентах).
 * */
export function calculateDiscount(curPrice, prevPrice) {
    return prevPrice - curPrice;
}

/**
 * Отображает бейдж с количеством товаров
 * */
export function printProductsCountBadge(num, node) {
    if (node.classList.contains('navigation__cart')) {
        if (num > 0) {
            node.children[0].classList.remove('hidden');
            return num;
        } else {
            node.children[0].classList.add('hidden');
        }
    } else {
        if (num > 1) {
            node.children[0].classList.remove('hidden');
            return num;
        } else {
            node.children[0].classList.add('hidden');
        }
    }
}

/**
 * Отображает количество товаров
 * */
export function printItemsCount(num) {
    if (num > 0) {
        NODES.cartQuantity.classList.remove('hidden');
        return num;
    } else {
        NODES.cartQuantity.classList.add('hidden');
    }
}

/**
 * Возвращает количество карточек товаров
 * */
export function getItemsQuantity() {
    return document.querySelectorAll('[data-id]').length;
}