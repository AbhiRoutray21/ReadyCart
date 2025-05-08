class Cart {
    cartItem;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.lodeFromStorage();
    }

    lodeFromStorage(){
     this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }
    saveToStorage(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItem));
    }
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
    }
    removeFromCart(productId){
        const newCart = [];
        this.cartItem.forEach((cartItem)=>{
            if(productId !== cartItem.productId){
                newCart.push(cartItem)
            }
        });
        this.cartItem = newCart; 
        this.saveToStorage(); 
        document.querySelector('.return-to-home-link').innerHTML = `${this.showCartQuantity()} items`;
    }
    showCartQuantity(){
        let totalQuantity = 0;
        this.cartItem.forEach((cartItem) => {
            totalQuantity += cartItem.quantity ;
        });
        return totalQuantity;
    }
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
    }
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

export let cart = new Cart('cart');
 

    
 
    
    
    
    
    
    
    
    
    
    
    