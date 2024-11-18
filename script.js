let currentProblemIndex = 0;
let incorrectAttempts = 0;
let startTime = 0; // To track time on each question
let totalTime = 0; // To track total time spent on the quiz

const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");
const answerInput = document.getElementById("answer-input");
const feedbackDiv = document.getElementById("feedback-div");
const problemDiv = document.getElementById("problem-div");
const exportBtn = document.getElementById("export-btn");

const problems = [
  // Alternating Addition and Subtraction Problems with Proper Fractions Only

  // Addition Problems
  {
    question: "You need 1/4 cup of sugar and 1/3 cup of flour. How much do you have in total?",
    answer: "7/12",
    tip: "Remember, you need a common denominator to add fractions. For 1/4 and 1/3, the least common denominator is 12.",
    explanation: "To add fractions with different denominators, find the least common denominator (LCD). For 1/4 and 1/3, the LCD is 12, so convert both fractions to have this denominator before adding."
  },

  // Subtraction Problems
  {
    question: "The recipe needs 2/5 cup of oil, but you only have 1/3. How much more do you need?",
    answer: "1/15",
    tip: "To subtract fractions, find a common denominator first. For 2/5 and 1/3, the least common denominator is 15.",
    explanation: "To subtract fractions with different denominators, first find the LCD. For 2/5 and 1/3, the LCD is 15, so convert both fractions to have this denominator before subtracting."
  },

  // Addition Problems
  {
    question: "You need 1/2 cup of milk and 1/4 cup of cream. How much do you need in total?",
    answer: "3/4",
    tip: "Find a common denominator to add these fractions. The least common denominator for 1/2 and 1/4 is 4.",
    explanation: "Convert both fractions to have a denominator of 4, then add the numerators together."
  },

  // Subtraction Problems
  {
    question: "You added 3/8 cup of milk, but the recipe calls for 1/2 cup. How much more do you need to add?",
    answer: "1/8",
    tip: "Convert 1/2 into an equivalent fraction with denominator 8: 1/2 = 4/8.",
    explanation: "When subtracting fractions, make sure both fractions have the same denominator. Convert 1/2 to 4/8, then subtract 3/8 from 4/8."
  },

  // Addition Problems
  {
    question: "You need 3/4 cup of chocolate chips and 2/5 cup of walnuts. How much do you need in total?",
    answer: "23/20",
    tip: "To add these fractions, find the least common denominator. For 3/4 and 2/5, the least common denominator is 20.",
    explanation: "Convert both fractions to have a denominator of 20, then add the numerators together."
  },

  // Subtraction Problems
  {
    question: "You need 7/10 cup of cream, but you only have 3/5. How much more do you need?",
    answer: "1/10",
    tip: "Convert 3/5 to 6/10 before subtracting it from 7/10.",
    explanation: "Convert both fractions to the same denominator and subtract them to find how much more cream is needed."
  },

  // Addition Problems
  {
    question: "You need 5/6 cup of sugar and 1/2 cup of flour. How much do you need in total?",
    answer: "8/6",
    tip: "Find a common denominator for 5/6 and 1/2. The least common denominator is 6.",
    explanation: "Convert 1/2 to 3/6 and then add 5/6 and 3/6 to get the total."
  },

  // Subtraction Problems
  {
    question: "You need 3/4 cup of chocolate chips, but you only have 2/3 cup. How much more do you need?",
    answer: "1/12",
    tip: "Find a common denominator to subtract these fractions. The least common denominator for 3/4 and 2/3 is 12.",
    explanation: "To find how much more you need, subtract 2/3 from 3/4. Convert both fractions to have a denominator of 12."
  },

  // Addition Problems
  {
    question: "The recipe calls for 3/8 cup of butter and 1/4 cup of oil. How much do you need in total?",
    answer: "5/8",
    tip: "Find a common denominator to add the fractions. The least common denominator for 3/8 and 1/4 is 8.",
    explanation: "Convert 1/4 to 2/8, then add 3/8 and 2/8 to get the total."
  }
];

const studentData = []; // To store the student's attempt data

startBtn.addEventListener("click", () => {
  document.getElementById("story-screen").style.display = "none";
  document.getElementById("problem-screen").style.display = "block";
  loadProblem();
});

function loadProblem() {
  const currentProblem = problems[currentProblemIndex];
  problemDiv.textContent = currentProblem.question;
  feedbackDiv.textContent = "";
  answerInput.value = "";
  startTime = Date.now(); // Record start time for this question
}

submitBtn.addEventListener("click", () => {
  const userAnswer = answerInput.value.trim();
  const currentProblem = problems[currentProblemIndex];
  const correctAnswer = currentProblem.answer;

  if (fractionsEqual(userAnswer, correctAnswer)) {
    feedbackDiv.textContent = "Correct! 🎉";
    feedbackDiv.style.color = "lime";
    currentProblemIndex++;
    incorrectAttempts = 0;

    const timeSpent = Date.now() - startTime; // Calculate time spent on the question
    totalTime += timeSpent;

    // Store student data
    studentData.push({
      problem: currentProblem.question,
      userAnswer,
      correctAnswer,
      timeSpent,
      attempts: incorrectAttempts + 1
    });

    if (currentProblemIndex < problems.length) {
      setTimeout(loadProblem, 2000);
    } else {
      setTimeout(() => {
        feedbackDiv.textContent = "Well done! You've completed the simulation! 🎂";
        problemDiv.textContent = "";
        answerInput.disabled = true;
        exportBtn.style.display = "block"; // Show export button
      }, 2000);
    }
  } else {
    feedbackDiv.textContent = "Try again! 😔";
    feedbackDiv.style.color = "red";
    incorrectAttempts++;

    const tipDiv = document.createElement("p");
    tipDiv.textContent = `Hint: ${currentProblem.tip}`;
    tipDiv.style.color = "blue";
    feedbackDiv.appendChild(tipDiv);

    retryBtn.style.display = "block";

    if (incorrectAttempts >= 3) {
      const detailedExplanationDiv = document.createElement("p");
      detailedExplanationDiv.textContent = `Explanation: ${currentProblem.explanation}`;
      detailedExplanationDiv.style.color = "purple";
      feedbackDiv.appendChild(detailedExplanationDiv);
    }
  }
});

retryBtn.addEventListener("click", () => {
  feedbackDiv.textContent = "";
  retryBtn.style.display = "none";
  answerInput.value = "";
});

function fractionsEqual(fraction1, fraction2) {
  const [numerator1, denominator1] = fraction1.split("/").map(Number);
  const [numerator2, denominator2] = fraction2.split("/").map(Number);

  if (denominator1 === denominator2) {
    return numerator1 === numerator2;
  }

  const lcm = (denominator1 * denominator2) / gcd(denominator1, denominator2);
  const adjustedNumerator1 = numerator1 * (lcm / denominator1);
  const adjustedNumerator2 = numerator2 * (lcm / denominator2);

  return adjustedNumerator1 === adjustedNumerator2;
}

function gcd(a, b) {
  if (!b) return a;
  return gcd(b, a % b);
}

exportBtn.addEventListener("click", () => {
  const ws = XLSX.utils.json_to_sheet(studentData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Results");
  XLSX.writeFile(wb, "baking_simulation_results.xlsx");
});
