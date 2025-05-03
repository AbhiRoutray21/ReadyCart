export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,quantity){
    let matchingId;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingId = cartItem;
        }
    });
    if(matchingId){
      matchingId.quantity += quantity;
    }else{
      cart.push({
          productId: productId,
          quantity: quantity,
          deliveryOptionId: '1'
      });  
    }
    saveToStorage();
}

export function removeFromCart(productId){
   const newCart = [];
   cart.forEach((cartItem)=>{
    if(productId !== cartItem.productId){
        newCart.push(cartItem)
    }
   });
  cart = newCart; 
  saveToStorage(); 
  document.querySelector('.return-to-home-link').innerHTML = `${showCartQuantity()} items`;
}

export function showCartQuantity(){
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
   totalQuantity += cartItem.quantity ;
  });
  return totalQuantity;
}

export function UpdateQuantity(productId,quantity){
  cart.forEach((cartItem)=>{
    let matchingId;
    if(productId === cartItem.productId){
       matchingId = cartItem;
    }
    if(matchingId){
      matchingId.quantity = quantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingId;
  cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingId = cartItem;
      }
  });
  matchingId.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}