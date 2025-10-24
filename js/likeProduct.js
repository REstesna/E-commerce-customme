import { products } from "./app.js";
import { findTopSellsHandler } from "./index.js";
import { generateProductInContainer } from "./renderProduct.js";

// liked products array 
let likedProducts = [];

const likedProductsContainer = document.querySelector('#liked-products');


export function likeProductHandler (id) {

    const mainProduct = products.filter( p => p.id == id)[0];
    mainProduct.isLiked = !mainProduct.isLiked;

    if ( mainProduct.isLiked ) {
        likedProducts.push(mainProduct)
    } else {

      const unlikeIndex  =  likedProducts.findIndex( liked => liked.id == mainProduct.id)

      likedProducts.splice(unlikeIndex, 1);
    }
    
    // set liked products to localStorage
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    
    findTopSellsHandler(products);


    // this condition for if we in a page except index don't render liked products
    if (likedProductsContainer) {
        
        generateProductInContainer(likedProductsContainer, likedProducts);  
    }
    
       if ( likedProductsContainer && likedProducts.length < 1 ) {
        likedProductsContainer.innerHTML = ` <h4 class="body-1 text-center text-[var(--gray-10)]">
                    علاقمندی های شما خالی است.
                </h4>`
    }
    
    

}

window.onload = () => {

    // get like products from local and set liked products by that
    const likedProductsFromLocal =  JSON.parse(localStorage.getItem('likedProducts'));
    likedProducts =  likedProductsFromLocal ?? [];
    
    // if liked product and container have been exist render them;
    if ( likedProductsFromLocal && likedProductsContainer) {

        generateProductInContainer(likedProductsContainer, likedProducts);
    } 

    
    

    if ( likedProductsContainer && likedProductsFromLocal && likedProductsFromLocal.length < 1 ) {
        likedProductsContainer.innerHTML = ` <h4 class="body-1 col-span-2 text-center text-[var(--gray-10)]">
                    علاقمندی های شما خالی است.
                </h4>`
    }
    
    products.forEach( p => {
        if ( likedProducts.findIndex( liked => liked.id == p.id ) != -1 ) p.isLiked = true;
    })

    // render again top 8 for show liked products
        findTopSellsHandler(products);



}

