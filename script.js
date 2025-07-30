const questions = [
  {
    type: 'single',
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    type: 'multi',
    question: "Which of the following are programming languages?",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    answer: ["Python", "JavaScript"]
  },
  {
    type: 'fill',
    question: "Fill in the blank: The sky is ___?",
    answer: "blue"
  }
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const answerForm = document.getElementById('answer-form');
const nextBtn = document.getElementById('next-btn');
const scoreBox = document.getElementById('score-box');
const scoreDisplay = document.getElementById('score');

function loadQuestion() {
  answerForm.innerHTML = '';
  const q = questions[currentQuestion];
  questionContainer.textContent = q.question;

  if (q.type === 'single') {
    q.options.forEach(option => {
      const label = document.createElement('label');
      label.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
      answerForm.appendChild(label);
    });
  } else if (q.type === 'multi') {
    q.options.forEach(option => {
      const label = document.createElement('label');
      label.innerHTML = `<input type="checkbox" name="answer" value="${option}"> ${option}`;
      answerForm.appendChild(label);
    });
  } else if (q.type === 'fill') {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'fill';
    input.placeholder = 'Type your answer...';
    input.style.padding = '10px';
    input.style.borderRadius = '8px';
    input.style.border = '1px solid #ccc';
    answerForm.appendChild(input);
  }
}

function checkAnswer() {
  const q = questions[currentQuestion];

  if (q.type === 'single') {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected && selected.value === q.answer) {
      score++;
    }
  } else if (q.type === 'multi') {
    const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(i => i.value);
    if (selected.length === q.answer.length && selected.every(val => q.answer.includes(val))) {
      score++;
    }
  } else if (q.type === 'fill') {
    const userAnswer = document.querySelector('input[name="fill"]').value.trim().toLowerCase();
    if (userAnswer === q.answer.toLowerCase()) {
      score++;
    }
  }
}

nextBtn.addEventListener('click', () => {
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById('quiz-box').classList.add('hidden');
    scoreBox.classList.remove('hidden');
    scoreDisplay.textContent = `${score} / ${questions.length}`;
  }
});

window.onload = loadQuestion;
