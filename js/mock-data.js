import {getRandomID} from './helpers.js';


// Fake products data
const cardInfo1 = {
    id: getRandomID(),
    title: 'Футболка UZcotton мужская',
    features: {
        color: 'белый',
        size: '56'
    },
    img_src: 'assets/goods/t-shirt.png',
    price: {
        current: '522',
        previous: '1051'
    },
    quantity: 1,
    leftQuantity: 3,
    extra: {
        location: 'Коледино WB',
        business_entity: 'OOO Вайлдберриз'
    }
}
const cardInfo2 = {
    id: getRandomID() ,
    title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    features: {
        color: 'прозрачный',
        size: ''
    },
    img_src: 'assets/goods/smartphone-case.png',
    price: {
        current: '10500.235',
        previous: '11500.235'
    },
    quantity: 200,
    leftQuantity: 200,
    extra: {
        location: 'Коледино WB',
        business_entity: 'OOO Мегапрофстиль'
    }
}
const cardInfo3 = {
    id: getRandomID(),
    title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    features: {},
    img_src: 'assets/goods/pencils.png',
    price: {
        current: '247',
        previous: '475'
    },
    quantity: 2,
    leftQuantity: 4,
    extra: {
        location: 'Коледино WB',
        business_entity: 'OOO Вайлдберриз'
    }
}

export let productsMockData = [
    cardInfo1,
    cardInfo2,
    cardInfo3,
];


// Fake cards and addresses
export const fakeCardsData = [
    {card_name: 'mir', card_number: '1234 56•• •••• 1234', isSelected: true},
    {card_name: 'visa', card_number: '1234 56•• •••• 1234', isSelected: false},
    {card_name: 'mastercard', card_number: '1234 56•• •••• 1234', isSelected: false},
    {card_name: 'maestro', card_number: '1234 56•• •••• 1234', isSelected: false}
];
export const fakeAddresses = {
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