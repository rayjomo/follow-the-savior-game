// ========== GAME DATA ==========
const actionCards = [
  { 
    text: "Jesus says, 'Come, follow Me!' (Matthew 4:19)", 
    points: 1,
    isPhysical: false 
  },
  { 
    text: "Walk on Water! Balance a book on your head for 5 seconds.", 
    points: 2,
    isPhysical: true 
  },
  { 
    text: "Heal the Sick! Touch a friend's shoulder and say, 'Be healed!'", 
    points: 1,
    isPhysical: true 
  },
  { 
    text: "Preach the Gospel! Quote John 3:16 from memory.", 
    points: 1,
    isPhysical: false 
  },
  { 
    text: "Leave Everything! Give another player one of your tokens.", 
    points: 2,
    isPhysical: true 
  }
];

const quizCards = [
  { 
    question: "Name two fishermen disciples.", 
    answer: "peter,andrew,james,john", 
    points: 2 
  },
  { 
    question: "What was Matthew's job before following Jesus?", 
    answer: "tax collector", 
    points: 2 
  },
  { 
    question: "How many loaves fed the 5,000?", 
    answer: "5", 
    points: 1 
  }
];

// ========== GAME STATE ==========
let score = 0;
let usedQuizCards = [];
let currentActionCard = null;

// ========== DOM ELEMENTS ==========
const scoreDisplay = document.getElementById("score");
const cardDisplay = document.getElementById("card-display");
const drawButton = document.getElementById("draw-card");
const messageDisplay = document.getElementById("message");
const physicalChallengeUI = document.getElementById("physical-challenge-ui");
const challengeText = document.getElementById("challenge-text");
const completeBtn = document.getElementById("complete-challenge");
const skipBtn = document.getElementById("skip-challenge");

// ========== PHYSICAL CHALLENGE HANDLERS ==========
completeBtn.addEventListener("click", () => {
  if (currentActionCard) {
    score += currentActionCard.points;
    messageDisplay.textContent = `✅ Completed! +${currentActionCard.points} Points`;
    physicalChallengeUI.style.display = "none";
    updateGame();
  }
});

skipBtn.addEventListener("click", () => {
  messageDisplay.textContent = "⏩ Challenge skipped";
  physicalChallengeUI.style.display = "none";
});

// ========== MAIN GAME LOGIC ==========
drawButton.addEventListener("click", () => {
  if (score >= 10) return;

  // 30% chance for quiz card (if available)
  const isQuizCard = Math.random() < 0.3 && quizCards.length > usedQuizCards.length;

  if (isQuizCard) {
    handleQuizCard();
  } else {
    handleActionCard();
  }
});

function handleQuizCard() {
  const availableQuizzes = quizCards.filter((_, index) => !usedQuizCards.includes(index));
  const randomQuiz = availableQuizzes[Math.floor(Math.random() * availableQuizzes.length)];
  const quizIndex = quizCards.indexOf(randomQuiz);
  
  usedQuizCards.push(quizIndex);
  const userAnswer = prompt(randomQuiz.question);
  
  if (userAnswer && randomQuiz.answer.toLowerCase().includes(userAnswer.toLowerCase())) {
    score += randomQuiz.points;
    messageDisplay.textContent = `🙌 Correct! +${randomQuiz.points} Points`;
  } else {
    messageDisplay.textContent = `📖 Answer: ${randomQuiz.answer}`;
  }
  
  updateGame();
}

function handleActionCard() {
  const randomAction = actionCards[Math.floor(Math.random() * actionCards.length)];
  cardDisplay.textContent = randomAction.text;

  if (randomAction.isPhysical) {
    // Show physical challenge UI
    currentActionCard = randomAction;
    challengeText.textContent = randomAction.text;
    physicalChallengeUI.style.display = "block";
    messageDisplay.textContent = "Complete the challenge below!";
  } else {
    // Auto-complete non-physical actions
    score += randomAction.points;
    messageDisplay.textContent = `✨ +${randomAction.points} Point(s)`;
    updateGame();
  }
}

function updateGame() {
  scoreDisplay.textContent = `Score: ${score}`;
  
  // Win condition
  if (score >= 10) {
    cardDisplay.innerHTML = `
      <h2>🎉 Victory! 🎉</h2>
      <p>"Well done, good and faithful servant!" (Matthew 25:23)</p>
      <button onclick="location.reload()">Play Again</button>
    `;
    drawButton.disabled = true;
    physicalChallengeUI.style.display = "none";
  }
}
