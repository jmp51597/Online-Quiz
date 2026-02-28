async function getTriviaQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();
    return data.results;
}
let questions = [];
let currentIndex = 0;
let score = 0;

async function startQuiz() {
    const startBtn = document.getElementById('start-button');
    startBtn.disabled = true;
    questions = await getTriviaQuestions();
    currentIndex = 0;
    score = 0;
    displayScore();
    if (questions.length > 0) displayQuestion(questions[currentIndex]);
}

function displayQuestion(questionData) {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    questionElement.textContent = questionData.question;
    answersElement.innerHTML = ''; // Reset answers

    const answers = [...questionData.incorrect_answers, questionData.correct_answer];
    answers.sort(() => Math.random() - 0.5); // Shuffle answers

    answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => handleAnswerSelection(answer, questionData.correct_answer));
        answersElement.appendChild(button);
    });
}

function handleAnswerSelection(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    currentIndex++;
    if (currentIndex < questions.length) {
        displayQuestion(questions[currentIndex]);
    } else {
        const questionElement = document.getElementById('question');
        const answersElement = document.getElementById('answers');
        questionElement.textContent = `Quiz finished! Final score: ${score}/${questions.length}`;
        answersElement.innerHTML = '';
        document.getElementById('start-button').disabled = false;
    }
    displayScore();
}

function displayScore() {
    const scoreEl = document.getElementById('score');
    scoreEl.textContent = `Score: ${score}`;
}

document.getElementById('start-button').addEventListener('click', startQuiz);
