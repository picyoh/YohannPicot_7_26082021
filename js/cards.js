function addCards(list){
    // add cards to page
    let indexes=[];
    // randomize
    if(list.length > 6){
        while(indexes.length < 6){
            let randomIndex = Math.floor(Math.random() * (list.length - 1));
            if(!indexes.includes(list[randomIndex].id -1)){
                indexes.push(list[randomIndex].id -1);
            }
        }
    } else if(list.length === 0){
        noMatches()
    } else {
        for(i=0; i<list.length; i++){
            indexes.push(list[i].id -1)
        }
    }
    
    // console.log(indexes);
    // add a card deck to sorting cards by 3
    let x = 0;
    for(index of indexes){

        if(x%3 == 0 && x!==0){
            const deckSup = `
            <div class="row">
              <div class="col">
                <div class="card-deck my-3">

                </div>
              </div>
            </div>
            `;
            
            document.querySelector("main").insertAdjacentHTML('beforeend', deckSup);
            appendCards(index);
            x=0;
        }
        else{
            appendCards(index);
        }
        x++;
    }
}

function appendCards(index){
    const cardsDecks = document.querySelectorAll(".card-deck");
    const cardsDeck = cardsDecks[cardsDecks.length - 1];

    const cardsPattern = `
    <div class="card">
        <img class="card-img-top bg-secondary" style="height: 320px" src="..." alt="">
        <div class="card-body d-flex flex-column overflow-hidden" style="height: 320px; overflow:hidden; text-overflow: ellipsis" >
            <h5 class="card-title d-flex">${recipesList[index].name}<i class="far fa-clock ml-auto"><strong>${recipesList[index].time}min</strong></i></h5>
            <div class="row">
                <div class="col-6">
                ${recipesList[index].ingredients.map(ingIndex =>
                  `
                <p id="ingredientText" class="card-text p-0 m-0">
                <strong>${ingIndex.ingredient}</strong> ${ingIndex.quantity ? `: `+ ingIndex.quantity : ingIndex.quantite ? `: ` + ingIndex.quantite : ''} ${ingIndex.unit ? ingIndex.unit : ''}            </p>
                `
                  ).join('')}
                </div>
                <div class="col-6 ml-auto" >
                <p id="description" class="card-text" style="max-height: 220px; overflow: hidden; text-overflow:ellipsis;">${recipesList[index].description}</p>
                </div>
            </div>
        </div>
    </div>
    
    `;
    cardsDeck.insertAdjacentHTML('beforeend', cardsPattern);
}

function noMatches(){
    const noMatchesText = `
        <h3>Aucune recette ne correspond à votre critère... vous pouvez
        chercher « tarte aux pommes », « poisson », etc.</h3>
    `;
    mainTag.insertAdjacentHTML('beforeend', noMatchesText);
}