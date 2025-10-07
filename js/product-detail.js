import { basketOBJ, products } from "./app.js";
import { showAndCalcBasketLength } from "./navbar.js";
import { makePrice } from "./renderProduct.js";

const $ = document;
const notyf = new Notyf();


// selectors
const productNameElem = $.querySelector("#product-title");
const productDescriptionElem = $.querySelector("#product-description");
const productPriceElem = $.querySelector("#product-price");
const productImageElem = $.querySelector("#product-image");
const addToCartBtn = $.querySelector("#add-to-cart-btn");

const searchURL = window.location.search;

const searchParams = new URLSearchParams(searchURL);

const mainProductID = searchParams.get("id");

const mainProduct = products.filter((p) => +p.id === +mainProductID)[0];

if (mainProduct) {
  // set DOM

  productNameElem.innerHTML = mainProduct.title;
  productDescriptionElem.innerHTML = mainProduct.caption;
  productPriceElem.innerHTML = `${makePrice(mainProduct.price)} تومان`;
  productImageElem.src = mainProduct.img;
  addToCartBtn.dataset.id = mainProduct.id;

  document.title = mainProduct.title;
} else {
  location.href = "/index.html";
}


// add to cart event 
addToCartBtn.addEventListener('click', () => {
    
    const basketFromLocal = JSON.parse(localStorage.getItem('basket')) ?? { basket: [] };

    basketOBJ.basket = basketFromLocal.basket ?? [];

    
    const productInBasketIndex = basketOBJ.basket.findIndex(p => p.id === +mainProduct.id);

    
    if ( productInBasketIndex != -1 ) {
        basketOBJ.basket[productInBasketIndex].quantity += 1;
    } else {

        mainProduct.quantity = 1;
        basketOBJ.basket.push(mainProduct);

    }


    
    
    
    
    showNotfication();
    localStorage.setItem('basket', JSON.stringify(basketOBJ));

    showAndCalcBasketLength();
})



function showNotfication () {

  

  const product = basketOBJ.basket.find(p =>  p.id == mainProduct.id)


  


  notyf.success({

    message: `تعداد ${product.quantity} از این محصول در سبد خرید شما قرار دارد.`, 
    icon: false,
    position: {
      x: 'center',
      y: 'bottom'
    }, 
    background: '#00BA88',


  });

}