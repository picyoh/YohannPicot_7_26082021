// search engine

// normalize
function normalizeEntry(entry){
    // remove punctuation
    const ponctlessResult = entry.replace(/[.,\/#!$\^&\*;:{}=\-_`~()]/g,"");
    // remove accents
    const accentLessResult = ponctlessResult.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    // replace Capitals
    const normalizedResult = accentLessResult.toLowerCase();
    return normalizedResult;
}

// remove duplicates entries
function checkDuplicata(result, array){
    const normalizedCheck = normalizeEntry(result);
    const resultLength = result.length;

    const resultperc = parseInt(resultLength * 0.85);
    const resultTest = normalizedCheck.slice(0, resultperc);
    const resultReg = new RegExp(`${resultTest}`,'g');

    if(array[0] === undefined){
        return false;
    }else{
        array.forEach(element => {
            const normEl = normalizeEntry(element);
            const tested = resultReg.test(normEl);
            if(tested === true){
                return tested;   
            }
        })
    }
}

function filterList(input, parentId, list){
    // console.log(input, list)
    const removeList = []
    // normalize input
    const inputValue = normalizeEntry(input);
    // set regex wth input value
    const inputReg = new RegExp(`(^|\\s)${inputValue}`);

    const listLength  = list.length -1
    
    list.forEach((listIndex, index) =>{
        // console.log(listIndex, index)
        // double loop
        let validIndex = false;
        if (parentId === "ingredients" || parentId === "ustensils"){
            listIndex[parentId].forEach(subList => {
                if(parentId === "ingredients"){
                    // ingredients
                    if (inputReg.test(normalizeEntry(subList.ingredient))){
                        validIndex = true
                        validateEntry(listIndex)
                    }
                }else if(parentId === "ustensils"){
                    // ustensils
                    if (inputReg.test(normalizeEntry(subList))){
                        validIndex = true
                        validateEntry(listIndex)
                    }
                }
            })
        } else {
            // others
            if (inputReg.test(normalizeEntry(listIndex[parentId]))){
                validIndex = true
                validateEntry(listIndex)
                }
            }
        if(!validIndex && (parentId === 'ingredients' || parentId === 'appliances'|| parentId === 'ustensils')){
            if(filteredList.indexOf(listIndex) >= 0){
                // console.log(list[i]);
                removeList.push(index)
                
            }
        }
    })
    removeFromList(removeList)
    // console.log(filteredList)
}

function validateEntry(recipe){

    // console.log(list[i])
    if(filteredList.indexOf(recipe) === -1){
        filteredList.push(recipe)
    }
}

function removeFromList(list){
    list.forEach(index => filteredList.splice(index, 1))
}

function appendAdv(list){
    console.log(list)
    // reset choices col number
    n = 0;
    // reset data Arrays
    ingredientsArray = [];
    appliancesArray = [];
    ustensilsArray = [];

    list.forEach(element =>{
        const listIndex = recipesList[element.id -1];

        // apliances
        const applianceEl = listIndex.appliance;
        if(!checkDuplicata(applianceEl, appliancesArray)){
            appliancesArray.push(applianceEl);
            appendChoice(applianceEl, appliancesDataTag);
        }    

        // ingredients
        listIndex.ingredients.forEach(subList =>{
            const ingredientEl = subList.ingredient;
            if(!checkDuplicata(ingredientEl, ingredientsArray)){
                ingredientsArray.push(ingredientEl);
                appendChoice(ingredientEl, ingredientsDataTag);
            }
        })

        // ustensils
        listIndex.ustensils.forEach(subList => {
            const ustensilEl = subList;
            if(!checkDuplicata(ustensilEl, ustensilsArray)){
                ustensilsArray.push(ustensilEl);
                appendChoice(ustensilEl, ustensilsDataTag);
            }
        })
    })
  
}


