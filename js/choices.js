
// add choices to inputs

function addChoices(array){
    for(i = 0; i < array.length; i++){
        if(typeof array[i] !== 'string'){
            

            if(array[i][0][1] !== null){
                const ingredientsData = recipesArray[array[i][0][0]].ingredients[array[i][0][1]].ingredient;
                appendChoice(ingredientsData, ingredientsDataArray);
            }
            
            if(array[i][0][2] !== null){
                const ustensilsData = recipesArray[array[i][0][0]].ustensils[array[i][0][2]];
                appendChoice(ustensilsData, ustensilsDataArray);
            }

            if(array[i][0][1] == null && array[i][0][2] == null){
                const appliancesData = recipesArray[array[i][0][0]].appliance;
                appendChoice(appliancesData, appliancesDataArray);
            }

        }
    }
}

function appendChoice(element, array){
    const customOption = `<option value="${element}">`;
    array.insertAdjacentHTML('afterbegin', customOption)
}

function addCustomerChoice(){
    const optionData = document.querySelectorAll('option');
    console.log(optionData);
}
