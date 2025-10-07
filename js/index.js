import { products } from "./app.js";
import { likeProductHandler } from "./likeProduct.js";
import { generateProductInContainer } from "./renderProduct.js";
import { createStore } from "./state.js";

// best sells product container
export const bestSellsContainer = document.querySelector("#best-sells");

// best sellers products

export function findTopSellsHandler (products) {

    const sortedProducts = products.sort((a, b) => b.soldCount - a.soldCount);
    const top8BestSells = sortedProducts.slice(0, 8);

    // generate best sell products
    generateProductInContainer(bestSellsContainer, top8BestSells);
}







document.addEventListener("click", (event) => {
  // fire like product handler
  if (event.target.closest("#liked-button")) {
    likeProductHandler(event.target.closest("#liked-button").dataset.pid);
  }
});
