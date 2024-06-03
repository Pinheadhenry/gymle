import { GuessItem } from "./GuessItem"
import './GuessList.css'; // Import the CSS file


export function GuessList({ guesses, correct }) {
    return (
        <table className="guess-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Muscle</th>
                <th>Difficulty</th>
                <th>Equipment</th>
                <th>Type</th>
            </tr>
            </thead>
            
            <tbody>
                {guesses.map(guess => {
                    return (
                    <GuessItem
                        key={guess.id}
                        exercise={guess.exercise}
                        correct={correct}
                    />
                    )
                })}
            </tbody>
            
            
        </table>
    )
}