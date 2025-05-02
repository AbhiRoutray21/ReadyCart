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
          quantity: quantity
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
  CheckoutTotalItem();
}

export function CheckoutTotalItem(){
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
   totalQuantity += cartItem.quantity ;
   document.querySelector('.return-to-home-link').innerHTML = `${totalQuantity} items`;
  });
}