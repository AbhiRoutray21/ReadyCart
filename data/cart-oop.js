function Cart(localStorageKey){
const cart = {
    cartItem: undefined,

    lodeFromStorage(){
        this.cartItem = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      },

    saveToStorage(){
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem));
    },
    addToCart(productId,quantity){
        let matchingId;
        this.cartItem.forEach((cartItem)=>{
            if(productId === cartItem.productId){
              matchingId = cartItem;
            }
        });
        if(matchingId){
          matchingId.quantity += quantity;
        }else{
        this.cartItem.push({
              productId: productId,
              quantity: quantity,
              deliveryOptionId: '1'
          });  
        }
        this.saveToStorage();
    },
    removeFromCart(productId){
        const newCart = [];
        this.cartItem.forEach((cartItem)=>{
         if(productId !== cartItem.productId){
             newCart.push(cartItem)
         }
        });
       this.cartItem = newCart; 
       this.cartItem.saveToStorage(); 
       document.querySelector('.return-to-home-link').innerHTML = `${this.showCartQuantity()} items`;
     },
     showCartQuantity(){
        let totalQuantity = 0;
        this.cartItem.forEach((cartItem) => {
         totalQuantity += cartItem.quantity ;
        });
        return totalQuantity;
      },
      UpdateQuantity(productId,quantity){
        this.cartItem.forEach((cartItem)=>{
          let matchingId;
          if(productId === cartItem.productId){
             matchingId = cartItem;
          }
          if(matchingId){
            matchingId.quantity = quantity;
          }
        });
        this.saveToStorage();
      },
      updateDeliveryOption(productId,deliveryOptionId){
        let matchingId;
        this.cartItem.forEach((cartItem)=>{
            if(productId === cartItem.productId){
              matchingId = cartItem;
            }
        });
        matchingId.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      }

};
  return cart;
}

// let cart = Cart('cart-oop');
// cart.lodeFromStorage();
// cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);

// let businessCart = Cart('businessCart');
// businessCart.lodeFromStorage();
// businessCart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',5);
// console.log(cart);
// console.log(businessCart);

// let cart1 = Cart('cart1');
// cart1.lodeFromStorage()
// cart1.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',5);
// console.log(cart1);











