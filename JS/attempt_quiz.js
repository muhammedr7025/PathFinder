const questionElement = document.getElementById("qn-section");
const optionElement = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("qn-btn");
const balanceQn = document.getElementById("balance-qn");
const introContent = document.getElementById("intro-content");
const quizContent = document.getElementById("quiz-content");
const resultContent = document.getElementById("result-content");
const resultMessage = document.getElementById("result-message");
const startBtn = document.getElementById("start-btn");

let currentQnIndex = 0;
let scores = { A: 0, B: 0, C: 0, D: 0 }; // Tracking each option score
let selectedAnswers = []; // Array to store selected answers for each question
let noneSelectedForAll = true; // Flag to check if "None of the above" was selected for all questions

// Questions array with provided data
const questions = [
  {
    question: "What kind of activities do you enjoy the most?",
    options: [
      { text: "Building or crafting physical projects and experimenting with new materials.", type: "A" },
      { text: "Coding and creating software solutions or working with technology.", type: "B" },
      { text: "Designing visual elements, user interfaces, or developing creative content.", type: "C" },
      { text: "Managing projects, understanding market needs, or exploring new knowledge areas.", type: "D" },
      { text: "None of the above", type: "None" },
    ],
  },
  {
    question: "Which of the following skills do you want to improve or develop?",
    options: [
      { text: "Robotics, 3D printing, or IoT-based projects.", type: "A" },
      { text: "Programming, debugging, or developing new applications and algorithms.", type: "B" },
      { text: "Visual communication, UX/UI design, or multimedia creation.", type: "C" },
      { text: "Leadership, marketing, research, or analysis skills.", type: "D" },
      { text: "None of the above", type: "None" },
    ],
  },
  {
    question: "How do you approach problem-solving?",
    options: [
      { text: "By physically experimenting, creating prototypes, and iterating based on testing.", type: "A" },
      { text: "By writing code, creating logical solutions, and troubleshooting issues.", type: "B" },
      { text: "By brainstorming creative approaches, sketching, or creating visual solutions.", type: "C" },
      { text: "By analyzing the problem holistically, researching, and planning solutions with strategic thinking.", type: "D" },
      { text: "None of the above", type: "None" },
    ],
  },
  {
    question: "Which tools or resources are you most interested in using or learning?",
    options: [
      { text: "Electronic components, fabrication tools, robotics kits.", type: "A" },
      { text: "Programming languages, development frameworks, software tools.", type: "B" },
      { text: "Graphic design tools, wireframing software, creative suites.", type: "C" },
      { text: "Business models, research papers, management tools, or policy frameworks.", type: "D" },
      { text: "None of the above", type: "None" },
    ],
  },
  {
    question: "What kind of project excites you the most?",
    options: [
      { text: "Creating a new physical device, electronic gadget, or automated system.", type: "A" },
      { text: "Developing an app, creating a software tool, or building a machine learning model.", type: "B" },
      { text: "Designing a logo, improving a website’s user experience, or making digital illustrations.", type: "C" },
      { text: "Organizing an event, analyzing data trends, developing a new business idea.", type: "D" },
      { text: "None of the above", type: "None" },
    ],
  },
  {
    question: "Which statement resonates most with your aspirations?",
    options: [
      { text: "I want to bring my ideas to life by building things with my hands.", type: "A" },
      { text: "I want to create impactful digital solutions and applications.", type: "B" },
      { text: "I want to communicate stories and ideas through design and visuals.", type: "C" },
      { text: "I want to lead, strategize, and innovate to solve broader problems.", type: "D" },
      { text: "None of the above", type: "None" },
    ],
  },
  {
    question: "What kind of learning environment or approach do you prefer?",
    options: [
      { text: "Hands-on workshops, labs, and physical prototyping spaces.", type: "A" },
      { text: "Coding boot camps, hackathons, and tech communities.", type: "B" },
      { text: "Design studios, creative brainstorming sessions, or collaborative art projects.", type: "C" },
      { text: "Business incubators, discussion forums, and research seminars.", type: "D" },
      { text: "None of the above", type: "None" },
    ],
  },
  {
    question: "When working on a project, what role do you see yourself taking?",
    options: [
      { text: "Building, crafting, and improving the physical components.", type: "A" },
      { text: "Writing code, implementing software solutions, or automating processes.", type: "B" },
      { text: "Creating visual layouts, branding elements, or engaging user experiences.", type: "C" },
      { text: "Coordinating efforts, conducting market research, or devising strategies.", type: "D" },
      { text: "None of the above", type: "None" },
    ],
  }
];


