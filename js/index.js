// reset on refresh
let inputs = document.querySelectorAll('input');

window.onload = function(){
    for(input of inputs){
        input.value = '';
    }
}

// get recipes
const recipesList = recipes;

// create new lists
const ingredientsList = [];
const appliancesList = [];
const ustensilsList = [];

// reduce entries

for (let i = 0; i < recipesList.length; i++){
    // ingredients array
    let recipeIngredients = recipesList[i].ingredients;
    
    for(ingredientItem of recipeIngredients){
        // ingredient
        let actualIngredient = ingredientItem.ingredient;
        // normalize
        let normalizedIngredient = toLowerNormalize(actualIngredient);
        // compare to existing array
        if (!ingredientsList.includes(normalizedIngredient)){

            checkPlurials(normalizedIngredient, ingredientsList);
            // push ingredient to array
            ingredientsList.push(normalizedIngredient);
            // push its index
            ingredientsList.push([i]);
        }else if(ingredientsList.includes(normalizedIngredient)){
            // push index in array if it already listed
            const ingredientIndex = ingredientsList.findIndex(ingredient => ingredient === normalizedIngredient);
            ingredientsList[ingredientIndex + 1].push(i); 
        }
    }
    
    // appliances
    let actualApplicance = recipesList[i].appliance;
    // normalize
    let normalizedAppliance = toLowerNormalize(actualApplicance);
    // compare to existing array
    if(!appliancesList.includes(normalizedAppliance)){
        checkPlurials(normalizedAppliance, appliancesList);
        // push to apliance to array
        appliancesList.push(normalizedAppliance);
        // push its index
        appliancesList.push([i]);
    }else if(appliancesList.includes(normalizedAppliance)){
        // push index to array if it already listed
        const applianceIndex = appliancesList.findIndex(appliance => appliance === normalizedAppliance);
        appliancesList[applianceIndex + 1].push(i);
    }

    // ustensils array
    let recipeUstensil = recipesList[i].ustensils;

    for(ustensilItem of recipeUstensil){
        // ustensil
        let actualUstensil = toLowerNormalize(ustensilItem);
        // normalize
        let normalizedUstensil = toLowerNormalize(actualUstensil);
        // compare to existing array
        if (!ustensilsList.includes(normalizedUstensil)){
            checkPlurials(normalizedUstensil, ustensilsList);
            // push ustensils to array
            ustensilsList.push(normalizedUstensil);
            // push its index
            ustensilsList.push([i]);
        }else if (ustensilsList.includes(normalizedUstensil)){
            // push to index to array if it already listed
            const ustensilIndex = ustensilsList.findIndex(ustensil => ustensil === normalizedUstensil);
            ustensilsList[ustensilIndex + 1].push(i);
        }
    }
}

function toLowerNormalize(result){
    let lowerResult = result.toLowerCase();
    let accentLessResult = lowerResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return accentLessResult;
}

function checkPlurials(word, list){
    
    let wordLength = word.length;
    if(word.charAt(wordLength) == 's'){
        let wordSingular = word.slice(0, wordLength -1);
        if(list.includes(wordSingular)){
            return word = wordSingular;
        }
    }

    console.log(word);
    return word;
}

console.log(ingredientsList);
console.log(appliancesList);
console.log(ustensilsList);

// search engine

// check inpput on click
for(input of inputs){
    input.addEventListener('click', (e)=> {
        
        // get input name
        let target = e.target;
        let inputName = target.id;
        
        if(inputName == 'search'){
            // concat Lists
            let concatList = ingredientsList.concat(appliancesList.concat(ustensilsList));
            // get input value & compare
            compareChars(concatList, target);
            // append choices
        }else if('ingredients'|'appliances'|'ustensils'){
            // get list name
            let listName = inputName + 'List';
            let list = eval(listName);

            if(list[0] !== undefined){
                // get input value
                // append choices
            }
        }
    });
}


// boucle avec tableau
function compareChars(list, input){
    // create comparaison array
    input.addEventListener('keyup',(e)=> {
        // listen to keyboards
        let CharsIndexArray = [];
        
        if(input.value !== ""){
            let charsNumber = input.value.length;
            
            for (i=0; i<list.length; i++){
                let current = typeof list[i];
                // checking for type string
                if(current == "string"){
                    let slicedString = list[i].slice(0, charsNumber);
                    // compare
                    if(slicedString === input.value){
                        CharsIndexArray.push(i);
                    }
                }
            }
            getMatchingId(list, CharsIndexArray);
        }
    });
}

