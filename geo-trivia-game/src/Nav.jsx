import logo from './assets/geo-trivia-logo.png'
import timer from './assets/timer.png'
import score from './assets/score.png'

export default function Nav() {

    return (
        <>
            <nav>
                <div>
                    <img src={timer} alt="Timer" id='timer'/>
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
                    <img src={score} alt="Score" id='score'/>
                </div>
            </nav>
        </>
    )

}