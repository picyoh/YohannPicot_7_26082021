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
            index = index + 10;
            namesArray.push(recipesArray[array[index][0][0]].name);
        }
        console.log(namesArray);

        if(x%3 == 0 && x!==0){
            const deckSup = `
            <div class="row">
              <div class="col">
                <div class="card-deck my-3">

                </div>
              </div>
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
        <img class="card-img-top bg-secondary" style="height: 302px" src="..." alt="">
        <div class="card-body d-flex flex-column overflow-hidden" style="height: 302px; overflow:hidden; text-overflow: ellipsis" >
            <h5 class="card-title d-flex">${recipesArray[index].name}<i class="far fa-clock ml-auto"><strong>${recipesArray[index].time}min</strong></i></h5>
            <div class="row">
                <div class="col-6">
                ${recipesArray[index].ingredients.map(ingIndex =>
                  `
                <p id="ingredientText" class="card-text p-0 m-0">
                <strong>${ingIndex.ingredient}</strong> ${ingIndex.quantity ? `: `+ ingIndex.quantity : ingIndex.quantite ? `: ` + ingIndex.quantite : ''} ${ingIndex.unit ? ingIndex.unit : ''}            </p>
                `
                  ).join('')}
                </div>
                <div class="col-6 ml-auto" >
                <p id="description" class="card-text">${recipesArray[index].description}</p>
                </div>
            </div>
        </div>
    </div>
    
    `;
    cardsDeck.insertAdjacentHTML('beforeend', cardsPattern);
    }