// search engine
function searchEngine(input, array){
    // create filtered entries array
    const filteredArray = [];
    // normalize input
    let inputValue = normalizeEntry(input);

        // set regex wth input value
        const inputReg = new RegExp(`(^|\\s)${inputValue}`);
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
            // description 
        }
        resetData();
        console.log(filteredArray)
        getResult(filteredArray);
}

function getResult(array){
    const cardsArray = [];

    for(element of array){
        const i = element[0];
        const j = element[1];
        const array = element[2];
        console.log(array)
        // choices
        if(array.id === 'ingredients'){
            console.log(recipesArray[i].ingredients[j].ingredient)
            appendChoice(recipesArray[i].ingredients[j].ingredient, array);
        }
        if(array.id === 'appliances'){
            console.log(recipesArray[i].appliance)
            appendChoice(recipesArray[i].appliance, array);
        }
        if(array.id === 'ustensils'){
            console.log(recipesArray[i].ustensils[j])
            appendChoice(recipesArray[i].ustensils[j], array);
        }
        // cards
        if(!cardsArray.includes(recipesArray[i]))
        cardsArray.push(recipesArray[i]);
    }
    console.log(cardsArray)
    addCards(cardsArray);
}



