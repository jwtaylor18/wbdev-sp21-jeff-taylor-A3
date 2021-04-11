import React, {useState} from "react";

const TrueFalseQuestion = ({question}) => {

    const [tempAnswer, setTempAnswer] = useState("")
    const [yourAnswer, setYourAnswer] = useState("")

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
                <li className={`list-group-item ${getStyle("true", question, yourAnswer)}`}> <label><input onClick={() => {
                    // setYourAnswer(choice)
                    setTempAnswer("true")
                }} type="radio" name={question._id}/> True</label></li>
                <li className={`list-group-item ${getStyle("false", question, yourAnswer)}`}> <label><input onClick={() => {
                    // setYourAnswer(choice)
                    setTempAnswer("false")
                }} type="radio" name={question._id}/> False</label></li>
            </ul>
            {/*<label><input type="radio" name={question._id}/> True</label>*/}
            {/*<label><input type="radio" name={question._id}/> False</label>*/}
            <hr/>
            <p>
                Your answer: {yourAnswer}
            </p>
            <button onClick={() => setYourAnswer(tempAnswer)}>Grade</button>
        </div>
    )
}

export default TrueFalseQuestion