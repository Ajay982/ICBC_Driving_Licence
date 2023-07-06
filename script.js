const questions =[
    {
        question : "When driving in fog, which of the following can be used instead of headlights?",
        answers: [
            { text: "Flashing Green Lights", correct: false},
            { text: "Flashing Green Lights", correct: false},
            { text: "Amber Lights", correct: false},
            { text: "Fog Lights", correct: true},
        ]
    },
    {
        question : "A driver who has used marijuana may experience all of the following effects EXCEPT",
        answers: [
            { text: "difficulty following the movement of vehicles.", correct: false},
            { text: "misunderstanding visual cues from the driving environment.", correct: false},
            { text: "increased awareness and control of speed.", correct: true},
            { text: "delayed responses in emergency situations.", correct: false},
        ]
    },
    {
        question : "Which of the following are two important strategies for handling emergency driving situations?",
        answers: [
            { text: "Emergency braking and skid control", correct: true},
            { text: "Vehicle balance and gas control", correct: false},
            { text: "Skid control and airbad adjustment", correct: false},
            { text: "Emergency braking and seat belt control", correct: false},
        ]
    },
    {
        question : "What is lane tracking?",
        answers: [
            { text: "Frequently changing lanes", correct: false},
            { text: "Always keeping your vehicle in the center of your lane", correct: false},
            { text: "Driving your vehicle at a safe distance from truck", correct: false},
            { text: "Keeping your vehicle in the correct lane when making a turn", correct: true},
        ]
    },
    {
        question : "If you cannot see ahead while driving because of a hill or a curve, this is known as",
        answers: [
            { text: "a road block.", correct: false},
            { text: "a vision block.", correct: true},
            { text: "a central view block.", correct: false},
            { text: "a lane block.", correct: false},
        ]
    },
    {
        question : "If another driver starts to act aggressively behind the wheel, you should NOT",
        answers: [
            { text: "keep your doors locked and your windows shut.", correct: false},
            { text: "call the police using your phone.", correct: false},
            { text: "go to a police station and a crowded place.", correct: false},
            { text: "make eye contact and return the agression", correct: true},
        ]
    },
    {
        question : "Which of the following lets a driver see to the sides of the vehicle?",
        answers: [
            { text: "Longest vision", correct: false},
            { text: "Low vision", correct: false},
            { text: "Central vision", correct: false},
            { text: "Peripheral vision", correct: true},
        ]
    },
    {
        question : "You are driving on a divided highway. If you miss your exit, what should you do?",
        answers: [
            { text: "Stop and ask for help.", correct: false},
            { text: "Make a U-turn to reach your exit.", correct: false},
            { text: "Continue to the next exit.", correct: true},
            { text: "Back up to reach your exit.", correct: false},
        ]
    },
    {
        question : "Which of the following indicates that the school bus ahead is preparing to stop?",
        answers: [
            { text: "Flashing red lights", correct: false},
            { text: "Sounding horn", correct: false},
            { text: "Flashing headlights.", correct: false},
            { text: "Flashing amber lights", correct: true},
        ]
    },
    {
        question : "What should you do if you are feeling impaired after taking drugs or medications?",
        answers: [
            { text: "Drive but take frequent brakes.", correct: false},
            { text: "Drive slowly.", correct: false},
            { text: "Avoid driving", correct: true},
            { text: "Drive with your radio in.", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
         
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore(); 
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz(); 
    }
})

startQuiz();