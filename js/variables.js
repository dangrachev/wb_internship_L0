const productsList = document.querySelector('#goods-list');
const absentProductsList = document.querySelector('#out-of-stuff-list');

const checkbox_wrapper = document.querySelector('.checkbox-wrapper');
const checkboxes = document.querySelectorAll('.checkbox-input');
const quantity_info = document.querySelector('.cart__quantity-info');

// Navigation
const navigation_carts = document.querySelectorAll('.navigation__cart');
const navigation_items = document.querySelectorAll('.navigation__item');

// badge
const cartQuantity = document.querySelector('.cart__quantity-badge');

// Out of stuff list
const outOfStuff = document.querySelector('.out-of-stuff-list');

// Delivery
const delivery = document.querySelector('.delivery');
const delivery_chosenItems = delivery.querySelectorAll('.delivery__chosen-item');
// delivery date template
const deliveringItems = document.querySelector('.delivery__items');

// Payment method
const paymentMethod = document.querySelector('.payment-method');

// Total info nodes
const totalInfo_block = document.querySelector('.total-info');
const totalInfo_title = totalInfo_block.querySelector('.total-info__title');
const totalInfo_no_discount = totalInfo_block.querySelector('.total-info__no-discount');
const totalInfo_discount = totalInfo_block.querySelector('.total-info__discount');
const totalInfo_delivery = totalInfo_block.querySelector('.total-info__delivery');
const totalInfo_address = totalInfo_block.querySelector('.total-info__address');
const totalInfo_payment = totalInfo_block.querySelector('.total-info__payment');
const input_debitConfirm = document.getElementById('checkbox_direct-debit-confirm');

// Recipient form block
const recipientForm = document.querySelector('.recipient');
const recipient_form = document.getElementById('recipient-form');
const form_inputs = document.querySelectorAll('.form__input');
const input_firstName = document.getElementById('firstname');
const input_lastName = document.getElementById('lastname');
const input_email = document.getElementById('email');
const input_phone = document.getElementById('phone');
const input_inn = document.getElementById('inn');

// Modal
const modal = document.querySelector('.cart__modal-wrapper');
const modal_payment = document.querySelector('.modal__payment');
const modal_delivery = document.querySelector('.modal__delivery');
const modal_content = document.querySelector('.modal__content');
const delivery_addresses = document.querySelector('.delivery-addresses');
const modal_deliveryMethod = document.querySelectorAll('.delivery-method');
const modal_confirmBtn = document.querySelectorAll('.modal__btn');
const modal_closeBtn = document.querySelectorAll('.modal__close');


// Форма выбора карты
const radioItems_form = document.getElementById('form_radio-items');

// Buttons
const btns_delete = document.querySelectorAll('.actions__delete');
const btns_favorite = document.querySelectorAll('.actions__isFavorite');
const btn_order = totalInfo_block.querySelector('.total-info__order-btn');
