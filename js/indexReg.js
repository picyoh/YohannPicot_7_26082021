// get recipes
const recipesList = recipes;

function toLowerNormalize(result){
    let lowerResult = result.toLowerCase();
    let accentLessResult = lowerResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return accentLessResult;
}

// search engine

let inputs = document.querySelectorAll('input');
for(input of inputs){
    input.addEventListener('click', (e)=> {
        
        // get input name
        let inputName = e.target.id;
        e.target.addEventListener('keyup', (e)=> {
            // create result array
            let resultArray = [];
            
            if(inputName == 'search'){
                if (e.target.value !== ''){
                    // get input value
                    let inputReg = new RegExp(`${e.target.value}`,"gi");
                    // set regex wth input value
                    for (i=0; i< recipesList.length; i++){
                        // ingredients
                        let ingredientsLists = recipesList[i].ingredients;
                        
                        for (ingredientsList of ingredientsLists){
                            // ingredient
                            let ingredient = ingredientsList.ingredient;
                            // normalize
                            let normalizedIngredient = toLowerNormalize(ingredient);
                            // test
                            if (inputReg.test(normalizedIngredient)){
                                if(!resultArray.includes(i)){
                                    resultArray.push(i);
                                }
                            }
                        }
                        
                        // appliances
                        let appliance = recipesList[i].appliance;
                        // normalize
                        let normalizedAppliance = toLowerNormalize(appliance);
                        // test
                        if (inputReg.test(normalizedAppliance)){
                            if(!resultArray.includes(i)){
                                resultArray.push(i);
                            }
                        }
        
                        // ustensils
                        let ustensilsList = recipesList[i].ustensils;
                        // ustensil
                        for(ustensil of ustensilsList){
                            // normalize
                            let normalizedUstensil = toLowerNormalize(ustensil);
                            // test
                            if (inputReg.test(normalizedUstensil)){
                                if(!resultArray.includes(i)){
                                    resultArray.push(i);
                                }
                            }
                        }
                    }
                }
                
            }
            console.log(resultArray);
        });
    });
}

// append choices

// append cards

// ${this.tags.map(tag => `
//             <li class="tags__border">
//                 <a class="tags__border__text">#${tag}</a>
//             </li>

let indexes = [1, 2, 3, 4, 5, 6];
let cardsDeck = document.querySelector(".card-deck");

for( index of indexes){
    addCards(index);
}

function addCards(index){

    const cardsPattern = `
    <div class="card">
                <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${recipesList[index].name}</h5>
                  <p id="time" class="card-text"><i class="far fa-clock"></i>${recipesList[index].time}</p>
                  ${recipesList[index].ingredients.map(ingIndex =>
                    `
                  <p id="ingredientText" class="card-text">
                    ${ingIndex.ingredient} : ${ingIndex.quantity}
                    </p>
                  `
                    )}
                  <p id="ingredientText" class="card-text"></p>
                  <p id="description" class="card-text">${recipesList[index].description}</p>
                </div>
              </div>
    `;
    cardsDeck.insertAdjacentHTML('beforeend', cardsPattern);
}