var inquirer = require("inquirer");

var wordsList = require("./words.js");

function Hangman(word, letter) {
	this.word = word;
	this.letter = letter;
}

//number of guesses
var numGuesses = 9;

var startGame = function() {

  console.log("You have 9 guesses remaining, if you do not guess the word before your guesses run out, your fall to the Dark side will be comeplete.\n-------------------");

  //random word from wordList
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

  //console.log("working 1");

  //splits the word into indivdual letters
  lettersInChosenWord = chosenWord.split(""); 

  //console.log("working 2");

  //count number of letters in word
  numBlanks = lettersInChosenWord.length;

  // We print the solution in console (for testing).
  console.log("\n")
  //console.log(chosenWord);

  // CRITICAL LINE - Here we *reset* the guess and success array at each round.
  blanksAndSuccesses = [];
  // CRITICAL LINE - Here we *reset* the wrong guesses from the previous round.
  wrongGuesses = [];

  // Fill up the blanksAndSuccesses list with appropriate number of blanks.
  // This is based on number of letters in solution.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // Print the initial blanks in console.
  console.log(blanksAndSuccesses);
  guess();
}
var guess = function() {
	inquirer.prompt([
		{
			name: "letter",
			message: "Guess a letter!\n",
      validate: function(value) {
        if (isNaN(value) === true) {
          return true;
        }
        return false;
      }
		}
	]).then(function(answers) {
      // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
      var letterInWord = false;

      for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === answers.letter) {
          letterInWord = true;
        }
      }
      // if answers (which is the user guess) is in the array of words, then display it on the screen. So, redisplay the blanks and successes
      if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {

          if (chosenWord[j] === answers.letter) {
            console.log("Correct Letter\n-------------------");
            blanksAndSuccesses[j] = answers.letter;
          }
        }
        console.log(blanksAndSuccesses);
        if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
          console.log("\n");
          console.log("You win, May the Force Be With You.\n-------------------");
          console.log("\n");
          startGame();
        } else {
          guess();
        }
      } else {

        wrongGuesses.push(answers.letter);
        numGuesses--;
        console.log("INCORRECT LETTER\n----------------------");
        console.log(numGuesses + " guesses remaining");
        guess();
        if (numGuesses === 0) {
          console.log("\nYou lose, you have fallen to the Dark Side.");
          console.log("Start over!");
          startGame();
          numGuesses = 9;
        }
      }      
	})
}

// calling the function to start the game
startGame();