function getMatchingId(list, CharsIndexArray){
    let recipesResultArray = [];
    
    for(results of CharsIndexArray){
        let recipesId = list[results +1];
        for(recipeId of recipesId){
            if(!recipesResultArray.includes(recipeId)){
                recipesResultArray.push(recipeId);
            }
        }
    }
    getMatchingRecipes(recipesResultArray);
}

function getMatchingRecipes(recipesResultArray){
    
    for(result of recipesResultArray){
        console.log(recipesList[result]);
    }
}

// boucle avec Regex

// function createString(array, target){
    
//     let flatArray = array.flat();
//     let filteredArray = flatArray.filter(element => isNaN(element));
//     let sepArray=[];
//     for(element of filteredArray){
//         let sepEl = element.replace(/\s/g, '+');
//         sepArray.push(sepEl);
//     }

//     let stringArray = sepArray.join('|');
//     compareInputValue(target, stringArray);
// }

// function compareInputValue(input, list){
//     input.addEventListener('keyup', (e)=> {
//         let inputReg = new RegExp(`${input.value}`,"gi");
//         console.log(list);
//         console.log(inputReg);
//         // console.log(inputReg);
//         let matchesResult;
//         while((matchesResult = inputReg.exec(list)) !== null) {
//             console.log(`${matchesResult[0]} , ${inputReg.lastIndex}`);
//             // retrouver correspondance indexes
//         }
//     });
// }

// add choices to inputs

function addChoices(ingredientsArray, appliancesArray, ustensilsArray){
    
    // ingredients
    let ingredientDataList= document.querySelector('#ingredientsData');
    for(element of ingredientsArray){
        // add ingredient List in datalist
        const ingredientOption = `<option value="${element}">`;
        ingredientDataList.insertAdjacentHTML('afterbegin', ingredientOption)
    }
    //appliances
    console.log(appliancesArray);
    let appliancesDataList = document.querySelector('#appliancesData');
    for(element of appliancesArray){
        // add appliances List in datalist
        const appliancesOption = `<option value="${element}">`;
        appliancesDataList.insertAdjacentHTML('afterbegin', appliancesOption)
    }

    // ustensils
    console.log(ustensilsArray);
    let ustensilsDataList = document.querySelector('#ustensilsData');
    for(element of ustensilsArray){
        // add ustensils List in datalist
        const ustensilsOption = `<option value="${element}">`;
        ustensilsDataList.insertAdjacentHTML('afterbegin', ustensilsOption)
    }

}




// add cards to page
let indexes = [1, 2, 3, 4, 5, 6];
let mainTag = document.querySelector("main");
let x = 0;
for(index of indexes){
    if(x%3 == 0 && x!==0){
        const deckSup = `
        <div class="card-deck">
        </div>
        `;
        
        mainTag.insertAdjacentHTML('beforeend', deckSup);
        addCards(index);
        x=0;
    }
    else{
        addCards(index);
    }
    x++;
}

function addCards(index){
    let cardsDecks = document.querySelectorAll(".card-deck");
    let cardsDeck = cardsDecks[cardsDecks.length - 1];

    const cardsPattern = `
    <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
          <h6 class="card-title">${recipesList[index].name}</h5>
          <p id="time" class="card-text"><i class="far fa-clock"></i>${recipesList[index].time}</p>
          ${recipesList[index].ingredients.map(ingIndex =>
            `
          <p id="ingredientText" class="card-text">
          ${ingIndex.ingredient} ${ingIndex.quantity ? `: `+ ingIndex.quantity : ingIndex.quantite ? `: ` + ingIndex.quantite : ''} ${ingIndex.unit ? ingIndex.unit : ''}            </p>
          `
            ).join('')}
          <p id="ingredientText" class="card-text"></p>
          <p id="description" class="card-text">${recipesList[index].description}</p>
        </div>
    </div>
    `;
    cardsDeck.insertAdjacentHTML('beforeend', cardsPattern);
}