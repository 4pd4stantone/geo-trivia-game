import Nav from './components/Nav'
import Population from './pages/Population'
import { useState } from 'react'


export default function App() {

const [game, setGame] = useState(false);
const [movesLeft, setMovesLeft] = useState(6)

  return (
      <>
        <Nav game={game} movesLeft={movesLeft}/>
        <Population id="population" game={game} setGame={setGame} movesLeft={movesLeft} setMovesLeft={setMovesLeft}/>
      </>
  )


}
