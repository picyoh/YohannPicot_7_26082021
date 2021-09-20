// reset on refresh
const inputs = document.querySelectorAll('input');

window.onload = function(){
    for(input of inputs){
        input.value = '';
    }
}

// get recipes
const recipesList = recipes;

function toLowerNormalize(result){
    const lowerResult = result.toLowerCase();
    const accentLessResult = lowerResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return accentLessResult;
}

// search engine

// create result array
const ingredientsArray = [];
const appliancesArray = [];
const ustensilsArray = [];

for(input of inputs){
    input.addEventListener('click', (e)=> {
        
        // get input name
        const inputName = e.target.id;
        e.target.addEventListener('keyup', (e)=> {
            
            if (e.target.value !== '' && e.target !== undefined){
                // get input value
                const inputReg = new RegExp(`${e.target.value}`,"gi");
                // set regex wth input value
                for (i=0; i< recipesList.length; i++){
                    // ingredients
                    if(inputName == 'search' || 'ingredients'){
                        const ingredientsLists = recipesList[i].ingredients;
                        
                        createIngredientsArray(inputReg, ingredientsLists);
                        // for (ingredientsList of ingredientsLists){
                        //     // ingredient
                        //     const ingredient = ingredientsList.ingredient;
                        //     // normalize
                        //     const normalizedIngredient = toLowerNormalize(ingredient);
                        //     // test
                        //     if (inputReg.test(normalizedIngredient)){
                        //         if(!ingredientsArray.includes(normalizedIngredient)){
                        //             ingredientsArray.push(normalizedIngredient);
                        //         }
                        //     }
                        // }
                        
                        // appliances
                        const appliance = recipesList[i].appliance;

                        createAppliancesArray(inputReg, appliance);
                        // // normalize
                        // const normalizedAppliance = toLowerNormalize(appliance);
                        // // test
                        // if (inputReg.test(normalizedAppliance)){
                        //     if(!appliancesArray.includes(normalizedAppliance)){
                        //         appliancesArray.push(normalizedAppliance);
                        //     }
                        // }
        
                        // ustensils
                        const ustensilsList = recipesList[i].ustensils;

                        createUstensilsArray(inputReg, ustensilsList);
                        // // ustensil
                        // for(ustensil of ustensilsList){
                        //     // normalize
                        //     const normalizedUstensil = toLowerNormalize(ustensil);
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
    // const ingredientsArray = [];
    
    for (ingredientsList of ingredientsLists){

        const ingredient = ingredientsList.ingredient;
        // normalize
        const normalizedIngredient = toLowerNormalize(ingredient);
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
    // const appliancesArray = [];
    // normalize
    const normalizedAppliance = toLowerNormalize(appliance);
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
    // const ustensilsArray = [];

    for(ustensil of ustensilsList){
        // normalize
        const normalizedUstensil = toLowerNormalize(ustensil);
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
    const ingredientDataList= document.querySelector('#ingredientsData');
    for(element of ingredientsArray){
        // add ingredient List in datalist
        const ingredientOption = `<option value="${element}">`;
        ingredientDataList.insertAdjacentHTML('afterbegin', ingredientOption)
    }
    //appliances
    console.log(appliancesArray);
    const appliancesDataList = document.querySelector('#appliancesData');
    for(element of appliancesArray){
        // add appliances List in datalist
        const appliancesOption = `<option value="${element}">`;
        appliancesDataList.insertAdjacentHTML('afterbegin', appliancesOption)
    }

    // ustensils
    console.log(ustensilsArray);
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
const x = 0;
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