//fetch game words from wordnik api
urls = ['http://api.wordnik.com:80/v4/words.json/randomWords?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5']
async function fetchWord() {
  let response = await fetch(urls);
  let data = await response.json();

  let wordArr = [];
  for(i=0; i<data.length; i++) {
    wordArr.push(data[i].word);
  }

  //Game Levels 
  let lev = {
    'Easy': {
      wordsCount: 4,
      levelSecond: 6
    },
    'Normal': {
      wordsCount: 25,
      levelSecond: 5
    },
    'Hard': {
      wordsCount: 30,
      levelSecond: 4
    }
  }
  //Heml Elements
  let gamerName = document.querySelector('.gamer-name');
  let levSelector = document.querySelector('.game-levels');
  let gameLev = document.querySelector('.selected-lev');
  let levSecond = document.querySelector('.lev-second');
  let upCommingWords = document.querySelector('.upcomming-words');
  let theWord = document.querySelector('.the-word');
  let remainingTime = document.querySelector('.remaining-time span');
  let remainingWordsCoutn = document.querySelector('.remaining-words-coutn');
  let typedWordCount = document.querySelector('.typed-words-count');
  let startGameBtn = document.querySelector('.start-game-btn');
  let input = document.querySelector('input');
  let rightWordCount = document.querySelector('.right-words-count');
  let wrongWordCount = document.querySelector('.wrong-words-count');
  let gameFinish = document.querySelector('.remaining-words');
  let wordIndex = 0;
  let leftSecond = 0;
  let rightWord = 0;
  let wrongWord = 0;
  let theTime;

  //Show Gamer Name function
  function showGamerName() {
    let gamer = prompt("Please enter your name");
    gamerName.innerHTML = gamer.split('')[0].toUpperCase() + gamer.substring(1);
  }
  showGamerName();

  //Set Up The Game Rule Onload The Page
  function gameSetUp() {
    gameLev.innerHTML = levSelector.value;
    levSecond.innerHTML = lev[ levSelector.value ].levelSecond;
    remainingTime.innerHTML = lev[ levSelector.value ].levelSecond;
    remainingWordsCoutn.innerHTML = lev[ levSelector.value ].wordsCount;
  }
  gameSetUp();

  //Reset Up Whene Changing Game Levels
  levSelector.onchange = function () {
    gameSetUp();
  }
  
  //Start The Game Whene Clicking on Start Game Button
  startGameBtn.onclick = function theFun() {
    upCommingWords.innerHTML = '';
    startGameBtn.remove();
    levSelector.disabled = true;
    theWord.style.display = 'block';
    upCommingWords.style.display = 'flex';
    theWord.innerHTML = wordArr[wordIndex];
    input.focus();
    
    for(let i=0; i < lev[ levSelector.value ].wordsCount; i++) {
      var commingWord = document.createElement('span');
      commingWord.innerHTML = wordArr[i];
      upCommingWords.appendChild(commingWord);
    }

    if(wordArr[ wordIndex ] == theWord.innerHTML ) {
      upCommingWords.children[ wordIndex ].classList.add('current-word');
    }

    // Start Time Function
    typingTime();
  } 


  // Change The Word Game Function
  function changeTheWord() {

    if ( rightWord > rightWordCount.innerHTML ) {
      rightWordCount.innerHTML = rightWord;
    } 
    else if ( wrongWord > wrongWordCount.innerHTML ) {
      wrongWordCount.innerHTML = wrongWord;
      remainingTime.innerHTML =  lev[ levSelector.value ].levelSecond;
      leftSecond = 0;
    }

    theWord.innerHTML = wordArr[ wordIndex ];
    upCommingWords.children[ wordIndex - 1 ].classList.remove('current-word');
    upCommingWords.children[ wordIndex - 1 ].classList.add('right-word');
    typedWordCount.innerHTML = wordIndex;
    input.value = '';
    clearInterval(theTime);

    if ( wordIndex > lev[ levSelector.value ].wordsCount - 1 ) {
      gameResult();
      return ;
    }

    upCommingWords.children[ wordIndex ].classList.add('current-word');
    input.focus();
    typingTime();
  }

  // typing function [ right input value ]
  input.oninput = function () {
    if(theWord.innerHTML == input.value.trim()) {
      wordIndex++;
      rightWord++;
      changeTheWord();
    }
  }

  // Time function [ wrong input value ]
  function typingTime() {
    leftSecond = 0;
    theTime = setInterval(() => {
      remainingTime.innerHTML = lev[ levSelector.value ].levelSecond - leftSecond;
      leftSecond++;
      if( remainingTime.innerHTML == 0 ) {
        wordIndex++;
        wrongWord++;
        changeTheWord();
      }
    }, 1000);
  }

  function gameResult() {
    theWord.innerHTML = '';
    theWord.classList.add('the-resutl');
    input.style.display = 'none';
    upCommingWords.style.display = 'none';
    percentageScore = ( rightWord * 100 ) / lev[ levSelector.value ].wordsCount + ' / 100';
    let theResult = document.createElement('div');
    let showScore = document.createElement('div');
    theResult.appendChild(document.createTextNode(`Congrates ${gamerName.innerHTML} Your Score is`));
    showScore.innerHTML = percentageScore;
    theWord.appendChild(theResult);
    theWord.appendChild(showScore);
  }

}

fetchWord();  