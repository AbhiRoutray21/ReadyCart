import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadproductfetch} from "../data/products.js"

async function loadChechOut(){
  await loadproductfetch();
    renderOrderSummary();
    renderPaymentSummary();
}

 loadChechOut();  

 