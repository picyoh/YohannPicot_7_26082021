// search engine
function sortEngine(array, input){
    // array to keyboards
    input.addEventListener('keyup',(e)=> {
        e.stopPropagation();
        // create filtered entries array
        const filteredArray = [];
        // normalize input
        let inputValue = normalizeEntry(input.value);
 
        
        if(inputValue.length >= 3){
            // set regex wth input value
            const inputReg = new RegExp(`(^|\\s)${e.target.value}`);
            console.log(inputReg);

            for (i=0; i< array.length; i++){
                // ingredients
                const ingredientsLists = array[i].ingredients;
                
                for (j=0; j< ingredientsLists.length; j++){
                    const actualIngredient = ingredientsLists[j].ingredient;
                    const normalizedEntry = normalizeEntry(actualIngredient);
                    // test
                    if (inputReg.test(normalizedEntry)){
                        filteredArray.push([i, j, ingredientsDataArray])
                    }
                }
                
                // appliances
                const actualAppliance = recipesArray[i].appliance;
                const normalizedEntry = normalizeEntry(actualAppliance);
                // entryFilter(i, null, null, actualApplicance);
                // test
                if (inputReg.test(normalizedEntry)){
                    filteredArray.push([i, null, appliancesDataArray]);
                }

                // ustensils
                const ustensilsList = array[i].ustensils;
                // ustensil
                for(k=0; k<ustensilsList.length; k++){
                    // normalize
                    const normalizedEntry = normalizeEntry(ustensilsList[k]);
                    // test
                    if (inputReg.test(normalizedEntry)){
                        filteredArray.push([i, k, ustensilsDataArray]);
                    }
                }
            }
            resetDataList();
            resetCards();
            getResult(filteredArray);
        }else if(inputValue === ''){
            resetInputs();
            resetCards();
            resetDataList();
            addChoices(recipesArray);
            addCards(recipesArray);
        }
    });
}

function getResult(array){
    const cardsArray = []
    for(element of array){

        const i = element[0];
        const j = element[1];
        const array = element[2];
        // choices
        if(array.id === 'ingredientsData'){
            appendChoice(recipesArray[i].ingredients[j].ingredient, array);
        }
        if(array.id === 'appliancesData'){
            appendChoice(recipesArray[i].appliance, array);
        }
        if(array.id === 'ustensilsData'){
            appendChoice(recipesArray[i].ustensils[j], array);
        }
        // cards
        cardsArray.push(recipesArray[i]);
    }
    addCards(cardsArray);
}