// Start button event listener
startBtn.addEventListener("click", () => {
  introContent.style.display = "none"; // Hide intro content
  quizContent.style.display = "block"; // Show quiz content
  startQuiz();
});

// Start quiz
function startQuiz() {
  currentQnIndex = 0;
  scores = { A: 0, B: 0, C: 0, D: 0 }; // Reset scores
  noneSelectedForAll = true; // Reset the flag at the beginning of the quiz
  showQn();
}

// Show question
function showQn() {
  resetState();
  const currentQn = questions[currentQnIndex];
  questionElement.innerHTML = currentQn.question;
  currentQn.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerHTML = option.text;
    button.classList.add("qn-option");
    button.dataset.type = option.type;
    button.addEventListener("click", () => selectAnswer(button));
    optionElement.appendChild(button);
  });
  balanceQn.innerHTML = `${currentQnIndex + 1} of ${questions.length}`;
}

// Reset options and selections
function resetState() {
  nextBtn.style.display = "none"; // Hide next button initially
  selectedAnswers = [];
  while (optionElement.firstChild) {
    optionElement.removeChild(optionElement.firstChild);
  }
}

// Select answer with multiple selection and "None of the above" logic
function selectAnswer(selectedButton) {
  const type = selectedButton.dataset.type;

  // If "None of the above" is selected, proceed to next question immediately
  if (type === "None") {
    selectedAnswers = ["None"];
    nextBtn.style.display = "block";
    nextBtn.click(); // Automatically go to the next question
    return;
  }

  // If another option is selected after "None of the above," clear "None of the above"
  selectedAnswers = selectedAnswers.includes("None") ? [] : selectedAnswers;

  // Toggle selection for other options
  if (selectedAnswers.includes(type)) {
    selectedAnswers = selectedAnswers.filter((a) => a !== type);
    selectedButton.classList.remove("selected");
  } else {
    selectedAnswers.push(type);
    selectedButton.classList.add("selected");
  }

  nextBtn.style.display = "block"; // Show the Next button after any selection
}

// Handle next button and calculate scores
nextBtn.addEventListener("click", () => {
  // Check if only "None of the above" was selected
  if (selectedAnswers.includes("None") && selectedAnswers.length === 1) {
    noneSelectedForAll = noneSelectedForAll && true;
  } else {
    noneSelectedForAll = false; // Set flag to false if any other option is selected
  }

  // Increment scores for each selected type (excluding "None")
  selectedAnswers.forEach((type) => {
    if (type !== "None") scores[type] += 1;
  });

  currentQnIndex++;
  if (currentQnIndex < questions.length) {
    showQn();
  } else {
    showResult(); // Show result at the end
  }
});

// Show result based on highest scores or "None of the above" selection for all questions
function showResult() {
  quizContent.style.display = "none";
  resultContent.style.display = "block";

  if (noneSelectedForAll) {
    resultMessage.innerHTML = "You indicated 'None of the above' for all questions. It appears you may not have a strong interest in any of the listed fields.";
  } else {
    // List all fields with scores of 1 or higher as interests
    let resultFields = [];

    if (scores.A >= 3) resultFields.push("Maker");
    if (scores.B >= 3) resultFields.push("Coder");
    if (scores.C >= 3) resultFields.push("Designer");
    if (scores.D >= 3) resultFields.push("Managment");

    // Display result message based on identified interests
    resultMessage.innerHTML = `Your interests span the following pathways: ${resultFields.join(", ")}. ${
      resultFields.length > 1
        ? "You have a versatile set of interests!"
        : `You are primarily interested in ${resultFields[0]} activities.`
    }`;
  }
}
