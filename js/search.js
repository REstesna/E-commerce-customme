import {products} from './app.js'
import { generateProductInContainer } from './renderProduct.js';

let mainProducts = null;

window.onload = function ( ) {

    const localLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) ?? [];
    
      products.map( p => {
    
        const isProductInLiked = localLikedProducts.findIndex(liked => +p.id == +liked.id);
    
        if ( isProductInLiked != -1 ) {
          p.isLiked = true;
        } 
      } )
      
      if (mainProducts.length >= 1) {
          
      generateProductInContainer(searchProductsContainer, mainProducts);
    }
    ;

}

const searchProductsContainer = document.querySelector('#search-products');
const searchedForElem = document.querySelector('#searched-for');

window.addEventListener('DOMContentLoaded', () => {

    


    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get('q');

    mainProducts = products.filter (product => {


        return product.title.includes(q);

    });

    searchedForElem.innerHTML = `نتایج برای: ${q}`;
    document.title = `نتایج برای: ${q}`;

    if (mainProducts.length < 1) {


        searchProductsContainer.innerHTML = `<h4 class="body-1 text-center text-[var(--gray-10)]">
                    نتیجه ای یافت نشد.
        </h4>`

    } else {
        generateProductInContainer(searchProductsContainer, mainProducts);
    }
    
})





// handel likes

document.addEventListener("click", (event) => {



  // fire like product handler
  if (event.target.closest("#liked-button")) {

    const localLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) ?? [];

    let mainID = null;

      
    if ( event.target.tagName === 'IMG' ) {
        
        mainID = event.target.parentElement.dataset.pid;
        
        
    } else {
        
        mainID = event.target.dataset.pid;
    }
    
    

    const mainProduct = products.find(p => +p.id === +mainID);

    if ( !mainProduct.isLiked ) {

        mainProduct.isLiked = true;
        localLikedProducts.push(mainProduct);

    } else {

        const productIndexInLikedProducts = localLikedProducts.findIndex( lp => +lp.id === mainID);

        console.log(localLikedProducts);
        

        mainProduct.isLiked = false;
        localLikedProducts.splice(productIndexInLikedProducts, 1);
        

    }


    mainProducts && generateProductInContainer(searchProductsContainer, mainProducts);
    ;
    localStorage.setItem( 'likedProducts' ,JSON.stringify(localLikedProducts));
  }
});
