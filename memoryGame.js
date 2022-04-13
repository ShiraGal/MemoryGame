
 let cards = ["A","B","C","D","E","F","G","H","I","J"]
cards = cards.concat(cards);

function shuffle(){

    for(i in cards){
        randomI = Math.round(Math.random()*(cards.length-1));
        cards[randomI] = String(cards.splice(i,1,cards[randomI]));
    }
    return cards;
}
console.log(shuffle());




// למשוך את שולחן המשחק:
let board = document.getElementById("gameTable");
// לייצר כרטיס:
let elem = document.createElement("div");
// להכניס טקסט בכרטיס
// elem.innerText = "A";
// לחבר את הכרטיס לשולחן, את הילד לאבא..
board.appendChild(elem);

// elem.className = "card";




function startNewGame(){
    for(i in cards){
        let elem = document.createElement("div");
        elem.innerText = cards[i];
        board.appendChild(elem);
        elem.className = "card";
    }
    return cards
}
startNewGame();

