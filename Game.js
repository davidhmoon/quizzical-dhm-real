import React from "react"
import Question from "./Question"


export default function Game(props) {
    
    return (
        <main>
            {props.questionElements}
            <button
                className="game-btn btn"
                onClick={props.isChecked ? props.newGame : props.checkAnswers}>{props.isChecked ? "New game" : "Check answers"}
            </button>
            {props.isChecked && <p className="score">You scored {props.score}/5 correct answers</p>}
        </main>
    )
}

