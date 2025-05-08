import {cart} from "../../data/cart-class.js";
import {products} from "../../data/products.js";
import {formatCurrancy} from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from "../../data/deliveryOptions.js";
import {renderPaymentSummary} from "./paymentSummary.js"


export function renderOrderSummary(){
const today = dayjs();

let cartSummary = '';
let matchingProduct;
cart.cartItem.forEach((cartItem)=>{
  const productId = cartItem.productId;
   products.forEach((product)=>{
       if(productId === product.id){
          matchingProduct = product;
       }  
   });
    
   let deliverydisplay;
   deliveryOptions.forEach((option)=>{
      if(cartItem.deliveryOptionId === option.id){
        deliverydisplay = option;
      }
   });

   cartSummary += 
        `
        <div class="cart-item-container cart-item-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${today.add(deliverydisplay.deliveryDays,'days').format('dddd, MMMM D')}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${formatCurrancy(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class=" quantity-label-id-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary update-product-id-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                     Update
                    </span>
                    <span class="input-save-field input-save-id-${matchingProduct.id}">
                    <input class="quantity-input input-id-${matchingProduct.id}" style="width:30px;">
                    <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                     Save
                    </span>
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                     Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionHTML(cartItem)}
                </div>
            </div>
        </div>
        `;
});

document.querySelector('.order-summary').innerHTML = cartSummary;
document.querySelector('.return-to-home-link').innerHTML = `${cart.showCartQuantity()} items`;

function deliveryOptionHTML(cartItem){
let deliveryOptionSum ='';
deliveryOptions.forEach((deliveryOption)=>{
     const today = dayjs();
     const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
     const datestring = deliveryDate.format('dddd, MMMM D');
     
     const priceCents = (deliveryOption.priceCents === 0)? 'FREE' : formatCurrancy(deliveryOption.priceCents);
   
     const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        deliveryOptionSum += 
        `  <div class=" delivery-option">
                <input type="radio"
                data-product-id="${matchingProduct.id}"
                data-deliveryoption-id="${deliveryOption.id}"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                 ${(isChecked) ? 'checked' : ''} >
                <div>
                  <div class="delivery-option-date">
                   ${datestring}
                  </div>
                  <div class="delivery-option-price">
                    $${priceCents} - Shipping
                  </div>
                </div>
            </div>
        `
    });
    return deliveryOptionSum;
};


document.querySelectorAll('.delete-quantity-link')
.forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
        const productId = deleteLink.dataset.productId;
        cart.removeFromCart(productId);
        document.querySelector(`.cart-item-${productId}`).remove();
        renderPaymentSummary();
    });
});

document.querySelectorAll('.update-quantity-link')
.forEach((updateLink)=>{
    updateLink.addEventListener('click',()=>{
        const productId = updateLink.dataset.productId;
        document.querySelector(`.quantity-label-id-${productId}`).style.display='none';
        document.querySelector(`.update-product-id-${productId}`).style.display='none';
        document.querySelector(`.input-save-id-${productId}`).style.display='initial';
    });
});

document.querySelectorAll('.save-quantity-link')
.forEach((saveLink)=>{
    saveLink.addEventListener('click',()=>{
        const productId = saveLink.dataset.productId;
        const quantity = Number(document.querySelector(`.input-id-${productId}`).value);
        if(quantity > 0 && quantity <= 10){
          cart.UpdateQuantity(productId,quantity);
        }
         renderOrderSummary();
         renderPaymentSummary();
         document.querySelector(`.quantity-label-id-${productId}`).style.display='initial';
         document.querySelector(`.update-product-id-${productId}`).style.display='initial';
         document.querySelector(`.input-save-id-${productId}`).style.display='none';
    });
});

document.querySelectorAll('.delivery-option-input')
.forEach((inputRadio)=>{
   inputRadio.addEventListener('click',()=>{
    const {productId,deliveryoptionId} = inputRadio.dataset;
    cart.updateDeliveryOption(productId,deliveryoptionId);
     renderOrderSummary();
     renderPaymentSummary();
   });
});


}
