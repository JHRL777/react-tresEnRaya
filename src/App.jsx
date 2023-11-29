import { useState } from 'react'
import './App.css'
import {checkwinner} from "./logic/board.js"
import confetti from "canvas-confetti"
import {Squere} from "./components/Squere"
import {TURNS} from "./constans.js"
import {WinnerModal} from "./components/WinnerModal"







function App() {

  const [board, setboard] = useState(() =>{
    const boardFromStorage  = window.localStorage.getItem('board')
    return boardFromStorage  ? JSON.parse(boardFromStorage) : Array(9).fill(null)})

  const [turn, setturn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X})

  const [winner, setwinner] = useState(null)

 

  const resetGame = () =>{
    setboard(Array(9).fill(null))
    setturn(TURNS.X)
    setwinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndGames = (newBoard) =>{
    return newBoard.every((Squere) => Squere !== null)
  }

  const updateBoard = (index)=>{

    if(board[index]  || winner ) return

    const newBoard = [...board]
    newBoard[index] = turn
    setboard(newBoard)
    console.log(newBoard)
    const newturn = turn === TURNS.X ? TURNS.O : TURNS.X
    setturn(newturn)
    // guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newturn)
    const newwinner = checkwinner(newBoard)
    if(newwinner){
      confetti()
      setwinner(newwinner)
    }else if(checkEndGames(newBoard)){
      setwinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic toc</h1>
      <button onClick={resetGame}>reset</button>
      <section className='game'>
          {board.map((_,index) =>{
            return(
              <Squere  
              key={index} 
              index={index}
              updateBoard ={updateBoard}
              >
               {board[index]}
              </Squere>
              )
          })}
      </section>
      <section className='turn'>
        <Squere selector={turn === TURNS.X}>
          {TURNS.X}
        </Squere>
        <Squere selector={turn === TURNS.O}>
          {TURNS.O}
        </Squere>
      </section>
    <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
