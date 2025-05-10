import {addToCart,showCartQuantity} from '../data/cart.js';
import {products,loadproductfetch} from '../data/products.js'
import {formatCurrancy} from "./utils/money.js"

renderitems();

async function renderitems(){
try{
 await loadproductfetch();

  let productsHTML = '';    
  products.forEach((product) =>{
      productsHTML += `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
            ${formatCurrancy(product.priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class="product-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div>
            ${product.extraInfoHTML()}
            </div>
            <div class="product-spacer"></div>

            <div class="added-to-cart nofiyAdded-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary"
            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`;  
  });   
  document.querySelector('.products-grid').innerHTML = productsHTML;

  let timeoutId;
  document.querySelectorAll('.add-to-cart-button')
  .forEach((button) =>{
      button.addEventListener('click',()=>{
        const productId = button.dataset.productId;
        const quantitySelector = document.querySelector(`.product-quantity-${productId}`);
        const quantity = Number(quantitySelector.value);
        
        clearTimeout(timeoutId);
        document.querySelector(`.nofiyAdded-${productId}`).style.opacity = '1';
        timeoutId = setTimeout(()=>{
          document.querySelector(`.nofiyAdded-${productId}`).style.opacity = '0';
        },800);

        addToCart(productId,quantity);
        document.querySelector('.cart-quantity').innerHTML = showCartQuantity();
      });
  });

  document.querySelector('.cart-quantity').innerHTML = showCartQuantity();
}
catch(error){
  console.log('somthing went wrong..');
}
 

}    