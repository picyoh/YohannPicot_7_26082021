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
}

// add tags with customer choice
function appendCustomerChoice(name, parentId){
    const choicesDiv = document.querySelector('#custumor-choices');
    const choiceTag =`
            <button type="button" class="${parentId} btn tags rounded border-0" aria-label="Close">${name}<i class="far fa-times-circle" aria-hidden="true"></i></button>
    `;

    choicesDiv.insertAdjacentHTML('afterbegin', choiceTag);
    // filterList(name, parentId, filteredList);
    // refreshDisplay(filteredList);
    closeTags();
}

function filterChoices(input){

    // normalize input
    const inputValue = normalizeEntry(input);
    // set regex wth input value
    const inputReg = new RegExp(`(^|\\s)${inputValue}`);

    const ddItems = $('.dropdown-item')
    const ddMax = ddItems.length -1
    for(i = ddMax; i >= 0; i--){
        if (inputReg.test(normalizeEntry(ddItems[i].textContent))){
            ddItems[i].parentNode.removeChild(ddItems[i])
        }
    }
}
