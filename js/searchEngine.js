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
    // normalize input
    const inputValue = normalizeEntry(input);
    // set regex wth input value
    const inputReg = new RegExp(`(^|\\s)${inputValue}`);
    
    for (let i=0; i< list.length; i++){
        // double loop
        if (parentId === ("ingredients" || "ustensils")){
            for (let j = 0; j < list[i][parentId].length; j++){
                if(parentId === "ingredients"){
                    // ingredients
                    if (inputReg.test(normalizeEntry(list[i].ingredients[j].ingredient))){
                        filteredArray.push(i)
                    }
                }else if(parentId === "ustensils"){
                    // ustensils
                    if (inputReg.test(normalizeEntry(list[i].ustensils[j]))){
                        filteredArray.push(i)
                    }
                }
            }
        } else {
            // others
            if (inputReg.test(normalizeEntry(list[i][parentId]))){
                filteredArray.push(i)
            }
        }
    }
    // console.log(filteredArray)
}

function getResult(array, list){
    // reset choices col number
    n = 0;
    // reset list
    filteredList = [];
    // reset data Arrays
    ingredientsArray = [];
    appliancesArray = [];
    ustensilsArray = [];

    for(element of array){
        const listIndex = list[element];
        // cards
        if(!filteredList.includes(listIndex)){
            filteredList.push(listIndex);
        }

        // apliances
        const applianceEl = listIndex.appliance;
        if(!checkDuplicata(applianceEl, appliancesArray)){
            appliancesArray.push(applianceEl);
            appendChoice(applianceEl, appliancesDataTag);
        }    

        // ingredients
        const ingredientsLoopLength = listIndex.ingredients.length;
        for (let j=0; j < ingredientsLoopLength; j++){
            const ingredientEl = listIndex.ingredients[j].ingredient;
            if(!checkDuplicata(ingredientEl, ingredientsArray)){
                ingredientsArray.push(ingredientEl);
                appendChoice(ingredientEl, ingredientsDataTag);
            }
        }

        // ustensils
        for (let j=0; j < listIndex.ustensils.length; j++){
            // ustensils
            const ustensilEl = listIndex.ustensils[j];
            if(!checkDuplicata(ustensilEl, ustensilsArray)){
                ustensilsArray.push(ustensilEl);
                appendChoice(ustensilEl, ustensilsDataTag);
            }
        }
    }    
    console.log(filteredList);
    console.log(ingredientsArray);
    console.log(appliancesArray);
    console.log(ustensilsArray);
    
    // reset filtered indexes
    addCards(filteredList);
    filteredArray = [];
}

function filterChoices(input, parentId){
    let targetArray;
    let targetTag;

    if (parentId === "ingredients"){
        targetArray = ingredientsArray;
        targetTag = ingredientsDataTag;
    }else if(parentId === "appliances"){
        targetArray = appliancesArray;
        targetTag = appliancesDataTag;
    }else if(parentId === "ustensils"){
        targetArray = ustensilsArray;
        targetTag = ustensilsDataTag;
    }

    resetDataList();
    // reset col numbers
    n = 0;
    // normalize input
    const inputValue = normalizeEntry(input);
    // set regex wth input value
    const inputReg = new RegExp(`(^|\\s)${inputValue}`);

    for(let i = targetArray.length -1; i >= 0; i--){
        if (inputReg.test(normalizeEntry(targetArray[i]))){
            appendChoice(targetArray[i], targetTag);
            inputFocus();
        }else{
            targetArray.splice(i, 1)
        }
    }
}


