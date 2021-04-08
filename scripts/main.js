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
  halt = false;

  const nCards = readCards();
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

  timeStamp.textContent = "00:00";
}

function handleCardClick(caller){
  //force the player to wait if they get it wrong
  if (halt === true) return;

  const selected = caller;
  //ignore the click if the player clicks a card that has is flipped up
  if (selected.classList.contains('persistent')) return;

  selectedList.push(caller);

  if (flipCount === 0) startStopWatch();
  flipCount++;
  selected.classList.add('persistent');

  if (selectedList.length === 2){
    halt = true;

    const previousSelected = selectedList[0];
    const cardSrc1 = selected.querySelector('.back img').src;
    const cardSrc2 = previousSelected.querySelector('.back img').src;
    selectedList = [];

    if (cardSrc1 === cardSrc2){
      halt = false;
    } else {
      setTimeout(()=>{
        selected.classList.remove('persistent');
        previousSelected.classList.remove('persistent');
        halt = false;
      }, 1000);
    }

    if (document.querySelectorAll('.persistent').length === document.querySelectorAll('.card').length){
      clearInterval(stopwatch);
      setTimeout(()=>{
        alert(`Voce ganhou em ${flipCount} jogadas e em ${seconds} segundos`)
        const newGameAnswer = prompt('Quer Jogar de novo? digite sim');
        if (newGameAnswer === 'sim'){
          newGame();
        }
      },501);
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

let selectedList, flipCount, halt, seconds, stopwatch;

newGame();
