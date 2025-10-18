import { useState } from 'react'
import clsx from "clsx";
import Confetti from 'react-confetti'

import Hangman from './components/Hangman';
import { words } from './words'

function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= 6
  const isGameOver = isGameWon || isGameLost

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  
  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters,letter])
  }
  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      "correct": isCorrect,
      "wrong": isWrong
    })
    return(
      <button key={letter}
        className={className}
        disabled={isGameOver}
        onClick={() => { addGuessedLetter(letter) }}
      >
        {letter.toUpperCase()}
      </button>
    )
  })
  
  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
      isGameLost&&!guessedLetters.includes(letter)&&"missed-letter"
    )
    return (
        <span key={index} className={letterClassName} >
          {shouldRevealLetter ? letter.toUpperCase() : ""}
        </span>
      )
})
  
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost
  })

  function renderGameStatus() {
    if (!isGameOver) {
      return null
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! You saved the hangman just in time!</p>
        </>
      )
    } else {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! The hangman met his fate... better luck next time!</p>
        </>
      )
    }
  }

  function getRandomWord() {
      const randomIndex=Math.floor(Math.random()*words.length)
      return words[randomIndex]
  }

  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }
  return (
    <main>
      {
        isGameWon &&
        <Confetti
          recycle={false}
          numberOfPieces={1000}
        />
      }
      <header>
        <h1>Hangman Pro</h1>
        <p>Guess the hidden word before you run out of 6 lives — every wrong guess brings the hangman closer to his fate!</p>

      </header>

      <section className={gameStatusClass}>
        {renderGameStatus()}
      </section>

      <Hangman wrongGuessCount={wrongGuessCount} />

      <section className="word">
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>
      
      {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}
    </main>
  )
}

export default App
