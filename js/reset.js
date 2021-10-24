function resetDataList(){
    // reset dataList
    dropdownMenu.forEach(element => {
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
        // append first card-deck
        const firstCol = document.createElement('div');
        firstCol.className = 'col datacol';
        element.append(firstCol);
    })
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
    inputs.forEach(input => {
        input.value = '';
    })
}
