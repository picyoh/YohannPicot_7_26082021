// reset on refresh
let inputs = document.querySelectorAll('input');

window.onload = function(){
    for(input of inputs){
        input.value = '';
    }
}

// get recipes
const recipesList = recipes;

function toLowerNormalize(result){
    let lowerResult = result.toLowerCase();
    let accentLessResult = lowerResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return accentLessResult;
}

// search engine

// create result array
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];

for(input of inputs){
    input.addEventListener('click', (e)=> {
        
        // get input name
        let inputName = e.target.id;
        e.target.addEventListener('keyup', (e)=> {
            
            if (e.target.value !== '' && e.target !== undefined){
                // get input value
                let inputReg = new RegExp(`${e.target.value}`,"gi");
                // set regex wth input value
                for (i=0; i< recipesList.length; i++){
                    // ingredients
                    if(inputName == 'search' || 'ingredients'){
                        let ingredientsLists = recipesList[i].ingredients;
                        
                        createIngredientsArray(inputReg, ingredientsLists);
                        // for (ingredientsList of ingredientsLists){
                        //     // ingredient
                        //     let ingredient = ingredientsList.ingredient;
                        //     // normalize
                        //     let normalizedIngredient = toLowerNormalize(ingredient);
                        //     // test
                        //     if (inputReg.test(normalizedIngredient)){
                        //         if(!ingredientsArray.includes(normalizedIngredient)){
                        //             ingredientsArray.push(normalizedIngredient);
                        //         }
                        //     }
                        // }
                        
                        // appliances
                        let appliance = recipesList[i].appliance;

                        createAppliancesArray(inputReg, appliance);
                        // // normalize
                        // let normalizedAppliance = toLowerNormalize(appliance);
                        // // test
                        // if (inputReg.test(normalizedAppliance)){
                        //     if(!appliancesArray.includes(normalizedAppliance)){
                        //         appliancesArray.push(normalizedAppliance);
                        //     }
                        // }
        
                        // ustensils
                        let ustensilsList = recipesList[i].ustensils;

                        createUstensilsArray(inputReg, ustensilsList);
                        // // ustensil
                        // for(ustensil of ustensilsList){
                        //     // normalize
                        //     let normalizedUstensil = toLowerNormalize(ustensil);
                        //     // test
                        //     if (inputReg.test(normalizedUstensil)){
                        //         if(!ustensilsArray.includes(normalizedUstensil)){
                        //             ustensilsArray.push(normalizedUstensil);
                        //         }
                        //     }
                        // }
                    }
                    addChoices(ingredientsArray, appliancesArray, ustensilsArray);
                }    
            }
        });
    });
}

// create Arrays fonction

function createIngredientsArray(inputReg, ingredientsLists){
    // create 
    // let ingredientsArray = [];
    
    for (ingredientsList of ingredientsLists){

        let ingredient = ingredientsList.ingredient;
        // normalize
        let normalizedIngredient = toLowerNormalize(ingredient);
        // test
        if (inputReg.test(normalizedIngredient)){
            if(!ingredientsArray.includes(normalizedIngredient)){
                ingredientsArray.push(normalizedIngredient);
            }
        }
    }
    return ingredientsArray;
}

function createAppliancesArray(inputReg, appliance){
    // create
    // let appliancesArray = [];
    // normalize
    let normalizedAppliance = toLowerNormalize(appliance);
    // test
    if (inputReg.test(normalizedAppliance)){
        if(!appliancesArray.includes(normalizedAppliance)){
            appliancesArray.push(normalizedAppliance);
        }
    }
    return appliancesArray;
}

function createUstensilsArray(inputReg, ustensilsList){
    // create
    // let ustensilsArray = [];

    for(ustensil of ustensilsList){
        // normalize
        let normalizedUstensil = toLowerNormalize(ustensil);
        // test
        if (inputReg.test(normalizedUstensil)){
            if(!ustensilsArray.includes(normalizedUstensil)){
                ustensilsArray.push(normalizedUstensil);
            }
        }
    }
    return ustensilsArray;
}



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
          ${ingIndex.ingredient} ${ingIndex.quantity ? `: `+ingIndex.quantity : ingIndex.quantite ? `: `+ingIndex.quantite : ''} ${ingIndex.unit ? ingIndex.unit : ''}            </p>
            </p>
          `
            ).join('')}
          <p id="ingredientText" class="card-text"></p>
          <p id="description" class="card-text">${recipesList[index].description}</p>
        </div>
    </div>
    `;
    cardsDeck.insertAdjacentHTML('beforeend', cardsPattern);
}