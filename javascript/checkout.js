import {cart,removeFromCart,showCartQuantity,UpdateQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrancy} from "../utils/money.js";

let cartSummary = '';
function checkOutHTML(formatCurranc){
let matchingProduct;
cart.forEach((cartItem)=>{
  const productId = cartItem.productId;
   products.forEach((product)=>{
       if(productId === product.id){
          matchingProduct = product;
       }  
   });
   cartSummary += 
        `
        <div class="cart-item-container cart-item-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `;
});

document.querySelector('.order-summary').innerHTML = cartSummary;
document.querySelector('.return-to-home-link').innerHTML = `${showCartQuantity()} items`;

document.querySelectorAll('.delete-quantity-link')
.forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
        const productId = deleteLink.dataset.productId;
        removeFromCart(productId);
        document.querySelector(`.cart-item-${productId}`).remove();
    });
});

document.querySelectorAll('.update-quantity-link')
.forEach((updateLink)=>{
    updateLink.addEventListener('click',()=>{
        const productId = updateLink.dataset.productId;
        document.querySelector(`.quantity-label-id-${productId}`).style.display='none';
        document.querySelector(`.update-product-id-${productId}`).style.display='none';
        document.querySelector(`.input-save-id-${productId}`).style.display='initial';
        // console.log(productId);
    });
});

document.querySelectorAll('.save-quantity-link')
.forEach((saveLink)=>{
    saveLink.addEventListener('click',()=>{
        const productId = saveLink.dataset.productId;
        const quantity = Number(document.querySelector(`.input-id-${productId}`).value);
        if(quantity > 0 && quantity <= 10){
         UpdateQuantity(productId,quantity);
        }
        cartSummary = '';
        document.querySelectorAll('.cart-item-container')
        .forEach((cartItem)=>{
            cartItem.remove();
        }); 
         checkOutHTML(formatCurrancy);
         document.querySelector(`.quantity-label-id-${productId}`).style.display='initial';
         document.querySelector(`.update-product-id-${productId}`).style.display='initial';
         document.querySelector(`.input-save-id-${productId}`).style.display='none';
    });
});
}

checkOutHTML(formatCurrancy);
