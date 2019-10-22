init();
// Global variables
let randomQuestion; 
let randomAlternative;
let progressBarWidth;
let round = 0;
var json;
let loyaltyDataStore = 5;
let satisfactionDataStore = 5;

// Load our JSON file and put in a variable.
function loadJSON() {
  const request = new XMLHttpRequest();
  request.open("get", "./../json/quiz.json");
  request.onload = () => {
    try {
      json = JSON.parse(request.responseText);
      displayQuestion(json);
    } catch (error) {
      console.warn("Could not load JSON ");
    }
  };
  request.send();
};
// load our json data when page start
document.addEventListener("DOMContentLoaded", () => {
  loadJSON();
});

// Generate a random Question and Alternative
function random(params) {
  randomQuestion = Math.floor(Math.random() * 15);
  randomAlternative = Math.floor(Math.random() * 3);
};

function displayQuestion(json) {
  // We start a random function to give us a random number for question and Alternative
  random();
  //Pergunta
  console.log("Questão de numero: " + randomQuestion);

  // We store the JSOn file in a variable
  let randomQuestionJSON = json.banco_questoes[randomQuestion].pergunta;

  let firstRandomAlternativeJSON = json.banco_questoes[randomQuestion].alternativas[0].descricao;

  let secondRandomAlternativeJSON = json.banco_questoes[randomQuestion].alternativas[1].descricao;

  let thirdRandomAlternativeJSON = json.banco_questoes[randomQuestion].alternativas[2].descricao;

  // Display the question and Alternative in UI
  document.getElementById("paragraph").innerHTML = randomQuestionJSON;
  // Alternatives
  document.getElementById("alternative-1").innerHTML = firstRandomAlternativeJSON;

  document.getElementById("alternative-2").innerHTML = secondRandomAlternativeJSON;

  document.getElementById("alternative-3").innerHTML = thirdRandomAlternativeJSON;
};

// We acess the Button
document.getElementById("btn-confirm").addEventListener("click", function() {
  // We store the round
  round++;

  // Here we finish our game after 15 times
  if (round === 15) {
    window.location.href = "./../page-result.html";
    
    return;
   
  };

 

  
  //We start a random function to make rounds unique and acess the values of indicators
  //   randomIndicator(json);
  CheckBoxVerify();
  displayQuestion(json);
  random();
});

function CheckBoxVerify() {
  let check = document.getElementsByName("item");
  document.getElementById("progress-bar-fill-1").style.display = "block";
  document.getElementById("progress-bar-fill-2").style.display = "block";
  for (let i = 0; i < check.length; i++) {
    if (check[0].checked === true) {
      console.log("Quadrado 1");
      // Atribuir um valor do indicador para a alternativa
      // Get satisfaction data from JSON
      let satisfaction = json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.satisfacao;

      // Get loyalty data from JSON
      let loyalty =json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.fidelizacao;

      console.log("Pontos de lealdade: " + loyalty);
      console.log("Pontos de satisfacao: " + satisfaction);
      // Somar esse valor em uma variavel
      loyaltyDataStore = loyaltyDataStore + loyalty;
      satisfactionDataStore = satisfactionDataStore + satisfaction;

      console.log("Loyalty data stored: " + loyaltyDataStore);
      console.log("satisfaction data stored: " + satisfactionDataStore);
      // Atualizar o valor na HUD
      progressBarWidth = document.getElementById("progress-bar-fill-1").style.width;

      if (progressBarWidth === "80%") {
        return;
      }
      document.getElementById("progress-bar-fill-1").style.width =
        satisfactionDataStore.toString() + "%";
      document.getElementById("progress-bar-fill-2").style.width =
        loyaltyDataStore.toString() + "%";

      // console.log(json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.fidelizacao);
      return;
    } else if (check[1].checked === true) {
      console.log("Quadrado 2");
      // Atribuir um valor do indicador para a alternativa
      // Get satisfaction data from JSON
      let satisfaction = json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.satisfacao;

      // Get loyalty data from JSON
      let loyalty =
        json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.fidelizacao;

      console.log("Pontos de lealdade: " + loyalty);
      console.log("Pontos de satisfacao: " + satisfaction);
      // Somar esse valor em uma variavel
      loyaltyDataStore = loyaltyDataStore + loyalty;
      satisfactionDataStore = satisfactionDataStore + satisfaction;

      console.log("Loyalty data stored: " + loyaltyDataStore);
      console.log("satisfaction data stored: " + satisfactionDataStore);
      // Atualizar o valor na HUD
      document.getElementById("progress-bar-fill-1").style.width =
        satisfactionDataStore.toString() + "%";
      document.getElementById("progress-bar-fill-2").style.width =
        loyaltyDataStore.toString() + "%";
      // console.log(json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.fidelizacao);
    } else if (check[2].checked === true) {
      console.log("Quadrado 3");
      // Atribuir um valor do indicador para a alternativa
      // Get satisfaction data from JSON
      let satisfaction = json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.satisfacao;

      // Get loyalty data from JSON
      let loyalty = json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.fidelizacao;

      console.log("Pontos de lealdade: " + loyalty);
      console.log("Pontos de satisfacao: " + satisfaction);
      // Somar esse valor em uma variavel
      loyaltyDataStore = loyaltyDataStore + loyalty;
      satisfactionDataStore = satisfactionDataStore + satisfaction;

      console.log("Loyalty data stored: " + loyaltyDataStore);
      console.log("satisfaction data stored: " + satisfactionDataStore);
      // Atualizar o valor na HUD
      document.getElementById("progress-bar-fill-1").style.width = satisfactionDataStore.toString() + "%";

      document.getElementById("progress-bar-fill-2").style.width = loyaltyDataStore.toString() + "%";
      // console.log(json.banco_questoes[randomQuestion].alternativas[randomAlternative].impacto_indicadores.fidelizacao);
    }
  }
};

function init() {
  document.getElementById("progress-bar-fill-1").style.width = "5px";
  document.getElementById("progress-bar-fill-2").style.width = "5px";
};
