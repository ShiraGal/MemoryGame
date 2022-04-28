
 let cards = ["A","B","C","D","E","F","G","H","I","J"]
 cards = cards.concat(cards);
 let board = document.getElementById("gameTable");
 let arrOpen = [];
 let lastCard;
 
 //=============================================================
 function shuffle(){
     
     for(i in cards){
         randomI = Math.round(Math.random()*(cards.length-1));
         cards[randomI] = String(cards.splice(i,1,cards[randomI]));
        }
        return cards;
    }
    console.log(shuffle());
//==============================================================

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function startGame(){
    for(i in cards){
        let elem = document.createElement("div");
        elem.className = "card";
        elem.id = cards[i];
        
        elem.onclick = (e) => {
            let openCard = e.target;
            e.target.innerHTML = elem.id;
            openCard.style.visibility = "visible";
            
            arrOpen.push(openCard.innerHTML);
            console.log(arrOpen);

            if(arrOpen.length == 2){

                if(arrOpen[0] == arrOpen[1]){
                    
                    alert("good!");
                    arrOpen = [];
                    console.log(arrOpen);
                   
                    openCard.style.visibility = 'hidden'
                    lastCard.style.visibility = 'hidden' 
                }
                else{
                    arrOpen = [];
                    openCard.innerHTML = "";
                    lastCard.innerHTML = "";
                }
            }
            else{
                lastCard = openCard;
            }
        }

        board.appendChild(elem);
    }
    return cards
}
startGame();

