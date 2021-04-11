const findQuestionsForQuiz = (qid) => {
    return fetch(`http://localhost:4000/api/quizzes/${qid}/questions`)
        .then(response => response.json())
}

export default {
    findQuestionsForQuiz
}
