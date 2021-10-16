// trigger searchBar
function triggerSearch(){
    searchBar.addEventListener('input',(e)=> {
        // lauch on 3 characters
        if(e.target.value.length >= 3){

            const searchIds = ["name", "ingredients", "description"]
            
            for (id of searchIds){
                filterList(e.target.value, id, recipesList);
            }
            refreshDisplay(filteredArray, recipesList);

        }else if(e.target.value.length === 1 && e.key === 'Backspace'){
            resetInputs();
            resetDatas();
            addCards(filteredArray, recipesList);
        }
        e.stopPropagation();
    });
}

// trigger advanced searches
function triggerAdVSearch(){
    for(i = 0; i<advSearchTags.length; i++){
        (function advSearchClosure(){
            advSearchTags[i].addEventListener('input', (e)=>{
                if(filteredList[0] === undefined){
                    filterList(e.target.value, e.target.id, recipesList)
                    refreshDisplay(filteredArray, recipesList);
                    filterChoices(e.target.value, e.target.id)
                } else {
                    filterList(e.target.value, e.target.id, filteredList)
                    refreshDisplay(filteredArray, filteredList)
                    filterChoices(e.target.value, e.target.id)
                }
                e.stopPropagation();
            })
        })(i);
    }
}

// trigger customer choice
function triggerCustomerChoice(){
    const choicesList = document.querySelectorAll('.dropdown-item');
    for(choice of choicesList){
        choice.addEventListener('click', (e)=>{
            console.log(choice)
            // get parent name
            const classSplit = e.target.parentNode.className.split(' ');
            const parent = classSplit[0];
            appendCustomerChoice(parent, e.target.text);
            e.stopPropagation();
        });
    }
}

// hide dropdown if empty
function hideDropdown(){
    $('.dropdown').on('show.bs.dropdown', function(e) {
        $('.dropdown:target').cle
        if($('.dropdown-item').length == 0){
            $('.dropdown-menu').addClass('d-none');
        }else{
            $('.dropdown-menu').removeClass('d-none');
        }
    })
}

// focus on advance searches
function inputFocus(){
    $('.dropdown').on('shown.bs.dropdown', function(e) {
        e.target.children[0].children[0].focus();
    })
}

// close Tags
function closeTags(){
    const closeBtns = document.querySelectorAll('.fa-times-circle');
    for(closeBtn of closeBtns){
        closeBtn.addEventListener('click', (e)=>{
            e.target.parentNode.remove();
            refreshDisplay(filteredArray, filteredList);
            e.stopPropagation();
            // input search + tags append search engine
        })
    }
}