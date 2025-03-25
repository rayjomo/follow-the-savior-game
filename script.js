// Game Data
const actionCards = [
  { 
    text: "Jesus says, 'Come, follow Me!' Move ahead 2 spaces.", 
    points: 1,
    isPhysical: false // No confirmation needed
  },
  { 
    text: "Walk on Water! Balance a book on your head for 5 seconds.", 
    points: 2,
    isPhysical: true // Requires confirmation
  },
  { 
    text: "Heal the Sick! Touch a friend's shoulder and say, 'Be healed!'", 
    points: 1,
    isPhysical: true 
  },
  { 
    text: "Preach the Gospel! Say John 3:16 out loud.", 
    points: 1,
    isPhysical: false 
  }
];

const quizCards = [
  { question: "Name two fishermen disciples.", answer: "peter,andrew,james,john", points: 2 },
  { question: "What was Matthew's job?", answer: "tax collector", points: 2 }
];

// Game Variables
let score = 0;
let usedQuizCards = [];

// DOM Elements
const scoreDisplay = document.getElementById("score");
const cardDisplay = document.getElementById("card-display");
const drawButton = document.getElementById("draw-card");
const messageDisplay = document.getElementById("message");

// Draw Card Function
drawButton.addEventListener("click", () => {
  if (score >= 10) return;

  // 70% action card, 30% quiz card (if available)
  const isQuizCard = Math.random() < 0.3 && quizCards.length > usedQuizCards.length;

  if (isQuizCard) {
    const availableQuizzes = quizCards.filter((_, index) => !usedQuizCards.includes(index));
    const randomQuiz = availableQuizzes[Math.floor(Math.random() * availableQuizzes.length)];
    const quizIndex = quizCards.indexOf(randomQuiz);
    usedQuizCards.push(quizIndex);

    const userAnswer = prompt(randomQuiz.question);
    if (userAnswer && randomQuiz.answer.toLowerCase().includes(userAnswer.toLowerCase())) {
      score += randomQuiz.points;
      messageDisplay.textContent = `✅ Correct! +${randomQuiz.points} Points`;
    } else {
      messageDisplay.textContent = `❌ Answer: ${randomQuiz.answer}`;
    }
  } else {
    // Action card
    const randomAction = actionCards[Math.floor(Math.random() * actionCards.length)];
    cardDisplay.textContent = randomAction.text;

    if (randomAction.isPhysical) {
      const confirmed = confirm("Did you complete the physical challenge?\nClick OK if yes!");
      if (confirmed) {
        score += randomAction.points;
        messageDisplay.textContent = `🎉 Challenge completed! +${randomAction.points} Points`;
      } else {
        messageDisplay.textContent = "Keep practicing! Try again next time.";
      }
    } else {
      // Non-physical actions auto-complete
      score += randomAction.points;
      messageDisplay.textContent = `✨ +${randomAction.points} Point(s)`;
    }
  }

  // Update UI
  scoreDisplay.textContent = `Score: ${score}`;

  // Win condition
  if (score >= 10) {
    cardDisplay.innerHTML = `
      <h2>🎉 You Win! 🎉</h2>
      <p>"Well done, good and faithful servant!" (Matthew 25:23)</p>
      <button onclick="location.reload()">Play Again</button>
    `;
    drawButton.disabled = true;
  }
});
