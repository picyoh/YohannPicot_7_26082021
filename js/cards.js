function addCards(array){
    // add cards to page
    
    let indexes=[];

    if(array.length > 6){
        randomIndexes(indexes, array.length);
    }
    else {
        for(i=0; i<array.length; i++){
            if(typeof array[i] !== 'string'){
                indexes.push(i)
            }
        }
    }
    console.log(indexes);
    // add a card deck to sorting cards by 3
    let x = 0;
    let namesArray = [];
    for(index of indexes){

        console.log(recipesArray[array[index][0][0]].name)
        if(!namesArray.includes(recipesArray[array[index][0][0]].name)){
            namesArray.push(recipesArray[array[index][0][0]].name);
        }else{
            index = index + 20;
            namesArray.push(recipesArray[array[index][0][0]].name);
        }
        console.log(namesArray);

        if(x%3 == 0 && x!==0){
            const deckSup = `
            <div class="card-deck">
            </div>
            `;
            
            mainTag.insertAdjacentHTML('beforeend', deckSup);
            appendCards(array[index][0][0]);
            x=0;
        }
        else{
            appendCards(array[index][0][0]);
        }
        x++;
    }  
}

function randomIndexes(indexes, max){
    while(indexes.length < 6){
        let randomIndex = Math.floor(Math.random() * (max - 1));
        if( randomIndex%2 !== 0 && (!indexes.includes(randomIndex))){
            indexes.push(randomIndex);
        }

    }
    return indexes;
}

function appendCards(index){
    const cardsDecks = document.querySelectorAll(".card-deck");
    const cardsDeck = cardsDecks[cardsDecks.length - 1];

    const cardsPattern = `
    <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
          <h6 class="card-title">${recipesArray[index].name}</h5>
          <p id="time" class="card-text"><i class="far fa-clock"></i>${recipesArray[index].time}</p>
          ${recipesArray[index].ingredients.map(ingIndex =>
            `
          <p id="ingredientText" class="card-text">
          ${ingIndex.ingredient} ${ingIndex.quantity ? `: `+ ingIndex.quantity : ingIndex.quantite ? `: ` + ingIndex.quantite : ''} ${ingIndex.unit ? ingIndex.unit : ''}            </p>
          `
            ).join('')}
          <p id="ingredientText" class="card-text"></p>
          <p id="description" class="card-text">${recipesArray[index].description}</p>
        </div>
    </div>
    `;
    cardsDeck.insertAdjacentHTML('beforeend', cardsPattern);
    }