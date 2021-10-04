
// add choices to inputs

function addChoices(array){
    for(i = 0; i < array.length; i++){
        // ingredients
        const ingredientsList = recipesArray[i].ingredients;
        for (j=0; j< ingredientsList.length; j++){
            const actualIngredient = ingredientsList[j].ingredient;
            appendChoice(actualIngredient, ingredientsDataArray);           
        }        
        // appliances
        const actualApplicance = recipesArray[i].appliance;
        appendChoice(actualApplicance, appliancesDataArray);

        // ustensils
        const ustensilsList = recipesArray[i].ustensils;
        for(k=0; k<ustensilsList.length; k++){
            const actualUstensil = ustensilsList[k];
            appendChoice(actualUstensil, ustensilsDataArray)
        }
    }
}

function appendChoice(element, array){
    const customOption = `<a class="dropdown-item" href="#">${element}</a>`;
    array.insertAdjacentHTML('afterbegin', customOption)
}

function addCustomerChoice(){
    const optionData = document.querySelectorAll('option');
    console.log(optionData);
}
