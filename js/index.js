// get recipes
const recipesList = recipes

// get DOM elements
const mainTag = document.querySelector('main')
const inputs = document.querySelectorAll('input')

const searchBar = document.querySelector('#search')
const advSearchTags = document.querySelectorAll('.advSearch')

const dropdownMenu = document.querySelectorAll('.dropdown-menu')
const ingredientsDataTag = document.querySelector('#ingredientsData')
const appliancesDataTag = document.querySelector('#appliancesData')
const ustensilsDataTag = document.querySelector('#ustensilsData')

// create new recipes list
let filteredList = []
// create input list
let inputsList = []

// reset inputs on refresh & launch
window.onload = function(){
    init()
}

function init(){
    resetInputs()
    triggerSearch()
    triggerAdVSearch()
    hideDropdown()
    inputFocus()
    changeArrow()
    addCards(recipesList)
}

function refreshDisplay(array){
    resetDatas()
    appendAdv(filteredList)
    addCards(filteredList)
}

function basicSearch(inputValue){
    const searchIds = ["name", "ingredients", "description"]
    // reset list
    filteredList = []
    searchIds.forEach(parentId => {
        filterList(inputValue, parentId, recipesList)
    })
    refreshDisplay(recipesList)
    triggerCustomerChoice()
}

function customSearch(inputValue, parentId, list){
    filterList(inputValue, parentId, list)
    appendCustomerChoice(inputValue, parentId)
    refreshDisplay(list)
    filterChoices(inputValue)
    listInputs()
}

function advSearch(inputValue, parentId, list){
    filterList(inputValue, parentId, list)
    refreshDisplay(list)
    filterChoices(inputValue)
    triggerCustomerChoice()
}

function listInputs(){
    const tags = document.querySelectorAll('.tags')
    inputsList = []
    inputsList.push(searchBar.value)
    tags.forEach(element => {
        inputsList.push(element.textContent)
    })
}

