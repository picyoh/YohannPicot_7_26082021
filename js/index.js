// get recipes
const recipesList = recipes;

// get DOM elements
const mainTag = document.querySelector('main');
const inputs = document.querySelectorAll('input');

const searchBar = document.querySelector('#search');
const advSearchTags = document.querySelectorAll('.advSearch');

const dropdownMenu = document.querySelectorAll('.dropdown-menu');
const ingredientsDataTag = document.querySelector('#ingredientsData');
const appliancesDataTag = document.querySelector('#appliancesData');
const ustensilsDataTag = document.querySelector('#ustensilsData');

// create filtered index array
let filteredArray = [];

// create new recipes list
let filteredList = [];

// reset inputs on refresh & launch
window.onload = function(){
    init();
}

function init(){
    resetInputs();
    triggerSearch();
    triggerAdVSearch();
    hideDropdown();
    inputFocus();
    changeArrow();
    addCards(recipesList);
}

function refreshDisplay(array, list){
    resetDatas();
    getResult(array, list);
}




