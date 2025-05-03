export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
 cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  },
];
}
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