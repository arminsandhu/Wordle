
let wordsDict= [];
let theWord= "";
let theHint = "";


const getData = async() => {
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
    "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
});

    const data = await res.json();    
    wordsDict = data["dictionary"];
    setRandomWord();
}

function setRandomWord(){
    let index = Number.parseInt(Math.random()*wordsDict.length);
    theWord = wordsDict[index]["word"].toUpperCase();
    theHint = "Hint: " + wordsDict[index]["hint"] + ".";
    console.log(theWord);
    console.log(hint);
  
}


window.onload = () => {
    const element = document.body;
    darkMode.addEventListener("click", () => {
        element.classList.toggle("dark");
    })
    const hint = document.getElementById("hint");
    hint.addEventListener("click", () => {
        var x = document.getElementById("popUp");
        x.innerHTML =theHint;
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    })
    side.addEventListener("click", () => {
        var x = document.getElementById("sidebar");
        if (x.style.display === "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    })
    toggle.addEventListener("click", () => {
        clear();
    })
}




function clear() {
    currentGuess = [];
    column = 0;
    column_min = 0;
    column_max = 4;
    row_max = 4;
    row = 0;
    for (i = 0; i < 16; i++) {
        tds[i].innerText = "";
        tds[i].style.backgroundColor="transparent";
    }
    document.getElementById("popUp");
    return
}






function checker() {
    let theWordArray = theWord.split("");
    let rightNumWords = 0;

    for (p = 0; p<4; p++) {
        let currTd = document.getElementsByTagName("td")[(row-1)*4 + p]
        if(theWordArray[p] === currentGuess[p]) 
        {
            currTd.style.backgroundColor="green";
            rightNumWords +=1
        }
        else {
            let isContains = false
            for (i = 0; i < 4; i++) 
            {
                if (theWordArray[i] === currentGuess[p])
                {
                    currTd.style.backgroundColor="yellow";
                    isContains = true
                    break
                }
            }
            if(!isContains)
            {
                currTd.style.backgroundColor="grey";
            }
        }
    }

    if (rightNumWords === ACTUAL_RIGHT) 
    {
        endGame();
        clear();
        return;
    }
    
    currentGuess = [];
    return;
}




function endGame() {
    const congratsImage = document.createElement('img');
    const clearDiv = document.getElementById("display")
    clearDiv.style.display = 'none'

    congratsImage.src = "https://res.cloudinary.com/mkf/image/upload/v1675467141/ENSF-381/labs/congrats_fkscna.gif";
    congratsImage.style.width = '350px'
    
    const upper = clearDiv.parentElement
    upper.prepend(congratsImage);   
    
    const popUp = document.getElementById("popUp");
    popUp.style.display = 'block';
    popUp.style.backgroundColor = "lightgrey";
    popUp.innerHTML = "You guessed the word " + theWord + " correctly!";
    toggle.addEventListener("click", () => {
        window.location.reload();
    })
    return;

}





let currentGuess = [];
let column = 0;
let column_min = 0;
let column_max = 4;
let row_max = 4;
let row = 0;
const ACTUAL_RIGHT = 4;





getData();

const tds = document.getElementsByTagName ("td");

document.addEventListener("keydown", (event) => {
    const value = event.key.toUpperCase();
    
    if (value == "ENTER" && column === column_max) {
        column_max += 4;
        column_min = column
        row += 1;
        checker();
        if(column_max === 20) {
            const popUp = document.getElementById("popUp");
            popUp.style.color = "white";
            popUp.style.backgroundColor = "red";
            popUp.innerHTML = "You missed the word " + theWord + " and lost!";
            popUp.style.display= 'block';
            toggle.addEventListener("click", () => {
                setRandomWord();
                clear();
                popUp.style.display = 'none';
                popUp.style.color = 'black';
                popUp.style.backgroundColor = 'bisque';
            })
        }
        
    }
    else if (value == "ENTER" && column < column_max) {
        window.alert("You must complete the word first");

    }
    else if (value === "BACKSPACE") {
        if(column != column_min){
            column -= 1;
            currentGuess.pop()
            tds[column].innerText = "";
        }
        else{
            currentGuess.pop();
            tds[column].innerText = "";
        }

    }
    else if (event.key >= 'a' && event.key <= 'z' && column < column_max ){
        tds[column].innerText = value;
        column+=1;
        currentGuess.push(value)
    }
    else {
        tds[column].innerText = "";
    }
  });

