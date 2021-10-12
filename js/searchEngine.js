// search engine
function searchEngine(input, parentRef){
    
    // create filtered entries array
    const filteredArray = [];
    // normalize input
    let inputValue = normalizeEntry(input);

        // set regex wth input value
        const inputReg = new RegExp(`(^|\\s)${inputValue}`);
        console.log(inputReg);

        for (i=0; i< array.length; i++){
            
            const parent = parentRef.key;

            if (parent = ingedients || ustensils){
                for (let j = 0; j < recipesList[i].parent.length; j++){
                    if (inputReg.test(normalizeEntry(recipesList[i].parentRef.value))){
                        filteredArray.push(i, j, )
                    }
                }
            } else {
                if (inputReg.test(normalizeEntry(recipesList[i].parentRef.value))){

                }
            }
            // description 
        }
        resetData();
        console.log(filteredArray)
        getResult(filteredArray);
}

function getResult(array){
    const cardsArray = [];

    for(element of array){
        const i = element[0];
        const j = element[1];
        const array = element[2];
        console.log(array)
        // choices
        if(array.id === 'ingredients'){
            console.log(recipesArray[i].ingredients[j].ingredient)
            appendChoice(recipesArray[i].ingredients[j].ingredient, array);
        }
        if(array.id === 'appliances'){
            console.log(recipesArray[i].appliance)
            appendChoice(recipesArray[i].appliance, array);
        }
        if(array.id === 'ustensils'){
            console.log(recipesArray[i].ustensils[j])
            appendChoice(recipesArray[i].ustensils[j], array);
        }
        // cards
        if(!cardsArray.includes(recipesArray[i]))
        cardsArray.push(recipesArray[i]);
    }
    console.log(cardsArray)
    addCards(cardsArray);
}



