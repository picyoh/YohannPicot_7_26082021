// get recipes
const recipesArray = recipes;

const fullArray = [];
// create filtered entries array
const filteredArray = [];

// get DOM elements
const searchInput = document.querySelector('#search');
const inputs = document.querySelectorAll('input');
const dataListTag = document.querySelectorAll('datalist');

const mainTag = document.querySelector("main");
const cardsDecks = document.querySelectorAll(".card-deck");

const ingredientsDataArray= document.querySelector('#ingredientsData');
const appliancesDataArray = document.querySelector('#appliancesData');
const ustensilsDataArray = document.querySelector('#ustensilsData');

// reset inputs on refresh & launch
window.onload = function(){
    for(input of inputs){
        input.value = '';
    }
    searchEngine(recipesArray, searchInput);
    addChoices(recipesArray);
    addCards(recipesArray);
}

// normalize
function normalizeEntry(entry){
    // remove punctuation
    const ponctlessResult = entry.replace(/[.,\/#!$\^&\*;:{}=\-_`~()]/g,"");
    // remove accents
    const accentLessResult = ponctlessResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    // replace Capitals
    const normalizedResult = accentLessResult.toLowerCase();
    return normalizedResult;
}

// reset dataList
function resetDataList(){
    for (element of dataListTag){
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    }
}

// reste cards
function resetCards(){
    while (mainTag.firstChild){
        mainTag.removeChild(mainTag.firstChild);
    }
    const firstCardDeck = document.createElement('div');
    firstCardDeck.className = 'card-deck';
    mainTag.append(firstCardDeck);

}


