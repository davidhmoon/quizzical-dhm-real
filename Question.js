import React from "react"
import {nanoid} from 'nanoid'

export default function Question(props) {
    
    const answersElements = props.answers.map(item => {
        return <p
                className={item.isRight ?
                "answer is-right" : item.isWrong ?
                "answer is-wrong" : item.isSelected ?
                "answer is-selected" : "answer"}
                key={item.id}
                id={item.id}
                onClick={() => props.selectAnswer(item.id, item.questionId)}
            >{window.decodeURIComponent(item.answer)}</p>
    })
    
    return (
        <div className="question-container">
            <h3 className="question">{props.question}</h3>
            <div className="answers-container">
                {answersElements}
            </div>
        </div>
    )
}