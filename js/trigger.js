// trigger searchBar
function triggerSearch(){
    searchBar.addEventListener('change',(e)=> {
        // lauch on 3 characters
        if(e.target.value.length >= 3){
            basicSearch(e.target.value)
            
        }else if(e.target.value.length === 0){
            resetInputs()
            resetDatas()
            addCards(recipesList)
        }
        e.stopPropagation()
    })
}

// trigger advanced searches
function triggerAdVSearch(){
    const advSLength = advSearchTags.length
    for(i = 0; i<advSLength; i++){
        advSearchTags[i].addEventListener('input', (e)=>{
            e.target.parentNode.click()
            e.target.parentNode.click()
            if(filteredList[0] === undefined){
                advSearch(e.target.value, e.target.id, recipesList)
            } else {
                advSearch(e.target.value, e.target.id, filteredList)
            }
            e.stopPropagation()
        })
    } 
}

// trigger customer choice
function triggerCustomerChoice(){
    const choicesList = document.querySelectorAll('.dropdown-menu')
    const choiceListLength = choicesList.length
    for(let i=0; i < choiceListLength; i++){
            choicesList[i].addEventListener('click', (e)=>{
                // get parent name
                const parentId = choicesList[i].className.split(' ')[0]
                customSearch(e.target.text, parentId, filteredList)
            })
    }
}


// close Tags
function closeTags(){
    const closeBtns = document.querySelectorAll('.fa-times-circle')
    for(closeBtn of closeBtns){
        closeBtn.addEventListener('click', (e)=>{
            const btn = e.target.parentNode
            const parentId = btn.className.split(' ')[0]
            btn.remove()
            listInputs()
        
            if(inputsList > 0){
                for(input of inputsList){
                    console.log(input)
                    filterList(input, parentId, filteredList)
                }
            }else{
                filterList(searchBar.value, parentId, recipesList)
            }

            refreshDisplay(filteredList)
            listInputs()
            e.stopPropagation()
        })
    }
}
