// Game Data
const actionCards = [
  "Jesus says, 'Come, follow Me!' Move ahead 2 spaces.",
  "You hesitated like Peter sinking in the water. Pause 1 turn.",
  "Act out Matthew leaving his tax booth. If others guess correctly, move 3 spaces!",
  "Preach the Gospel! Recite John 3:16 to gain 1 point.",
  "Walk on Water! Balance a book on your head for 5 seconds to gain 2 points."
];

const quizCards = [
  { question: "Name two disciples who were fishermen.", answer: "Peter, Andrew, James, John" },
  { question: "What was Matthew's job before following Jesus?", answer: "Tax collector" },
  { question: "How many loaves fed the 5,000?", answer: "5" }
];

// Game Variables
let score = 0;
const scoreDisplay = document.getElementById("score");
const cardDisplay = document.getElementById("card-display");
const drawButton = document.getElementById("draw-card");
const messageDisplay = document.getElementById("message");

// Draw a Random Card
drawButton.addEventListener("click", () => {
  // Randomly choose between Action or Quiz card (50/50 chance)
  const isQuizCard = Math.random() > 0.5;

  if (isQuizCard && quizCards.length > 0) {
    const randomQuiz = quizCards[Math.floor(Math.random() * quizCards.length)];
    const userAnswer = prompt(randomQuiz.question);
    if (userAnswer && randomQuiz.answer.toLowerCase().includes(userAnswer.toLowerCase())) {
      score++;
      messageDisplay.textContent = "Correct! +1 Point";
    } else {
      messageDisplay.textContent = `Almost! The answer was: ${randomQuiz.answer}`;
    }
  } else {
    const randomAction = actionCards[Math.floor(Math.random() * actionCards.length)];
    cardDisplay.textContent = randomAction;
    messageDisplay.textContent = "Complete the challenge!";
  }

  scoreDisplay.textContent = `Score: ${score}`;

  // Check for win
  if (score >= 10) {
    cardDisplay.innerHTML = "<h2>🎉 You Win! 🎉</h2><p>Jesus says, 'Well done, good and faithful servant!'</p>";
    drawButton.disabled = true;
  }
});