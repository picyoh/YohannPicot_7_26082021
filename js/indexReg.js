// reset on refresh
let inputs = document.querySelectorAll('input');

window.onload = function(){
    for(input of inputs){
        input.value = '';
    }
    searchEngine();
}

// get recipes
const recipesList = recipes;

function toLowerNormalize(result){
    let lowerResult = result.toLowerCase();
    let accentLessResult = lowerResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return accentLessResult;
}

// search engine
function searchEngine(){
    for(input of inputs){
        input.addEventListener('click', (e)=> {
            
            // get input name
            let inputName = e.target.id;
            e.target.addEventListener('keyup', (e)=> {
                if(inputName == 'search'){
                     // create result array
                let ingredientsArray = [];
                let appliancesArray = [];
                let ustensilsArray = [];
                    if (e.target.value !== '' && e.target !== undefined){
                        // set regex wth input value
                        let inputReg = new RegExp(`(^|\s)${e.target.value}`);
                        console.log(inputReg);
    
                        for (i=0; i< recipesList.length; i++){
                            // ingredients
                            let ingredientsLists = recipesList[i].ingredients;
                            
                            for (j=0; j< ingredientsLists.length; j++){
                                // ingredient
                                let ingredient = ingredientsLists[j].ingredient;
                                // normalize
                                let normalizedIngredient = toLowerNormalize(ingredient);
                                // test
                                if (inputReg.test(normalizedIngredient)){
                                    let k = [i,j];
                                    if(!ingredientsArray.includes(k)){
                                            ingredientsArray.push(k);
                                    }
                                }
                            }
                            
                            // appliances
                            let appliance = recipesList[i].appliance;
                            // normalize
                            let normalizedAppliance = toLowerNormalize(appliance);
                            // test
                            if (inputReg.test(normalizedAppliance)){
                                if(!appliancesArray.includes(i)){
                                    appliancesArray.push(i);
                                }
                            }
            
                            // ustensils
                            let ustensilsList = recipesList[i].ustensils;
                            // ustensil
                            for(j=0; j<ustensilsList.length; j++){
                                // normalize
                                let normalizedUstensil = toLowerNormalize(ustensilsList[j]);
                                // test
                                if (inputReg.test(normalizedUstensil)){
                                    let k = [i,j];
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
    let ingredientDataList= document.querySelector('#ingredientsData');
    let optionsList= [];

    for (i=0; i< ingredientsArray.length; i++){
        let k= ingredientsArray[i];

        let entry = recipesList[k[0]].ingredients[k[1]].ingredient;
        console.log(entry);

        if(i==0){
            optionsList.push(entry);
        } 
        else{
            // for(j= 0; j<optionsList.length; j++){
            //     console.log(optionsList[j]);

            //     let entryReg = new RegExp(`${entry}`);
            //     let matching = optionsList[j].match(entryReg);
            //     console.log(matching);
            //     if(!optionsList[j].match(entry)){
            //         optionsList.push(entry);
            //     }
            // }
        }
        
        // console.log(optionsList);

    }
    //     for(element of optionsList){
    //         console.log('ok');
    //         let matching = element.match(entry);
    //         console.log(matching)
    //         if(!element.match(entry)){
    //             optionsList.push(entry);
    //         }
    //     }
    //     console.log(optionsList)
    //     // add ingredient List in datalist
    //     const ingredientOption = `<option value="${recipesList[k[0]].ingredients[k[1]].ingredient}">`;
    //     ingredientDataList.insertAdjacentHTML('afterbegin', ingredientOption);
    // }

    //appliances
    // console.log(appliancesArray);
    // let appliancesDataList = document.querySelector('#appliancesData');
    // for(element of appliancesArray){
    //     // add appliances List in datalist
    //     const appliancesOption = `<option value="${recipesList[element].appliance}">`;
    //     appliancesDataList.insertAdjacentHTML('afterbegin', appliancesOption);
    // }

    // ustensils
    // console.log(ustensilsArray);
    // let ustensilsDataList = document.querySelector('#ustensilsData');
    // for(k of ustensilsArray){
    //     // add ustensils List in datalist
    //         const ustensilsOption = `<option value="${recipesList[k[0]].ustensils[k[1]]}">`;
    //         ustensilsDataList.insertAdjacentHTML('afterbegin', ustensilsOption);
    // }
}


let indexes = [1, 2, 3, 4, 5, 6];
let mainTag = document.querySelector("main");
let x = 0;

// add card card-decks
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

// add cards to page
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