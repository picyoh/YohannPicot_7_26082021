// reset on refresh
const inputs = document.querySelectorAll('input');

window.onload = function(){
    for(input of inputs){
        input.value = '';
    }
    searchEngine();
}

// get recipes
const recipesList = recipes;

function toLowerNormalize(result){
    const lowerResult = result.toLowerCase();
    const accentLessResult = lowerResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return accentLessResult;
}

// search engine
function searchEngine(){
    for(input of inputs){
        input.addEventListener('click', (e)=> {
            
            // get input name
            const inputName = e.target.id;
            e.target.addEventListener('keyup', (e)=> {
                if(inputName == 'search'){
                     // create result array
                const ingredientsArray = [];
                const appliancesArray = [];
                const ustensilsArray = [];
                    if (e.target.value !== '' && e.target !== undefined){
                        // set regex wth input value
                        const inputReg = new RegExp(`(^|\\s)${e.target.value}`);
                        console.log(inputReg);
    
                        for (i=0; i< recipesList.length; i++){
                            // ingredients
                            const ingredientsLists = recipesList[i].ingredients;
                            
                            for (j=0; j< ingredientsLists.length; j++){
                                // ingredient
                                const ingredient = ingredientsLists[j].ingredient;
                                // normalize
                                const normalizedIngredient = toLowerNormalize(ingredient);
                                // test
                                if (inputReg.test(normalizedIngredient)){
                                    const k = [i,j];
                                    if(!ingredientsArray.includes(k)){
                                            ingredientsArray.push(k);
                                    }
                                }
                            }
                            
                            // appliances
                            const appliance = recipesList[i].appliance;
                            // normalize
                            const normalizedAppliance = toLowerNormalize(appliance);
                            // test
                            if (inputReg.test(normalizedAppliance)){
                                if(!appliancesArray.includes(i)){
                                    appliancesArray.push(i);
                                }
                            }
            
                            // ustensils
                            const ustensilsList = recipesList[i].ustensils;
                            // ustensil
                            for(j=0; j<ustensilsList.length; j++){
                                // normalize
                                const normalizedUstensil = toLowerNormalize(ustensilsList[j]);
                                // test
                                if (inputReg.test(normalizedUstensil)){
                                    const k = [i,j];
                                    if(!ustensilsArray.includes(k)){
                                            ustensilsArray.push(k);
                                    }
                                }
                            }
                        }
                        addChoices(ingredientsArray, appliancesArray, ustensilsArray);
                    }    
                }
            });
        });
    }
}

// add choices to inputs
function addChoices(ingredientsArray, appliancesArray, ustensilsArray){
    console.log(ingredientsArray)
    // ingredients
    const ingredientDataList= document.querySelector('#ingredientsData');
    let optionsList= [];
    let compareList=[];

    for (i=0; i< ingredientsArray.length; i++){
        const k= ingredientsArray[i];

        const entry = recipesList[k[0]].ingredients[k[1]].ingredient;

        if(i===0){
            optionsList.push(entry);
        } 
        else{
            for (element of optionsList){
                console.log(entry);
                console.log(element);
                const entryReg = new RegExp(`${entry}`);
                console.log(entryReg);
                const testedEntry = entryReg.test(element);
                console.log(testedEntry);
                if(testedEntry === false){
                    compareList.push(entry);
                }
            }
            console.log(compareList);
        }
        console.log(optionsList);

    }

    //     // add ingredient List in datalist
    //     const ingredientOption = `<option value="${recipesList[k[0]].ingredients[k[1]].ingredient}">`;
    //     ingredientDataList.insertAdjacentHTML('afterbegin', ingredientOption);
    // }

    //appliances
    // console.log(appliancesArray);
    // const appliancesDataList = document.querySelector('#appliancesData');
    // for(element of appliancesArray){
    //     // add appliances List in datalist
    //     const appliancesOption = `<option value="${recipesList[element].appliance}">`;
    //     appliancesDataList.insertAdjacentHTML('afterbegin', appliancesOption);
    // }
    // ustensils
    // console.log(ustensilsArray);
    // const ustensilsDataList = document.querySelector('#ustensilsData');
    // for(k of ustensilsArray){
    //     // add ustensils List in datalist
    //         const ustensilsOption = `<option value="${recipesList[k[0]].ustensils[k[1]]}">`;
    //         ustensilsDataList.insertAdjacentHTML('afterbegin', ustensilsOption);
    // }
}

const indexes = [1, 2, 3, 4, 5, 6];
const mainTag = document.querySelector("main");
let x = 0;

// add card card-decks
for(index of indexes){
    if(x%3 === 0 && x!==0){
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

// add cards to page
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
          ${ingIndex.ingredient} ${ingIndex.quantity ? `: `+ ingIndex.quantity : ingIndex.quantite ? `: `+ ingIndex.quantite : ''} ${ingIndex.unit ? ingIndex.unit : ''}            </p>
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

// add selection field