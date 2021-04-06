const cardsObj = [
  {
    id: '1',
    src: 'assets/images/bobrossparrot.gif'
  },
  {
    id: '2',
    src: 'assets/images/explodyparrot.gif'
  },
  {
    id: '3',
    src: 'assets/images/fiestaparrot.gif'
  },
  {
    id: '4',
    src: 'assets/images/metalparrot.gif'
  },
  {
    id: '5',
    src: 'assets/images/revertitparrot.gif'
  },
  {
    id: '6',
    src: 'assets/images/tripletsparrot.gif'
  },
  {
    id: '7',
    src: 'assets/images/unicornparrot.gif'
  }
];


function newGame(){
  //loops until a valid input is given
  //returns the integer number of pairs
  function readPairs(){
    //checks to see if the input is valid (2<=n<=7)
    //returns true/false
    function checkInput(str){
      if (typeof(str) !== 'string') return false;
      if (str === '') return false;
      if (/\D/.test(str)) return false;
      if (parseInt(str, 10)<2 || parseInt(str, 10)>7) return false;
      return true;
    }

    let strPairs;
    do{
      strPairs = prompt('Com quantos pares quer jogar? (2 a 7)');
    } while (!checkInput(strPairs))
    return parseInt(strPairs, 10);
  }

  //flushes out any HTML in the game container
  gameContainer.innerHTML = '';


  
  //builds the HTML for a new instance of the game
  const nPairs = readPairs();
  for (let i=0; i<nPairs*2; i++){
    gameContainer.innerHTML += 
    `<div class="card">
      <div class="card-content front">
        <img src="assets/images/front.png" alt="">
      </div>
      <div class="card-content back">
        <img src="" alt="">
      </div>
    </div>`;
  }

}

const gameContainer = document.querySelector('.cards-container');
newGame();



