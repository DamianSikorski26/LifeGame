
let container = document.querySelector(".container");
let sizeOfTiles = 10;
let numberOfColumns = 100;
let animationInterval = 200;
let numberOfTiles = numberOfColumns * numberOfColumns;
const fragment = document.createDocumentFragment();
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let interval;

container.style = `grid-template-columns: repeat(${numberOfColumns},${sizeOfTiles + 2}px);
                    width: ${numberOfColumns*(sizeOfTiles+2)}px;
                    height: ${numberOfColumns*(sizeOfTiles+2)}px;`

for (let i = 0; i < numberOfTiles; i++){
  let temp = document.createElement("div");
  temp.id = i;
  temp.style = `width:${sizeOfTiles}px ; height:${sizeOfTiles}px`;
  temp.classList.add("tile");

  fragment.appendChild(temp);
  
}

container.appendChild(fragment);

container.addEventListener("click",(e) => {
  
  if (e.target.classList.contains("tile")){
    clearInterval(interval)
    e.target.classList.toggle("black");
    
  }

})



function checkColor(array,tileNumber){
  let top;
  if (tileNumber - numberOfColumns < 0){
    top = undefined;
  }
  else{
    top = array[tileNumber - numberOfColumns];
  }
  let bottom;
  if (tileNumber + numberOfColumns + 1 > numberOfTiles){
    bottom = undefined;
  }
  else{
    bottom = array[tileNumber + numberOfColumns];
  }
  let right;
  if(tileNumber == 0 || (tileNumber + 1) % (numberOfColumns)!== 0){
    right = array[tileNumber + 1];
  }
  else{
    right = undefined;
  }
  let left;
  if(tileNumber % (numberOfColumns)== 0){
    left = undefined;
  }
  else{
    left = array[tileNumber - 1];
  }
  let topRight;
  if(tileNumber - numberOfColumns < 0){
    topRight = undefined;
  }
  else if (tileNumber == 0 || (tileNumber + 1) % (numberOfColumns)!== 0){
    topRight = array[tileNumber - numberOfColumns + 1];
  }

  let topLeft;
  if(tileNumber - numberOfColumns < 0){
    topLeft = undefined;
  }
  else if(tileNumber % (numberOfColumns)== 0) {
    topLeft = undefined;
  }
  else{
    topLeft = array[tileNumber - numberOfColumns - 1];
  }

  let bottomRight;
  if (tileNumber + numberOfColumns + 1 > numberOfTiles){
    bottomRight = undefined;
  }
  else if(tileNumber == 0 || (tileNumber + 1) % (numberOfColumns)!== 0){
    bottomRight = array[tileNumber + numberOfColumns + 1];
  }

  let bottomLeft;
  
  if(tileNumber + numberOfColumns + 1 > numberOfTiles){
    bottomLeft = undefined;
  }
  else if(tileNumber % (numberOfColumns)== 0){
    bottomLeft = undefined;
  }
  else {
    bottomLeft = array[tileNumber + numberOfColumns - 1]
  }

  let compteur = 0;

  let AroundTilesArrayToFilter = [top,bottom,right,left,topRight,topLeft,bottomRight,bottomLeft]
  let AroundTilesArray = AroundTilesArrayToFilter.filter(e=>e!== undefined) 
  AroundTilesArray.forEach((element,index) => {
    if (element.classList.contains("black")){
      
      compteur ++;
    }
  });
  array[tileNumber].style.color = "transparent";
  array[tileNumber].textContent = compteur;
  
}

startButton.addEventListener("click",()=>{
  
  clearInterval(interval)
  interval=setInterval(function(){let myArray = document.querySelectorAll(".tile");

  for(let i = 0; i < numberOfTiles;i++){
    checkColor(myArray,i);

  }
  myArray.forEach(function(element){
    if(element.textContent == 3 && !element.classList.contains("black")){
      element.classList.add("black");
    }
    else if(element.textContent < 2 && element.classList.contains("black") ){
      element.classList.remove("black");
    }
    else if(element.textContent > 3 && element.classList.contains("black")){
      element.classList.remove("black");
    }

  })
  for(let i = 0; i < numberOfTiles;i++){
    checkColor(myArray,i);

  }
},animationInterval)

})  

pauseButton.addEventListener("click",function(e){
  clearInterval(interval);
})

resetButton.addEventListener("click",function(e){
  clearInterval(interval);
  let array = document.querySelectorAll(".tile");
  array.forEach(function(element){
    element.classList.remove("black");
  } )
  clearInterval(interval);
})





