import { showAndCalcBasketLength } from "./navbar.js";
import { makePrice } from "./renderProduct.js";

const discountCodes = {

  relax: 10,

}

window.addEventListener("DOMContentLoaded", () => {

  const finalPriceElem = document.getElementById('final-price');
  const productsPriceElem = document.getElementById('products-price');
  const discountPriceElem = document.getElementById('discount-price');
  const discountInputElem = document.getElementById('input-discount-code');
  const confirmDiscountElem = document.getElementById('confirm-discount-code');
  const goBackButton = document.getElementById('go-back-button')

  confirmDiscountElem.addEventListener('click', () => {

    if ( discountInputElem.value == '' ) {
      return;
    }

    if (discountCodes[discountInputElem.value]) {
      calculatBasketPrice(discountCodes[discountInputElem.value]);
      alert('Your discount code confirmed.');
      discountInputElem.value = '';
    } else {
      alert('Discount is invalid.')
    }

  });

  goBackButton.addEventListener('click', () => {

    history.back();

  })

  document.addEventListener("click", (event) => {

    if (event.target.id === "increace") {
      increaceProduct(event.target.dataset.id);
    } else if (event.target.id === "decreace") {
      decreaceProduct(event.target.dataset.id);
    } else if (event.target.closest('#remove-product') || event.target.id == 'remove-product' ) {
        removeProductFromBasket(event.target.closest('#remove-product').dataset.id);
    } else if (event.target.closest('#remove-product-mobile') || event.target.id == 'remove-product-mobile' ) {
        removeProductFromBasket(event.target.closest('#remove-product-mobile').dataset.id);
    }

    


  });


  function removeProductFromBasket(id) {

    const localBasket = getBasketFromLocal();
    localBasket.basket = localBasket.basket.filter ( product => +product.id !== +id );
    localStorage.setItem('basket', JSON.stringify(localBasket));
    showAndCalcBasketLength();
    renderBasket();

  }

  const basketContainer = document.getElementById("basket-products");

  function getBasketFromLocal() {
    return JSON.parse(localStorage.getItem("basket")) ?? [];
  }

  function renderBasket() {

    calculatBasketPrice();

    const basket = getBasketFromLocal();

    basketContainer.innerHTML = "";

    if (basket.basket.length < 1) {
      basketContainer.innerHTML  = `<h4 class="body-1 text-center text-[var(--gray-10)]">
                    سبد خرید شما خالی است.
                </h4>`
                return;
    }

    basket.basket.map((product) => {
      basketContainer.innerHTML += `<li class="py-2 border-b border-b-[var(--gray-4)]">

                            <!-- top  -->

                            <div class="grid grid-cols-12 gap-6">
                                
                                        

                                <div class="flex items-center gap-4  col-span-3">

                                    <button id="remove-product" data-id="${product.id}" class="cursor-pointer sm:block hidden">
                                            <img class="min-w-5" src="images/close-square.svg" alt="">

                                        </button>
                                
                                    <img class="col-span-3 max-w-20 rounded-[var(--radius-8)]" src="${
                                      product.img
                                    }" alt="">

                                </div>

                                <div class="col-span-9 flex flex-col sm:flex-row justify-between gap-2">

                                    <!-- title  -->
                                    <div class="flex justify-between items-center">

                                        <p class="caption-3 sm:font-[400]! sm:text-[14px]! text-[var(--gray-10)]">
                                            ${product.title}
                                        </p>

                                        <button id="remove-product-mobile" data-id="${product.id}"  class="sm:hidden">
                                            <img class="" src="images/close-square.svg" alt="">
                                        </button>

                                    </div>

                                    
                                    <!-- quantity -->
                                    <div class="flex justify-between  items-center sm:order-1 sm:w-[50%] sm:justify-end">

                                        <span class="caption-3 sm:hidden text-[var(--gray-10)]">
                                            تعداد:
                                        </span>

                                        <div class="caption-1 flex justify-between items-center gap-1 text-[var(--gray-9)] border border-[var(--gray-4)] rounded-[var(--radius-8)] ">

                                            <button id="increace" class="px-2 cursor-pointer border-l border-[var(--gray-4)]" data-id="${
                                              product.id
                                            }">+</button>
                                            <span class="px-1">${
                                              product.quantity
                                            }</span>
                                            <button id="decreace" class="px-2 cursor-pointer border-r border-[var(--gray-4)]" data-id="${
                                              product.id
                                            }">-</button>

                                        </div>

                                    </div>

                               

                                    <!-- price  -->
                                     <div class="flex justify-between items-center"> 
                                        <span class="caption-3 sm:hidden text-[var(--gray-10)]">
                                            قیمت: 
                                        </span>

                                        <span class="caption-3 sm:font-[400]! sm:text-[14px]! text-[var(--gray-10)]">
                                            ${makePrice(product.price)} تومان
                                        </span>
                                     </div>


                                </div>

                            </div>

                            <!-- bottom  -->
                             <div>

                                <div class="flex justify-start mt-3 sm:justify-end items-center gap-2">
                                    <img src="images/truck-fast.svg" alt="truck">
                                    <span class="body-4"> 
                                        ارسال از 8 روز آینده
                                    </span>
                                </div>

                             </div>

                        </li>`;
    });


  }

  function calculatBasketPrice (offPercent = 0) {
    
    const localBasket = getBasketFromLocal();
    
    let finalPrice = 0;

    localBasket.basket.map( product => {

      finalPrice += product.quantity * product.price;

    } );

    
    const discount = (offPercent * finalPrice) / 100;
    
    productsPriceElem.innerHTML = makePrice(finalPrice);
    finalPrice = finalPrice - discount;
    finalPriceElem.innerHTML = makePrice(finalPrice);

    discountPriceElem.innerHTML = makePrice(discount);

  }

  function increaceProduct(id) {
    const localBasket = getBasketFromLocal();

    localBasket.basket.map((product) => {
      if (+product.id === +id) {
        product.quantity += 1;
      }
    });

    localStorage.setItem("basket", JSON.stringify(localBasket));
    renderBasket();
  }

  function decreaceProduct(id) {

    const localBasket = getBasketFromLocal();

    const mainProduct = localBasket.basket.find( product => +product.id === +id )
    
    if ( +mainProduct.quantity === 1 ) {
        localBasket.basket = localBasket.basket.filter( product => +product.id !== +id  );
        
    } else {
        mainProduct.quantity -= 1;
    }

      localStorage.setItem('basket', JSON.stringify(localBasket))
        renderBasket();
  }

  renderBasket();
});
