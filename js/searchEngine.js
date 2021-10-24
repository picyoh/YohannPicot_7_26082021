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
        for (element of array){
            const normEl = normalizeEntry(element);
            const tested = resultReg.test(normEl);
            if(tested === true){
                return tested;   
            }
        }
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
    for (let i=listLength; i >= 0; i--){
        // double loop
        let validIndex = false;
        if (parentId === ("ingredients" || "ustensils")){
            for (let j = 0; j < list[i][parentId].length; j++){
                if(parentId === "ingredients"){
                    const subList = list[i][parentId][j]
                    // ingredients
                    if (inputReg.test(normalizeEntry(subList.ingredient))){
                        validateEntry(list[i])
                    }
                }else if(parentId === "ustensils"){
                    // ustensils
                    if (inputReg.test(normalizeEntry(subList))){
                        validateEntry(list[i])
                    }
                }
            }
        }else if(parentId === "ustensils"){
            const filteredEntry = list.forEach((recipe, index) => recipe[parentId]
            .forEach((ingList) => ingList)
                .filter((data) => {
                if(inputReg.test(normalizeEntry(data))){
                    return filteredArray.push(index)
                }
            }))
        } else {
            // others
            if (inputReg.test(normalizeEntry(list[i][parentId]))){
                validateEntry(list[i])
                }
            }
        if(!validIndex && (parentId === 'ingredients' || parentId === 'appliances'|| parentId === 'ustensils')){
            if(filteredList.indexOf(list[i]) >= 0){
                // console.log(list[i]);
                removeList.push(i)
                
            }
        }
    }
    removeFromList(removeList)
    // console.log(filteredList)
}

function validateEntry(recipe){
    validIndex = true
    // console.log(list[i])
    if(filteredList.indexOf(recipe) === -1){
        filteredList.push(recipe)
    }
}

function removeFromList(list){
    for(index of list){
        filteredList.splice(index, 1)
    }
}

function appendAdv(list){
    // reset choices col number
    n = 0;
    // reset data Arrays
    ingredientsArray = [];
    appliancesArray = [];
    ustensilsArray = [];

    for(element of list){
        const listIndex = recipesList[element.id -1];

        // apliances
        const applianceEl = listIndex.appliance;
        if(!checkDuplicata(applianceEl, appliancesArray)){
            appliancesArray.push(applianceEl);
            appendChoice(applianceEl, appliancesDataTag);
        }    

        // ingredients
        
        listIndex.ingredients.forEach(element => {
            if(!checkDuplicata(element.ingredient, ingredientsArray)){
                ingredientsArray.push(element.ingredient);
                appendChoice(element.ingredient, ingredientsDataTag);
            }
        })
        
        // ustensils
        listIndex.ustensils.forEach(element => {
            if(!checkDuplicata(element, ustensilsArray)){
                ustensilsArray.push(element);
                appendChoice(element, ustensilsDataTag);
            }
        })
    }    
}


