//[{id:'n', src:'url'},...]
const cardsObj = [
  {
    id: 'img1',
    src: 'assets/images/bobrossparrot.gif',
    alt: 'bobross parrot'
  },
  {
    id: 'img2',
    src: 'assets/images/explodyparrot.gif',
    alt: 'explody parrot'
  },
  {
    id: 'img3',
    src: 'assets/images/fiestaparrot.gif',
    alt: 'fiesta parrot'
  },
  {
    id: 'img4',
    src: 'assets/images/metalparrot.gif',
    alt: 'metal parrot'
  },
  {
    id: 'img5',
    src: 'assets/images/revertitparrot.gif',
    alt: 'revertit parrot'
  },
  {
    id: 'img6',
    src: 'assets/images/tripletsparrot.gif',
    alt: 'triplets parrot'
  },
  {
    id: 'img7',
    src: 'assets/images/unicornparrot.gif',
    alt: 'unicorn parrot'
  }
];

function newGame(){

  //loops until a valid input is given
  //returns the integer number of cards
  function readCards(){

    //checks to see if the input is valid (4<=n<=17)
    //returns true/false
    function checkInput(str){
      if (typeof(str) !== 'string') return false;
      if (str === '') return false;
      if (/\D/.test(str)) return false;
      const val = parseInt(str, 10);
      if (val<4 || val>14) return false;
      if (val%2 !== 0) return false;
      return true;
    }

    let strCards;
    do{
      strCards = prompt('Com quantas cartas voce quer jogar? (4,6,8,10,12,14)');
    } while (!checkInput(strCards))
    return parseInt(strCards, 10);
  }

  //flush out anything from an older game
  //and set fresh vars
  gameContainer.innerHTML = '';
  selectedList = [];
  flipCount = 0;
  lastCheckTime = performance.now();

  //get the number of cards for the new instance of the game
  const nCards = readCards();

  //change this later to get n random cards
  const nCardsArr = cardsObj.slice(0,nCards);

  //duplicate each card obj and store it in gameArr
  const gameArr = nCardsArr.concat(nCardsArr);

  //shuffle gameArr
  function shuffling(){};

  //builds the HTML for a new instance of the game
  for (let i=0; i<gameArr.length; i++){
    gameContainer.innerHTML += 
    `<div class="card ${gameArr[i].id} index${i}" onclick="handleCardClick('.${gameArr[i].id}', ${i})">
      <div class="card-content front">
        <img src="assets/images/front.png" alt="parrot">
      </div>
      <div class="card-content back">
        <img src="${gameArr[i].src}" alt="${gameArr[i].alt}">
      </div>
    </div>`;
  }

  allCards = gameContainer.querySelectorAll('.card');
  startStopWatch();
}

function handleCardClick(callerClass, callerIndex){
  function flipUp(card){
    const cardBack = card.querySelector('.back');
    const cardFront = card.querySelector('.front');
    cardBack.classList.add('back-flip');
    cardFront.classList.add('front-flip');
  }
  function flipDown(card){
    const cardBack = card.querySelector('.back');
    const cardFront = card.querySelector('.front');
    cardBack.classList.remove('back-flip');
    cardFront.classList.remove('front-flip');
  }

  //force the player to wait if they get it wrong
  if (performance.now()-lastCheckTime<1100) return;

  const selected = allCards[callerIndex];
  //ignore it if the player clicks a card that has already been discovered
  if (selected.classList.contains('permanent')) return;

  flipCount++;

  flipUp(selected);

  selectedList.push({id: callerClass, index: callerIndex});

  if (selectedList.length === 2){
    lastCheckTime = performance.now();

    const previousSelected = allCards[selectedList[0].index];

    if (selectedList[0].id === selectedList[1].id){
      selected.classList.add('permanent');
      previousSelected.classList.add('permanent');
      lastCheckTime = Date(0,0,0,0,0,0);
    } else {
      setTimeout(()=>{
        flipDown(selected);
        flipDown(previousSelected);
      }, 1000);
    }

    selectedList = [];
  }

  if (document.querySelectorAll('.permanent').length === document.querySelectorAll('.card').length){
    stopStopWatch();
    alert(`Voce ganhou em ${flipCount} jogadas e em ${seconds} segundos`)
    const newGameAnswer = prompt('Quer Jogar de novo? digite sim');
    if (newGameAnswer === 'sim'){
      newGame();
    }
  }
}

function timeKeeper(){
  seconds++;
  let s = seconds%60;
  let m = (seconds - s)/60;
  let sStr;
  let mStr;
  if (s<10) sStr = `0${s}`; else sStr = `${s}`;
  if (m<10) mStr = `0${m}`; else mStr = `${m}`;
  timeStamp.textContent = `${mStr}:${sStr}`;
}

function startStopWatch(){
  seconds = 0;
  timeStamp.textContent = "00:00";
  stopwatch = setInterval(timeKeeper, 1000);
}

function stopStopWatch(){
  clearInterval(stopwatch);
}

const gameContainer = document.querySelector('.cards-container');
const timeStamp = document.querySelector('.time');

let lastCheckTime;
let allCards;
let selectedList;
let flipCount;

let seconds;
let stopwatch;

newGame();
