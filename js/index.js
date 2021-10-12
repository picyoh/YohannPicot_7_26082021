// get recipes
const recipesArray = recipes;

// get DOM elements
const searchInput = document.querySelector('#search');
const inputs = document.querySelectorAll('input');
const dataListTag = document.querySelectorAll('.dropdown-menu');

const mainTag = document.querySelector("main");
const cardsDecks = document.querySelectorAll(".card-deck");

const ingredientsDataArray= document.querySelector('#ingredientsData');
const appliancesDataArray = document.querySelector('#appliancesData');
const ustensilsDataArray = document.querySelector('#ustensilsData');

// reset inputs on refresh & launch
window.onload = function(){
    resetInputs();
    ListenTrigger();
    addCards(recipesArray);
}

function ListenTrigger(){
    let parentRef = {
        "ingredients" : "ingredients[j].ingredient",
        "ustensils" : "ustensils[j]"
    }

    for(input of inputs){
        input.addEventListener('keyup',(e)=> {
            if(e.target.value.length >= 3){

                let parentId = e.target.id;
                console.log( parentId);
                // searchEngine(e.target.value, recipesArray);
            }else if(e.target.value >= 1 && e.key === 'Backspace'){
                // resetInputs();
                // resetData();
                // addChoices(recipesArray);
                // addCards(recipesArray);
            }
            e.stopPropagation();
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
    // append first card-deck
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


