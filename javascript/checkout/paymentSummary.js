import {cart} from "../../data/cart-class.js";
import {products} from "../../data/products.js";
import {formatCurrancy} from "../utils/money.js";
import {deliveryOptions} from "../../data/deliveryOptions.js";


export function renderPaymentSummary(){
let Quantities=[];
let shippingPrice = [];
let totalQuantity = 0;
let totalShipping = 0;
let totalItems = 0;
  cart.cartItem.forEach((cartItem,index) => {
      products.forEach((product)=>{
        if(cartItem.productId === product.id){
         // Quantities[index] = cartItem.quantity * product.priceCents ; We can also do this..
            Quantities.push(cartItem.quantity * product.priceCents);  
        }
      })
       deliveryOptions.forEach((option)=>{
        if(cartItem.deliveryOptionId === option.id){
          shippingPrice.push(option.priceCents);
        }
      });
      totalItems += cartItem.quantity; 
  }); 
  Quantities.forEach((total)=>{
    totalQuantity += total;
  })
  shippingPrice.forEach((total)=>{
    totalShipping += total;
  })

let tax = (totalQuantity+totalShipping)*0.1;

   const paymentSummary = 
       `  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrancy(totalQuantity)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrancy(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrancy(totalQuantity+totalShipping)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrancy(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrancy(totalQuantity+totalShipping+tax)}</div>
          </div>
          <button class="place-order-button button-primary">
            Place your order
          </button>
       ` 
     document.querySelector('.payment-summary').innerHTML = paymentSummary;  
}