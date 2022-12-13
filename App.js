import React from "react"
import Intro from "./Intro"
import Game from "./Game"
import Question from "./Question"
import {nanoid} from 'nanoid'

export default function App() {
    
    const [hasStarted, setHasStarted] = React.useState(false)
    const [quizData, setQuizData] = React.useState([])
    const [isChecked, setIsChecked] = React.useState(false)
    const [toggleFetch, setToggleFetch] = React.useState(false)
    const [score, setScore] = React.useState(0)
    
    function handleClick() {
        setHasStarted(true)
    }
    
    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&encode=url3986")
            .then(res => res.json())
            .then(data => {
                setQuizData(()=> {
                    return data.results.map(item => {
                        
                        const questionId = nanoid()
                        const correctAnswer = item.correct_answer
                        
                        const unorganisedAnswers = [...item.incorrect_answers, item.correct_answer].sort()
                        
                        const dataAnswers = unorganisedAnswers.map(answer => {
                            return {
                                id: nanoid(),
                                answer: answer,
                                isSelected: false,
                                questionId: questionId,
                                correctAnswer: correctAnswer,
                                isRight: false,
                                isWrong: false
                            }
                        })
                        
                        return {
                            id: questionId,
                            question: window.decodeURIComponent(item.question),
                            answers: dataAnswers,
                        }
                    })
                })
            })
    }, [toggleFetch])
    
    function selectAnswer(id, questionId) {
        
        setQuizData(oldQuizData => oldQuizData.map(item => {
            
            return {
                ...item,
                answers: item.answers.map(answer => {
                    return answer.questionId === questionId && answer.id === id ?
                    {...answer, isSelected: true} :
                    answer.questionId === questionId && answer.id !== id ?
                    {...answer, isSelected: false} : answer
                })
            }   
        }))
    }
    
    const questionElements = quizData.map(item => {
        return <Question
            id={item.id}
            key={item.id}
            question={item.question}
            answers={item.answers}
            selectAnswer={selectAnswer}
        />
    })
    
    function checkAnswers() {
        setIsChecked(true)
        
        setQuizData(oldQuizData => oldQuizData.map(question => {
            
            return {
                ...question,
                answers: question.answers.map(answer => {
                    
                    if(answer.answer === answer.correctAnswer && answer.isSelected) {
                        setScore(oldScore => oldScore += 1)
                    }
                    
                    return answer.answer === answer.correctAnswer ?
                    {...answer, isRight: true} :
                    answer.isSelected && answer.answer !== answer.correctAnswer ?
                    {...answer, isWrong: true} : answer
                })
            }
        }))
    }
    
    function newGame() {
        setIsChecked(false)
        setToggleFetch(oldToggleFetch => !oldToggleFetch)
        setHasStarted(false)
        setScore(0)
    }
    
    return (
        <div>
            {!hasStarted && <Intro handleClick={handleClick} />}
            {hasStarted && <Game
                questionElements={questionElements}
                checkAnswers={checkAnswers}
                isChecked={isChecked}
                newGame={newGame}
                score={score}
            />}
        </div>
    )
}