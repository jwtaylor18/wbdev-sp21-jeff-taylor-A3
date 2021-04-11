const findAllQuizzes = () => {
    return fetch("http://localhost:4000/api/quizzes")
        .then(response => response.json())
}

const findQuizById = (qid) => {
    return fetch(`http://localhost:4000/api/quizzes/${qid}/questions`)
        .then(response => response.json())
}

module.exports = {
    findAllQuizzes,
    findQuizById
}


