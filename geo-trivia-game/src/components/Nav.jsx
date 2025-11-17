import logo from '../assets/geo-trivia-logo.png'
import movesLeft2 from '../assets/movesLeft2.png'
import medals from '../assets/medals.png'

export default function Nav({game, movesLeft}) {

    return (
        <>
            <nav>
                <div id='moves-left'>
                    <img src={movesLeft2} alt="Moves Left" id='moves-left-logo'/>
                    {game ?
                    <span id="moves-left-number">{movesLeft}</span>
                        : <></>}
                </div>
                <header>
                    <div>
                        <img src={logo} alt='geo trivia logo' id='geo-trivia-logo'/>
                    </div>
                    <div id='name-title-subtitle'>
                        <h1 id='title'>GEO-TRIVIA Games</h1>
                        <p id='subtitle'>Map. Guess. Conquer.</p>
                    </div>
                </header>
                <div>
                    <img src={medals} alt="Score" id='score'/>
                </div>
            </nav>
        </>
    )

}