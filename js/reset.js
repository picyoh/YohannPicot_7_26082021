function resetDataList(){
    // reset dataList
    for (element of dropdownMenu){
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
        // append first card-deck
        const firstCol = document.createElement('div');
        firstCol.className = 'col datacol';
        element.append(firstCol);
    }
}

function resetDatas(){
    resetDataList()
    // reset cards
    while (mainTag.firstChild){
        mainTag.removeChild(mainTag.firstChild);
    }

    // append first card-deck
    const firstCardDeck = document.createElement('div');
    firstCardDeck.className = 'card-deck';
    mainTag.append(firstCardDeck);

}

// reset Inputs
function resetInputs(){
    for(input of inputs){
        input.value = '';
    }
}
