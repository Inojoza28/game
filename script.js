// Dentro da função startGame()
document.getElementById("questionNumber").style.display = "inline"; // ou "block"
document.getElementById("totalQuestions").style.display = "inline"; // ou "block"

// Variáveis globais
let currentQuestionIndex = 0;
let currentPhaseIndex = 0;
let score = 0;
let timer;
const timePerQuestion = 10; // Tempo em segundos por pergunta
const phases = [
    {
        difficulty: "Fácil",
        questions: [
            { 
                question: "45 + 35 =", 
                options: ["65", "70", "80", "85"], 
                answer: "80"
            },
            { 
                question: "5 x 7 =", 
                options: ["35", "25", "30", "40"], 
                answer: "35"
            },
            { 
                question: "75 ÷ 5 =", 
                options: ["25", "15", "30", "20"], 
                answer: "15"
            },
            // Adicione mais perguntas fáceis aqui
        ]
    },
    {
        difficulty: "Médio",
        questions: [
            { 
                question: "31 + 21 + 12 =", 
                options: ["64", "54", "68", "49"], 
                answer: "64"
            },
            { 
                question: "12 - 7 + 50 =", 
                options: ["59", "61", "55", "63"], 
                answer: "55"
            },
            // Adicione mais perguntas médias aqui
        ]
    },
    {
        difficulty: "Difícil",
        questions: [
            { 
                question: "5 + 4 x 2 =", 
                options: ["18", "13", "21", "15"], 
                answer: "13"
            },
            { 
                question: "20 - 45 ÷ 5 =", 
                options: ["-5", "8", "5", "11"], 
                answer: "11"
            },
            // Adicione mais perguntas difíceis aqui
        ]
    }
];
// Função para iniciar o jogo
function startGame() {
  // Calcular a quantidade total de perguntas em todos os níveis de dificuldade
  let totalQuestions = 0;
  for (let i = 0; i < phases.length; i++) {
      totalQuestions += phases[i].questions.length;
  }

  // Esconder o botão de iniciar
  document.getElementById("startButton").style.display = "none";
  // Exibir a área do jogo
  document.getElementById("gameArea").style.display = "block";
  
  // Exibir a primeira pergunta
  displayQuestion();
}

// Função para exibir a próxima pergunta
function nextQuestion() {
  const currentPhase = phases[currentPhaseIndex];
  if (currentQuestionIndex < currentPhase.questions.length - 1) {
      currentQuestionIndex++;
  } else {
      // Se chegou ao final da fase, verifica se o jogo acabou ou avança para a próxima fase
      if (currentPhaseIndex < phases.length - 1) {
          currentPhaseIndex++;
          currentQuestionIndex = 0;
      } else {
          displayScore();
          return; // Termina a função
      }
  }
  // Exibir a próxima pergunta
  displayQuestion();
}

// Variável global para contar o número total de questões respondidas
let totalQuestionsAnswered = 0;

// Função para iniciar o jogo
function startGame() {
    // Esconder o botão de iniciar
    document.getElementById("startButton").style.display = "none";
    // Exibir a área do jogo
    document.getElementById("gameArea").style.display = "block";
    // Exibir a primeira pergunta
    displayQuestion();
}

// Função para exibir a próxima pergunta
function nextQuestion() {
    const currentPhase = phases[currentPhaseIndex];
    if (currentQuestionIndex < currentPhase.questions.length - 1) {
        currentQuestionIndex++;
    } else {
        // Se chegou ao final da fase, verifica se o jogo acabou ou avança para a próxima fase
        if (currentPhaseIndex < phases.length - 1) {
            currentPhaseIndex++;
            currentQuestionIndex = 0;
        } else {
            displayScore();
            return; // Termina a função
        }
    }
    // Incrementar o contador de questões respondidas
    totalQuestionsAnswered++;
    // Exibir a próxima pergunta
    displayQuestion();
}

// Função para exibir a pergunta atual
function displayQuestion() {
    const currentPhase = phases[currentPhaseIndex];
    const currentQuestion = currentPhase.questions[currentQuestionIndex];
    
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const questionNumberElement = document.getElementById("questionNumber");
    const totalQuestionsElement = document.getElementById("totalQuestions");
    const currentLevelElement = document.getElementById("currentLevel");

    // Preencher os elementos com os dados da pergunta
    questionElement.textContent = currentQuestion.question;
    questionNumberElement.textContent = totalQuestionsAnswered + 1; // Usar o contador global de questões respondidas
    totalQuestionsElement.textContent = getTotalQuestions();
    currentLevelElement.textContent = currentPhase.difficulty;

    // Limpar as opções anteriores
    optionsElement.innerHTML = "";
    // Criar botões para as opções de resposta
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", function() {
            checkAnswer(option, currentQuestion.answer);
        });
        optionsElement.appendChild(button);
    });

    // Iniciar o cronômetro
    startTimer();
}

// Função para calcular a quantidade total de perguntas em todos os níveis de dificuldade
function getTotalQuestions() {
    let total = 0;
    for (let i = 0; i < phases.length; i++) {
        total += phases[i].questions.length;
    }
    return total;
}


// Função para verificar a resposta selecionada e avançar para a próxima pergunta
function checkAnswer(selectedAnswer, correctAnswer) {
    // Parar o cronômetro
    clearInterval(timer);

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    // Avança para a próxima pergunta
    nextQuestion();
}

// Função para exibir a pontuação final
function displayScore() {
  const container = document.querySelector('.container');
  container.innerHTML = "<h1>Pontuação Final</h1><p>Pontuação Máxima: 7 "  + "</p><p>Sua pontuação: " + score + "</p>";


// Adiciona o elemento SVG à div de pontuação final
const svgIcon = document.createElement("div");
svgIcon.classList.add("svg-icon");
svgIcon.innerHTML = `
    <svg class="svg-icon" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
        <path d="M62.11,53.93c22.582-3.125,22.304-23.471,18.152-29.929-4.166-6.444-10.36-2.153-10.36-2.153v-4.166H30.099v4.166s-6.194-4.291-10.36,2.153c-4.152,6.458-4.43,26.804,18.152,29.929l5.236,7.777v8.249s-.944,4.597-4.833,4.986c-3.903,.389-7.791,4.028-7.791,7.374h38.997c0-3.347-3.889-6.986-7.791-7.374-3.889-.389-4.833-4.986-4.833-4.986v-8.249l5.236-7.777Zm7.388-24.818s2.833-3.097,5.111-1.347c2.292,1.75,2.292,15.86-8.999,18.138l3.889-16.791Zm-44.108-1.347c2.278-1.75,5.111,1.347,5.111,1.347l3.889,16.791c-11.291-2.278-11.291-16.388-8.999-18.138Z" fill="#ffd700">
        </path>
    </svg>
    <div class="container__star">
        <div class="star-eight"></div>
    </div>
`;
container.appendChild(svgIcon);

}


// Função para iniciar o cronômetro
function startTimer() {
  let timeLeft;

  // Determina o tempo com base no nível de dificuldade atual
  switch (phases[currentPhaseIndex].difficulty) {
      case "Fácil":
          timeLeft = 20;
          break;
      case "Médio":
          timeLeft = 15;
          break;
      case "Difícil":
          timeLeft = 10;
          break;
      default:
          timeLeft = 10; // Tempo padrão
  }

  const timerElement = document.getElementById("timer");
  timerElement.textContent = timeLeft;

  timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft === 0) {
          clearInterval(timer);
          nextQuestion(); // Avança para a próxima pergunta
      }
  }, 1000);
}


