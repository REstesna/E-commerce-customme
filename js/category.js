import { products } from "./app.js";
import { generateProductInContainer } from "./renderProduct.js";

const productsContainerElem = document.querySelector("#products-container");
const showFilterButton = document.querySelector('#show-filters');
const filterContainerElem = document.querySelector('#filters-container');
const confirmFilters = document.querySelector("#confirm-filters");
const resetFiltersButton = document.querySelector('#reset-filters');

const searchURL = window.location.search;

const searchParams = new URLSearchParams(searchURL);

const mainCategory = searchParams.get("category") ?? 'all';

const pageTitleH3Elem = document.querySelector('#page-title');

export let filters = {
  mainCategory: mainCategory,
  maxPrice: Infinity,
};

window.onload = function ( ) {

  const localLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) ?? [];

  products.map( p => {

    const isProductInLiked = localLikedProducts.findIndex(liked => +p.id == +liked.id);

    if ( isProductInLiked != -1 ) {
      p.isLiked = true;
    } 
  } )
  
  filter(products, filters);

}

let filterProducts;

export function filter(products, filters) {

  filterProducts = products.filter((product) => {
    return filterByCategory(product, filters.mainCategory) &&
        filterByPrice(product, filters.maxPrice);
  });

  generateProductInContainer(productsContainerElem, filterProducts);
  setPageTitleByCategory(filters.mainCategory);
  setUrlByCategory(filters.mainCategory);

};




// generateProductInContainer(productsContainerElem, filterProducts);

// select by tom-select library - category

const CategoryFilter = new TomSelect(document.querySelector("#category"), {
  create: true,
  sortField: {
    field: "text",
    direction: "asc",
  },
});

CategoryFilter.setValue(mainCategory);

CategoryFilter.on("change", (value) => {
  
  filters.mainCategory = value;
  filters.maxPrice = Infinity;
  MaxPrice.setValue(1)
    filter(products, filters);
});
///////////////////////////////////////////

function filterByCategory(product, category) {

  if (category === 'all' || category == 1) {
    return true;
  }

  return product.category.includes(category);
}

// 
function filterByPrice (product, price){

  if ( price == 1 ) {
    return true
  }

  return +product.price < +price;
} 

// select by tom-select library - max-price

const MaxPrice = new TomSelect(document.querySelector("#max-price"), {
  create: true,
  sortField: {
    field: "text",
    direction: "asc",
  },
});

MaxPrice.on("change", (value) => {
  filters.maxPrice = value;
  filter(products, filters);

});


///////////////////////////////////////////


function setPageTitleByCategory (category){

  switch (category) {

    case 'mobile-cover':
          pageTitleH3Elem.innerHTML = `#قاب موبایل`
      break;

    case 'home-decor':
          pageTitleH3Elem.innerHTML = `#دکور خانه`
      break;

    case 'greeting-card':
          pageTitleH3Elem.innerHTML = `#کارت تبریک`
      break;

    case 'accessory':
          pageTitleH3Elem.innerHTML = `#اکسسوری`
      break;

    case 'writing-supplies':
          pageTitleH3Elem.innerHTML = `#لوازم تحریر`
      break;

    case 'clothes':
          pageTitleH3Elem.innerHTML = `#لباس `
      break;

    case 'all':
          pageTitleH3Elem.innerHTML = `#همه محصولات `
      break;

    case '1':
          pageTitleH3Elem.innerHTML = `#همه محصولات `
      break;
  
    default:
      break;
  }
  
}


//// 
function setUrlByCategory(category){


  if ( category == 1 ) {
    category = 'all'
  }

  const url = new URL(window.location);

  url.searchParams.set('category', category);

  history.pushState({}, '', url)
  
}


/// show filters in mobile

showFilterButton.addEventListener('click', () => {
  filterContainerElem.classList.remove("hidden");
});

// 
confirmFilters.addEventListener('click', () => {
  filterContainerElem.classList.add('hidden')
});

document.querySelector('#close-filters-container')
  .addEventListener('click', () => {
    filterContainerElem.classList.add('hidden');
  });

resetFiltersButton.addEventListener('click', () => {

  filters.mainCategory = 'all';
  filters.maxPrice = Infinity;
  filter(products, filters);

  CategoryFilter.setValue(mainCategory);

})