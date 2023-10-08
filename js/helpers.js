function getRandomID() {
    return Math.random().toString(6).substring(2, 6) + Math.random().toString(6).substring(2, 6);
}

function getFormattedPrice(str) {
    return String(str).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
/**
 * Убирает пробелы у строки с суммой
 * */
function normalizePrice(str) {
    return String(str).replaceAll(' ', '');
}
