import React from "react"

export default function Intro(props) {
    return (
        <main>
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-description">Five random trivia questions!</p>
            <button onClick={props.handleClick} className="start-game-btn btn">Start quiz</button>
        </main>
    )
}