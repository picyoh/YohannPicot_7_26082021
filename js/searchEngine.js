
// search engine
function searchEngine(filteredArray, input){

    // filteredArrayen to keyboards
    input.addEventListener('keyup',(e)=> {
        e.stopPropagation();
        
        const CharsIndexArray = [];
        console.log(e.keyCode)
        if(input.value.length >= 3){
            input.value
            const charsNumber = input.value.length;
            
            for (i=0; i<filteredArray.length; i++){
                const currentEntry = typeof filteredArray[i];
                // checking for type string
                if(currentEntry === "string"){
                    const slicedString = filteredArray[i].slice(0, charsNumber);
                    // compare
                    if(slicedString === input.value){
                        CharsIndexArray.push(i);
                    }
                }
            }
            resetDataList();
            resetCards();
            getResults(filteredArray, CharsIndexArray);
        }
    });
}

function getResults(filteredArray, CharsIndexArray){
    // create array of results indexes
    const resultsArray = [];
    
    for(results of CharsIndexArray){
        const resultName = filteredArray[results];
        const recipesIndex = filteredArray[results +1];

        if(!resultsArray.includes(resultName)){
            resultsArray.push(resultName);
            resultsArray.push(recipesIndex);
        }else if(resultsArray.includes(resultName)){
            const actualIndex = resultsArray.findIndex(element => element === resultName);
            console.log(resultsArray.findIndex(element => element === resultName))
            resultsArray[actualIndex].push(recipesIndex);
        }
    }
    addChoices(resultsArray);
    addCards(resultsArray);
}


