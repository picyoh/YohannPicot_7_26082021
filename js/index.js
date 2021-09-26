// get recipes
const recipesArray = recipes;

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
    reduceEntries();
}

// filter
function entryFilter(i, j, k, entry){
    // normalize
    let normalizedEntry = normalizeEntry(entry);
    // normalizedEntry = checkDuplicata(normalizedEntry);
    // compare to existing array
    if(!filteredArray.includes(normalizedEntry)){
        // push to apliance to array
        filteredArray.push(normalizedEntry);
        // push its index
        filteredArray.push([[i, j, k]]);
    }else if(filteredArray.includes(normalizedEntry)){
        // push index to array if it already filteredArrayed
        const actualIndex = filteredArray.findIndex(element => element === normalizedEntry);
        filteredArray[actualIndex + 1].push([i, j, k]);
    }
}
// normalize

function normalizeEntry(result){
    // remove punctuation
    const ponctlessResult = result.replace(/[.,\/#!$\^&\*;:{}=\-_`~()]/g,"");
    // remove accents
    const accentLessResult = ponctlessResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    // replace Capitals
    const normalizedResult = accentLessResult.toLowerCase();
    return normalizedResult;
}

// remove duplicates entries
function checkDuplicata(result){
    const resultLength = result.length;

    const resultperc = parseInt(resultLength * 0.85);
    const resultTest = result.slice(0, resultperc);
    const resultReg = new RegExp(`${resultTest}`,'g');

    if(filteredArray[0] === undefined){
        return result
    }else{
        for (element of filteredArray){
            if(typeof element === "string"){
                const tested = resultReg.test(element);
                if(tested == true){
                    return result = element;
                } 
            }    
        }
        return result;
    }
}

// reset dataList

function resetDataList(){
    for (element of dataListTag){
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    }
}

function resetCards(){
    while (mainTag.firstChild){
        mainTag.removeChild(mainTag.firstChild);
    }
    const firstCardDeck = document.createElement('div');
    firstCardDeck.className = 'card-deck';
    mainTag.append(firstCardDeck);

}

// reduce entries

function reduceEntries(){
    for (let i = 0; i < recipesArray.length; i++){
        // create ingredients array
        const recipeIngredients = recipesArray[i].ingredients;
        
        for(j = 0; j < recipeIngredients.length; j++){
            const actualIngredient = recipeIngredients[j].ingredient;
            entryFilter(i, j, null, actualIngredient);
        }
        
        // create appliances array
        const actualApplicance = recipesArray[i].appliance;
        entryFilter(i, null, null, actualApplicance);
    
        // create ustensils array
        const recipeUstensil = recipesArray[i].ustensils;
    
        for(k = 0; k < recipeUstensil.length; k++){
            const actualUstensil = normalizeEntry(recipeUstensil[k]);
            entryFilter(i, null, k, actualUstensil);
        }
    }
    addChoices(filteredArray);
    addCards(filteredArray);
    searchEngine(filteredArray, searchInput);
}

