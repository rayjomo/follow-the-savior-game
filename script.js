// Updated Game Data
const actionCards = [
  { text: "Jesus says, 'Come, follow Me!' Move ahead 2 spaces.", points: 1 },
  { text: "Preach the Gospel! Recite John 3:16 to gain 1 point.", points: 1 },
  { text: "Walk on Water! Balance a book on your head for 5 seconds.", points: 2 },
  { text: "Heal the Sick! Pretend to touch someone’s shoulder and say, 'Be healed!'", points: 1 }
];

const quizCards = [
  { question: "Name two fishermen disciples.", answer: "peter,andrew,james,john", points: 2 },
  { question: "What was Matthew's job?", answer: "tax collector", points: 2 },
  { question: "How many loaves fed the 5,000?", answer: "5", points: 1 }
];

// Game Variables
let score = 0;
let usedQuizCards = []; // Tracks asked questions to avoid repeats

// DOM Elements
const scoreDisplay = document.getElementById("score");
const cardDisplay = document.getElementById("card-display");
const drawButton = document.getElementById("draw-card");
const messageDisplay = document.getElementById("message");

// Draw Card Function
drawButton.addEventListener("click", () => {
  if (score >= 10) return; // Stop if already won

  // Randomly pick action (70%) or quiz (30%)
  const isQuizCard = Math.random() < 0.3 && quizCards.length > 0;

  if (isQuizCard) {
    // Get a random UNUSED quiz card
    const availableQuizzes = quizCards.filter((_, index) => !usedQuizCards.includes(index));
    if (availableQuizzes.length === 0) {
      messageDisplay.textContent = "No more quiz cards! Draw again.";
      return;
    }
    const randomQuiz = availableQuizzes[Math.floor(Math.random() * availableQuizzes.length)];
    const quizIndex = quizCards.indexOf(randomQuiz);
    usedQuizCards.push(quizIndex);

    const userAnswer = prompt(randomQuiz.question);
    if (userAnswer && randomQuiz.answer.toLowerCase().includes(userAnswer.toLowerCase())) {
      score += randomQuiz.points;
      messageDisplay.textContent = `Correct! +${randomQuiz.points} Points`;
    } else {
      messageDisplay.textContent = `Almost! Answer: ${randomQuiz.answer}`;
    }
  } else {
    // Action card
    const randomAction = actionCards[Math.floor(Math.random() * actionCards.length)];
    cardDisplay.textContent = randomAction.text;
    score += randomAction.points;
    messageDisplay.textContent = `Challenge complete! +${randomAction.points} Point(s)`;
  }

  // Update UI
  scoreDisplay.textContent = `Score: ${score}`;

  // Win condition
  if (score >= 10) {
    cardDisplay.innerHTML = `
      <h2>🎉 You Win! 🎉</h2>
      <p>Jesus says, "Well done, good and faithful servant!" (Matthew 25:23)</p>
      <button onclick="location.reload()">Play Again</button>
    `;
    drawButton.disabled = true;
  }
});
