import React, {useState} from "react";

const MultipleChoiceQuestion = ({question}) => {
    const [tempAnswer, setTempAnswer] = useState("")
    const [yourAnswer, setYourAnswer] = useState("")
    const [styling, setStyling] = useState("")


    function getStyle(choice, q, a) {
        if(yourAnswer === "") {
            return ''
        }
        else if (q.correct === choice) {
            return 'list-group-item-success'
        }
        else if (choice === a && q.correct != choice) {
            return 'list-group-item-danger'
        }
        else {
            return ''
        }
    }



    return(
        <div>
            <h5>
                {question.question}
                {
                    yourAnswer != '' &&  question.correct === yourAnswer &&
                    <i className="fas fa-check"></i>
                }
                {
                    yourAnswer != '' && question.correct !== yourAnswer &&
                    <i className="fas fa-times"></i>
                }
            </h5>
            <ul className="list-group">
                {

                    question.choices.map((choice) => {
                        return(
                            // <li className={`list-group-item
                            // ${(yourAnswer != '' && yourAnswer === question.correct) ? 'list-group-item-success' : 'list-group-item-danger'}`}>
                            <li className={`list-group-item ${getStyle(choice, question, yourAnswer)}`}>
                                <label><input
                                    onClick={() => {
                                        // setYourAnswer(choice)
                                        setTempAnswer(choice)
                                    }}
                                    type="radio"
                                    name={question._id}/> {choice}</label>
                            </li>
                        )
                    })
                }
            </ul>
            <p>
                Your answer: {yourAnswer}
            </p>
            <button onClick={() => setYourAnswer(tempAnswer)}>Grade</button>
        </div>
    )
}

export default MultipleChoiceQuestion