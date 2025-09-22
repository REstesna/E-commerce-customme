const $ = document;

const searchBoxElem = $.querySelector('#search-box');
const searchInputElem = $.querySelector('#search-input')



// active search type by click on search-box
searchBoxElem.addEventListener('click', () => {
    searchBoxElem.classList.add('active-search');
    searchInputElem.focus()
});

searchInputElem.addEventListener('blur', () => {
    searchBoxElem.classList.remove('active-search');
})