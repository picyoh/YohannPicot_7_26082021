
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
    addCustomerChoice();
}

function appendChoice(element, array){
    const customOption = `<a class="dropdown-item" href="#">${element}</a>`;
    array.insertAdjacentHTML('afterbegin', customOption)
}

function addCustomerChoice(){
    const choicesList = document.querySelectorAll('.dropdown-item');
    for(choice of choicesList){
        choice.addEventListener('click', (e)=>{
            e.stopPropagation();
            appendCustomerChoice(e.target.parentNode.id, e.target.text)
        });
    }
}

function appendCustomerChoice(parent, name){
    const choicesDiv = document.querySelector('#custumor-choices');
    const choiceTag =`
            <button type="button" class="${parent} col col-1 rounded border-0" aria-label="Close">
                ${name}    
                <i class="far fa-times-circle" aria-hidden="true"></i>
            </button>
    `;

    choicesDiv.insertAdjacentHTML('afterbegin', choiceTag);
    closeTags();
}

function closeTags(){
    const closeBtns = document.querySelectorAll('.fa-times-circle');
    for(closeBtn of closeBtns){
        closeBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            e.target.parentNode.remove();
        })
    }
}