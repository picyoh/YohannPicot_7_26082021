// apprend elements in choices list
function appendChoice(element, dataTag){
    if(n%10 == 0 && n!==0){
        const colSup = `
        <div class="col datacol">
            <a class="dropdown-item row">${element}</a>
        </div>
        `;
        
        dataTag.insertAdjacentHTML('beforeend', colSup);
        n = 0;
    }
    else{
        const datacols = dataTag.children;
        const datacol = datacols[datacols.length - 1];
        const customOption = `
        <a class="dropdown-item row">${element}</a>
        `;
        datacol.insertAdjacentHTML('afterbegin', customOption)
    }
    n++;
    triggerCustomerChoice();
}

// add tags with customer choice
function appendCustomerChoice(parent, name){
    const choicesDiv = document.querySelector('#custumor-choices');
    const choiceTag =`
            <button type="button" class="${parent} btn rounded border-0" aria-label="Close">
                ${name}    
                <i class="far fa-times-circle" aria-hidden="true"></i>
            </button>
    `;

    choicesDiv.insertAdjacentHTML('afterbegin', choiceTag);
    filterList(name, parent, filteredList);
    refreshDisplay(filteredArray, filteredList);
    closeTags();
}
