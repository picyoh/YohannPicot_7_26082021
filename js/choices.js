
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

// apprend elements in choices list
function appendChoice(element, array){
    if(!checkDuplicata(element, array)){
        const customOption = `
        <a class="dropdown-item" href="#">${element}</a>
        `;
        array.insertAdjacentHTML('afterbegin', customOption)
    }
    addCustomerChoice()
}

// trigger customer choice
function addCustomerChoice(){
    const choicesList = document.querySelectorAll('.dropdown-item');
    for(choice of choicesList){
        choice.addEventListener('click', (e)=>{
            e.stopPropagation();
            appendCustomerChoice(e.target.parentNode.id, e.target.text)
        });
    }
}

// add tags with customer choice
function appendCustomerChoice(parent, name){
    const choicesDiv = document.querySelector('#custumor-choices');
    const choiceTag =`
            <button type="button" class="${parent} col col-1 rounded border-0" aria-label="Close">
                ${name}    
                <i class="far fa-times-circle" aria-hidden="true"></i>
            </button>
    `;

    choicesDiv.insertAdjacentHTML('afterbegin', choiceTag);
    searchEngine(name, recipesArray);
    closeTags();
}

// close Tags
function closeTags(){
    const closeBtns = document.querySelectorAll('.fa-times-circle');
    for(closeBtn of closeBtns){
        closeBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            e.target.parentNode.remove();
            resetData();
            addChoices(recipesArray);
            addCards(recipesArray);
        })
    }
}