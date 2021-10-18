// trigger searchBar
function triggerSearch(){
    searchBar.addEventListener('input',(e)=> {
        // lauch on 3 characters
        if(e.target.value.length >= 3){

            const searchIds = ["name", "ingredients", "description"]
            
            searchIds.forEach(id => filterList(e.target.value, id, recipesList))
            refreshDisplay(filteredArray, recipesList);
            triggerCustomerChoice();
        }else if(e.target.value.length === 0){
            resetInputs();
            resetDatas();
            addCards(recipesList);
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
                    triggerCustomerChoice();
                } else {
                    filterList(e.target.value, e.target.id, filteredList)
                    refreshDisplay(filteredArray, filteredList)
                    filterChoices(e.target.value, e.target.id)
                    triggerCustomerChoice();
                }
                e.stopPropagation();
            })
        })(i);
    }
}

// trigger customer choice
function triggerCustomerChoice(){
    const choicesList = document.querySelectorAll('.dropdown-item');
    for(let i=0; i<choicesList.length; i++){
        (function(index){
            choicesList[i].addEventListener('click', (e)=>{
                // get parent name
                const classSplit = e.target.parentNode.parentNode.className.split(' ');
                const parent = classSplit[0];
                appendCustomerChoice(parent, e.target.text);
            })
        }(i));
    }
}

// hide dropdown if empty
function hideDropdown(){
    $('.dropdown').on('show.bs.dropdown',function(e) {
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

function changeArrow(){
    $('.dropdown').on('show.bs.dropdown', function(e) {
        e.target.children[0].children[3].className = "fas fa-angle-up";

    })

    $('.dropdown').on('hide.bs.dropdown', function(e) {
        e.target.children[0].children[3].className = "fas fa-angle-down";

    })
}

// close Tags
function closeTags(){
    const closeBtns = document.querySelectorAll('.fa-times-circle');
    
    closeBtns.forEach(closeBtn =>{
        closeBtn.addEventListener('click', (e)=>{
            e.target.parentNode.remove();
            console.log(filteredArray, filteredList);
            refreshDisplay(filteredArray, filteredList);
            e.stopPropagation();
        })
    })
}