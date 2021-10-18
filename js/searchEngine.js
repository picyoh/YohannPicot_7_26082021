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

        // double loop
        if(parentId === "ingredients"){
            const filteredEntry = list.map((recipe, index) => recipe[parentId]
                .map((ingList) => ingList.ingredient)
                .filter((data) => {
                if(inputReg.test(normalizeEntry(data))){
                    return filteredArray.push(index)
                }
            }))
        }else if(parentId === "ustensils"){
            const filteredEntry = list.map((recipe, index) => recipe[parentId]
            .map((ingList) => ingList)
                .filter((data) => {
                if(inputReg.test(normalizeEntry(data))){
                    return filteredArray.push(index)
                }
            }))
        } else {
            // others
            const filteredEntry = list.map(recipe => recipe[parentId])
            .filter((data, index) => {
                if(inputReg.test(normalizeEntry(data))){
                    return filteredArray.push(index)
                }
            })
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

    array.map(element => list[element])
    .filter(data => {
        // cards
        if(!filteredList.includes(data)){
            filteredList.push(data);
        }
        
        // appliances
        if(!checkDuplicata(data.appliance, appliancesArray)){
            appliancesArray.push(data.appliance);
            appendChoice(data.appliance, appliancesDataTag);
        }

        // ingredients
        data.ingredients.map(element => {
            if(!checkDuplicata(element.ingredient, ingredientsArray)){
                ingredientsArray.push(element.ingredient);
                appendChoice(element.ingredient, ingredientsDataTag);
            }
        })
        
        // ustensils
        data.ustensils.map(element => {
            if(!checkDuplicata(element, ustensilsArray)){
                ustensilsArray.push(element);
                appendChoice(element, ustensilsDataTag);
            }
        })
    })
  
    // console.log(filteredList);
    // console.log(ingredientsArray);
    // console.log(appliancesArray);
    // console.log(ustensilsArray);
    
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

    targetArray.forEach((element, i) => {
        if (inputReg.test(normalizeEntry(element))){
            appendChoice(element, targetTag);
            inputFocus();
        }else{
            targetArray.splice(i, 1)
        }
    });
}


