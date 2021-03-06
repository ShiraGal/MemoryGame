// משחק זיכרון מוסיקלי! כל זוג קלפים הם אקורדים מקבילים של מינור ומז'ור.


 let cards = ["A","Bb","B","C","C#","D","Eb","E","F","F#","G","Ab","Am","Bbm","Bm","Cm","C#m","Dm","Ebm","Em","Fm","F#m","Gm","Abm"]
 
 let arrOpen = [];     //מערך לשני הקלפים שנפתחים במהלך אחד
 let lastCard;
 
 let board = document.getElementById("gameTable");                       
 let scoreBoard = document.getElementsByClassName("scoreBoard");
 let score1 = document.getElementById("player1");
 let name1 = document.getElementById("name1");
 let v1 = document.getElementById("v1");
 let score2 = document.getElementById("player2");
 let name2 = document.getElementById("name2");
 let v2 = document.getElementById("v2");
 let begin = document.getElementById("begin");
 let input1 = document.getElementById("input1");
 let input2 = document.getElementById("input2");
 let btnStart = document.getElementById("btn");

//  מערך שני שחקנים:
 let players = [
     {player1: "p1", score: 0},
     {player2: "p2", score: 0}
 ]
 let playNaw = players[0];

 let endCount = 0;        //ספירת הקלפים הנעלמים עד לסיום

 

 //=============================================================
//פונקציית קדמה למשחק

function foreword(){
    btnStart.onclick = (e) => {
        players[0].player1 = input1.value;
        players[1].player2 = input2.value;
        begin.style.visibility = 'hidden';
        createPlayres();
    } 
}
// -------------------------------------------
// פונקציית הכנת לוח ניקוד:
function createPlayres(){
    name1.innerText = players[0].player1; 
    name2.innerText = players[1].player2; 
    name1.style.textDecoration = "underline";
}
// -------------------------------------------


//  ערבוב הקלפים:
 //=============================================================
 function shuffle(){
     
     for(i in cards){
         randomI = Math.round(Math.random()*(cards.length-1));
         cards[randomI] = String(cards.splice(i,1,cards[randomI]));
        }
        return cards;
    }
    shuffle()

    
//==============================================================


// פונקציה שמחברת סאונד לקלף

function soundCord(id){
    if(!id.includes("#")){
       sound =  new Audio(`audio/${id}.mp3`);
    }
    else if(id == "F#"){
       sound =  new Audio(`audio/Gb.mp3`);
    }
    else if(id == "F#m"){
       sound =  new Audio(`audio/Gbm.mp3`);
    }
    else if(id == "C#"){
       sound =  new Audio(`audio/Db.mp3`);
    }
    else if(id == "C#m"){
        sound =  new Audio(`audio/Dbm.mp3`);
    }
}
// -------------------------------------------


// פונקציית בדיקה האם הקלפים מייצגים שני אקורדים מקבילים- כלומר האם הם זוג
function cardsAreCouple(){
    if((arrOpen[0].length != arrOpen[1].length) && (arrOpen[0])[0] == (arrOpen[1])[0]) {    //האם כמות התווים שונה וגם האות הראשונה שווה
    
        if((arrOpen[0]).includes("b") && (arrOpen[1]).includes("b")){       //האם לשניהם יש במול
            return true;
        }
        else if((arrOpen[0]).includes("#") && (arrOpen[1]).includes("#")){   //האם לשניהם יש דיאז
            return true;
        }
        else if( ((arrOpen[0]).includes("m") || (arrOpen[1]).includes("m"))  && (arrOpen[0].length == 1 || arrOpen[1].length == 1) && (arrOpen[0].length < 3 && arrOpen[1].length < 3)){     //האם אחד מהם הוא מינור, וגם אחד מהם הוא אות יחידה, וגם שניהם מכילים פחות משלוש אותיות
            return true;
        }
        else{
            return false;
        }            
    }
    else{
        return false;
    }
    }
// -------------------------------------------

// פונקציית הצלחה- העלמת הקלפים:
function remuveCouple(openCard, lastCard){
    // alert("Well done! Take another turn!");
    openCard.style.visibility = 'hidden'
    lastCard.style.visibility = 'hidden'
    arrOpen = [];
}
// -------------------------------------------

// :פונקציית כישלון- הסתרת טקסט מהקלפים
function deleteTextFromCards(openCard, lastCard){
    openCard.innerHTML = "";
    lastCard.innerHTML = "";
    openCard.style.backgroundColor = "771144";
    lastCard.style.backgroundColor = "771144";
    // החלפת סימון לשחקן הבא שישחק:
    if(playNaw == players[0]){
        name1.style.textDecoration = "underline";
        name2.style.textDecoration = '';
    }
    else{
        name2.style.textDecoration = "underline";
        name1.style.textDecoration = '';
    }
    arrOpen = [];
}
// -------------------------------------------

// פונקציית החלפת שחקן:
function changePleyer(){
    if(playNaw == players[0]){
        playNaw = players[1];
    }
    else{
        playNaw = players[0];
    }
}
// -------------------------------------------

// פונקציית הוספת נקודה לשחקן
function extraScore(){
    playNaw.score += 1;

    if(playNaw == players[0]){
        v1.innerText = "\n" + players[0].score   //+= "\n ✔️";
    }else{
        v2.innerText = "\n" + players[1].score   //+= "\n ✔️";
    }
    gameOver();
}
// -------------------------------------------

// פונקציית סיום המשחק:
function gameOver(){
    endCount += 2;
    if(endCount == cards.length){
        setTimeout(endMessage,1000);
    }
}
//  הודעת ניצחון
function endMessage(){
    let endMes = document.createElement("div");
    endMes.className = "message";
    endMes.id = "endMes";
    board.appendChild(endMes);

    if(players[0].score > players[1].score){
        endMes.innerText = "The End! \n"+ players[0].player1 + " is the winner!!! \n\n";
    }
    else if(players[0].score < players[1].score){
        endMes.innerText = "The End! \n"+ players[1].player2 + " is the winner!!! \n\n";
    }
    else{
        endMes.innerText = "The End! \n"+ players[0].player1 +" and "+players[1].player2+": \n you both won! \n\n";
    }

    let btnStartaAgain = document.createElement("button");
    endMes.appendChild(btnStartaAgain);
    btnStartaAgain.innerText = "play again"
    btnStartaAgain.onclick = (e) => {
        location.reload();
    }
}



// המשחק מתחיל:
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function startGame(){
    foreword();
    for(i in cards){
        let elem = document.createElement("div");
        elem.className = "card";
        elem.id = cards[i];
        
        elem.onclick = (e) => {
            if(!(arrOpen.length >= 2)){
                soundCord(e.target.id);
                sound.play();
                let openCard = e.target;
                e.target.innerHTML = elem.id;
                openCard.style.visibility = '';
                openCard.style.backgroundColor = "E36BAE";
                
                if(openCard.innerHTML != arrOpen[0]){
                    arrOpen.push(openCard.innerHTML);
                }
    
                // השוואת הקלפים:
                if(arrOpen.length == 2){
    
                    if(cardsAreCouple()){
                        setTimeout(remuveCouple, 2000, openCard, lastCard); 
                        setTimeout(extraScore,2000);
                        // arrOpen = [];  
                    }
                    else{
                        setTimeout(deleteTextFromCards, 3000, openCard, lastCard);
                        changePleyer()
                        // arrOpen = [];
                    }
                }
                else{
                    lastCard = openCard;
                }
            } 
        }
        board.appendChild(elem);
    }
    return cards
}
startGame();

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


