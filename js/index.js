// get recipes
const recipesArray = recipes;

// get DOM elements
const searchInput = document.querySelector('#search');
const inputs = document.querySelectorAll('input');
const dataListTag = document.querySelectorAll('.dropdown-menu');

const mainTag = document.querySelector("main");
const cardsDecks = document.querySelectorAll(".card-deck");

const ingredientsDataArray= document.querySelector('#ingredients');
const appliancesDataArray = document.querySelector('#appliances');
const ustensilsDataArray = document.querySelector('#ustensils');

// reset inputs on refresh & launch
window.onload = function(){
    resetInputs();
    triggerSearch();
    addChoices(recipesArray);
    addCards(recipesArray);
}

function triggerSearch(){
    for(input of inputs){
        input.addEventListener('keyup',(e)=> {
            e.stopPropagation();
            console.log(e.target.value)
            if(e.target.value.length >= 3){
                searchEngine(e.target.value, recipesArray);
            }else if(e.target.value >= 1 && e.key === 'Backspace'){
                // resetInputs();
                // resetData();
                // addChoices(recipesArray);
                // addCards(recipesArray);
            }
        });
    }
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

// remove duplicates entries
function checkDuplicata(entry, array){
    const normalizedEntry = normalizeEntry(entry);
    
    const entryLength = entry.length;
    const entryPerc = parseInt(entryLength * 0.80);
    
    const entryTest = normalizedEntry.slice(0, entryPerc);
    const entryReg = new RegExp(entryTest,'gi');

    if(array.children[0] === undefined){
        return false;
    }else{
        for (element of array.children){
            const normEl = normalizeEntry(element.text)
            const tested = entryReg.test(normEl);
            if(tested === true){
                return tested
            }
        }    
    }
}

function resetData(){
    // reset dataList
    for (element of dataListTag){
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

    // reset cards
    while (mainTag.firstChild){
        mainTag.removeChild(mainTag.firstChild);
    }
    const firstCardDeck = document.createElement('div');
    firstCardDeck.className = 'card-deck';
    mainTag.append(firstCardDeck);
}

// reset Inputs
function resetInputs(){
    for(input of inputs){
        input.value = '';
    }
}


