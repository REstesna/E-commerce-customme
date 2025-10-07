const $ = document;

const searchBoxElem = $.querySelector('#search-box');
const searchInputElem = $.querySelector('#search-input');
const showNumberOfProductsInBasket = document.querySelector('#count_of_products_in_basket');



// active search type by click on search-box
searchBoxElem.addEventListener('click', () => {
    searchBoxElem.classList.add('active-search');
    searchInputElem.focus();
    
});

searchInputElem.addEventListener('blur', () => {
    searchBoxElem.classList.remove('active-search');
});


// calc items in basket and show it
export function showAndCalcBasketLength  ()  {

    const basketFromLocal = JSON.parse(localStorage.getItem('basket'));

    
    if ( basketFromLocal  ) {

        showNumberOfProductsInBasket.innerHTML = basketFromLocal.basket.length;
    };
    
    

}


searchInputElem.addEventListener('keypress', event => {

    if ( event.charCode === 13 && searchInputElem.value.trim() != '' ) {
        console.log('enter');
        const query = searchInputElem.value.trim()
        window.location.href = `/search.html?q=${encodeURIComponent(query)}`
    }
    
})

document.querySelector('#search-input + div').addEventListener('click', () => {

    if ( searchInputElem.value.trim() != '' ) {


        const query = searchInputElem.value.trim()
            window.location.href = `/search.html?q=${encodeURIComponent(query)}`
    }

})

showAndCalcBasketLength();