//[{id:'n', src:'url'},...]
const cardsObjArr = [
  {
    src: 'assets/images/bobrossparrot.gif',
    alt: 'bobross parrot'
  },
  {
    src: 'assets/images/explodyparrot.gif',
    alt: 'explody parrot'
  },
  {
    src: 'assets/images/fiestaparrot.gif',
    alt: 'fiesta parrot'
  },
  {
    src: 'assets/images/metalparrot.gif',
    alt: 'metal parrot'
  },
  {
    src: 'assets/images/revertitparrot.gif',
    alt: 'revertit parrot'
  },
  {
    src: 'assets/images/tripletsparrot.gif',
    alt: 'triplets parrot'
  },
  {
    src: 'assets/images/unicornparrot.gif',
    alt: 'unicorn parrot'
  }
];

function newGame(){

  //readCards() loops until a valid input is given
  //returns the integer number of cards
  function readCards(){

    //checkInput() checks to see if the input is valid (4<=n<=17)
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

  function arrShuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  //flush out anything from an older game and set fresh vars
  gameContainer.innerHTML = '';
  selectedList = [];
  flipCount = 0;
  nFound = 0;
  halt = false;
  nCards = readCards();
  timeStamp.textContent = "00:00";

  //randomizes nCards and creates the HTML for them
  const nCardsArr = arrShuffle([...cardsObjArr]).slice(0,nCards/2);
  const gameArr = arrShuffle(nCardsArr.concat(nCardsArr));

  for (let i=0; i<gameArr.length; i++){
    gameContainer.innerHTML += 
    `<div class="card" onclick="handleCardClick(this)">
      <div class="card-content front">
        <img src="assets/images/front.png" alt="parrot">
      </div>
      <div class="card-content back">
        <img src="${gameArr[i].src}" alt="${gameArr[i].alt}">
      </div>
    </div>`;
  }

}

function handleCardClick(selected){
  //halt becomes false at the start of the game
  //halt becomes true at the start of every 2*n valid click
  //halt becomes false when matching succeeds
  //halt becomes false after 1000ms after matching fails
  if (halt === true) return;
  //ignore the click if the player clicks a card that is flipped up
  if (selected.classList.contains('persistent')) return;

  if (flipCount === 0) startStopWatch();
  flipCount++;
  
  selected.classList.add('persistent');
  selectedList.push(selected);

  if (selectedList.length === 2){
    halt = true;

    const previousSelected = selectedList[0];
    selectedList = [];

    const cardSrc0 = selected.querySelector('.back img').src;
    const cardSrc1 = previousSelected.querySelector('.back img').src;

    if (cardSrc0 === cardSrc1){
      halt = false;
      nFound += 2;
    } else {
      setTimeout(()=>{
        selected.classList.remove('persistent');
        previousSelected.classList.remove('persistent');
        halt = false;
      }, 1000);
    }

    if (nFound === nCards){
      clearInterval(stopwatch);
      setTimeout(()=>{
        alert(`Voce ganhou em ${flipCount} jogadas e em ${seconds} segundos`)
        const newGameAnswer = prompt('Quer Jogar de novo? digite sim');
        if (newGameAnswer === 'sim'){
          newGame();
        }
      },500);
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
  stopwatch = setInterval(timeKeeper, 1000);
}

const gameContainer = document.querySelector('.cards-container');
const timeStamp = document.querySelector('.time');

let selectedList, flipCount, halt, seconds, stopwatch, nCards, nFound;

newGame();
