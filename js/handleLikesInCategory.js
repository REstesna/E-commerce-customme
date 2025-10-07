import { products } from "./app.js";
import { filter, filters } from "./category.js";



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


    filter(products, filters);
    localStorage.setItem( 'likedProducts' ,JSON.stringify(localLikedProducts));
  }
});
