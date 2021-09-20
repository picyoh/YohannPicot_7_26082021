// reset on refresh
const inputs = document.querySelectorAll('input');

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
    const recipeIngredients = recipesList[i].ingredients;
    
    for(ingredientItem of recipeIngredients){
        // ingredient
        const actualIngredient = ingredientItem.ingredient;
        // normalize
        let normalizedIngredient = toLowerNormalize(actualIngredient);
        // console.log(normalizedIngredient);
        normalizedIngredient = checkPlurials(normalizedIngredient, ingredientsList);
        // console.log(normalizedIngredient);
        // compare to existing array
        if (!ingredientsList.includes(normalizedIngredient)){

            // normalizedIngredient = word;
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
    const actualApplicance = recipesList[i].appliance;
    // normalize
    let normalizedAppliance = toLowerNormalize(actualApplicance);
    normalizedAppliance = checkPlurials(normalizedAppliance, appliancesList);
    // compare to existing array
    if(!appliancesList.includes(normalizedAppliance)){
        // normalizedAppliance = word;
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
    const recipeUstensil = recipesList[i].ustensils;

    for(ustensilItem of recipeUstensil){
        // ustensil
        const actualUstensil = toLowerNormalize(ustensilItem);
        // normalize
        let normalizedUstensil = toLowerNormalize(actualUstensil);
        normalizedUstensil = checkPlurials(normalizedUstensil, ustensilsList);
        // compare to existing array
        if (!ustensilsList.includes(normalizedUstensil)){
            // normalizedUstensil = word;
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
    const lowerResult = result.toLowerCase();
    const accentLessResult = lowerResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return accentLessResult;
}

function checkPlurials(word, list){
    
    const wordLength = word.length;
    const wordSingular = word.slice(0, wordLength -1);
    
    if(list.includes(wordSingular)){
        return wordSingular;
    } else {
        return word;
    }
}

// console.log(ingredientsList);
// console.log(appliancesList);
// console.log(ustensilsList);

// search engine

// check inpput on click
for(input of inputs){

    input.addEventListener('click', (e)=> {
        // get input name
        const target = e.target;
        const inputName = target.id;
        
        if(inputName == 'search'){
            // concat Lists
            // const concatList = ingredientsList.concat(appliancesList.concat(ustensilsList));
            
            // get input value & compare
            compareChars(ingredientsList, target, 0);
            compareChars(appliancesList, target, 1);
            compareChars(ustensilsList, target, 2);
            // compareChars(concatList, target);
            // append choices
        }else if('ingredients'|'appliances'|'ustensils'){
            // get list name
            const listName = inputName + 'List';
            const list = eval(listName);

            if(list[0] !== undefined){
                // get input value
                // append choices
            }
        }
    });
}


// boucle avec tableau
function compareChars(list, input, listNumber){
    // listen to keyboards
    input.addEventListener('keyup',(e)=> {
        
        const CharsIndexArray = [];
        
        if(input.value.length >= 3){

            // clear previous datas
            const ingredientsDataList= document.querySelector('#ingredientsData');
            ingredientsDataList.innerHTML = '';
            const appliancesDataList = document.querySelector('#appliancesData');
            appliancesDataList.innerHTML = '';
            const ustensilsDataList = document.querySelector('#ustensilsData');
            ustensilsDataList.innerHTML = '';

            const charsNumber = input.value.length;
            
            for (i=0; i<list.length; i++){
                const current = typeof list[i];
                // checking for type string
                if(current == "string"){
                    const slicedString = list[i].slice(0, charsNumber);
                    // compare
                    if(slicedString === input.value){
                        CharsIndexArray.push(i);
                    }
                }
            }

            getMatchingId(list, CharsIndexArray, listNumber);

        } else {
            e.stopPropagation();
        }
    });
}

function getMatchingId(list, CharsIndexArray, listNumber){
    // create result index array for cards
    const recipesResultArray = [];

    // create result for choices list
    const ingredientsArray = [];
    const appliancesArray = [];
    const ustensilsArray = [];
    
    for(results of CharsIndexArray){
        switch(listNumber){
            case 0:
                if(!ingredientsArray.includes(results)){
                    ingredientsArray.push(list[results]);
                }
                break;
            case 1:
                if(!appliancesArray.includes(results)){
                    appliancesArray.push(list[results]);
                }
                break;
            case 2:
                if(!ustensilsArray.includes(results)){
                    ustensilsArray.push(list[results]);
                }
                break;
            default:
                console.log("err choice arrray");
        }
        const recipesId = list[results +1];
        for(recipeId of recipesId){
            if(!recipesResultArray.includes(recipeId)){
                recipesResultArray.push(recipeId);
            }
        }
    }
    getMatchingRecipes(recipesResultArray);
    addChoices(ingredientsArray, appliancesArray, ustensilsArray);
}

function getMatchingRecipes(recipesResultArray){
    for(result of recipesResultArray){
        console.log(recipesList[result]);
    }
}

// add choices to inputs

function addChoices(ingredientsArray, appliancesArray, ustensilsArray){
    
    // ingredients
    const ingredientsDataList= document.querySelector('#ingredientsData');
    for(element of ingredientsArray){
        console.log(element);

        // add ingredient List in datalist
        const ingredientOption = `<option value="${element}">`;
        ingredientsDataList.insertAdjacentHTML('afterbegin', ingredientOption)
    }
    //appliances
    // console.log(appliancesArray);
    const appliancesDataList = document.querySelector('#appliancesData');
    for(element of appliancesArray){
        // add appliances List in datalist
        const appliancesOption = `<option value="${element}">`;
        appliancesDataList.insertAdjacentHTML('afterbegin', appliancesOption)
    }

    // ustensils
    // console.log(ustensilsArray);
    const ustensilsDataList = document.querySelector('#ustensilsData');
    for(element of ustensilsArray){
        // add ustensils List in datalist
        const ustensilsOption = `<option value="${element}">`;
        ustensilsDataList.insertAdjacentHTML('afterbegin', ustensilsOption)
    }

}

// add cards to page
const indexes = [1, 2, 3, 4, 5, 6];
const mainTag = document.querySelector("main");
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
    const cardsDecks = document.querySelectorAll(".card-deck");
    const cardsDeck = cardsDecks[cardsDecks.length - 1];

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