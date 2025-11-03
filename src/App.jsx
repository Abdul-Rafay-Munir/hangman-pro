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
  
  const gameStatusClass = clsx("text-center rounded-sm my-[30px] w-full max-w-[350px]", {
    "bg-[#10A95B]": isGameWon,
    "bg-[#BA2A2A]": isGameLost
  })

  function renderGameStatus() {
    if (!isGameOver) {
      return null
    }

    if (isGameWon) {
      return (
        <>
          <h2 className='text-[1.75rem] m-[5px] text-[#F9F4DA]'>You win!</h2>
          <p className='text-base m-[5px]'>Well done! You saved the hangman just in time!</p>
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
    <main className='flex flex-col items-center'>
      {
        isGameWon &&
        <Confetti
          recycle={false}
          numberOfPieces={1000}
        />
      }
      <header className='text-center'>
        <h1 className='text-[#F9F4DA] font-[2rem] font-medium'>Hangman Pro</h1>
        <p className='text-[#8E8E8E] text-base max-w-[350px]'>Guess the hidden word before you run out of 6 lives — every wrong guess brings the hangman closer to his fate!</p>

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
