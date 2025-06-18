const perguntas = [
  {
    pergunta: "Quem matou o rei Joffrey em Game of thrones?",
    alternativas: [ "Sansa", "Olenna Tyrell", "Tyrion", "Margaery Tyrell"],
    correta: 1
  },
  {
    pergunta: " A frase -Quem matou Sirius Black?- é dita por quem?",
    alternativas: [ "Harry Potter","Bellatrix Lestrange", "Snape", "Dobby"],
    correta: 1
  },
  {
    pergunta: "Qual a melhor estação?",
    alternativas: ["Inverno", "Verão", "Primavera", "Outono"],
    correta: 0
  },
  {
    pergunta: "Qual o planeta mais próximo do Sol?",
    alternativas: ["Vênus", "Terra", "Mercúrio", "Marte"],
    correta: 2
  },
  {
    pergunta: "Quem pintou a Mona Lisa?",
    alternativas: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"],
    correta: 1
  }
];

let nome = ""; //nome digitado pelo usuário
let indiceAtual = 0; //qual pergunta estamos agora
let acertos = 0; //quantas perguntas ele acertou
let tempos = []; // lista para guardar quanto tempo ele levou em cada pergunta
let tempoRestante = 5; //começa com 5 segundos
let intervalo; // controle do cronômetro
let tempoInicio; //momento em que a pergunta foi exibida

function tocarAPartirDos6Segundos() {
  const musica = document.getElementById("musicaQuiz");

  // Garante que o currentTime só seja definido após o carregamento dos metadados
  musica.addEventListener("loadedmetadata", () => {
    musica.currentTime = 5; // Vai direto pro segundo 6
    musica.play();          // Toca a partir daí
  }, { once: true });

  // Força o carregamento dos metadados
  musica.load();
}

function iniciarQuiz() {
  
  nome = document.getElementById("nomeUsuario").value.trim();
  if (!nome) {
    alert("Por favor, digite seu nome!");
    return;
  }
  tocarAPartirDos6Segundos();
  document.getElementById("inicio").style.display = "none"; // esconde a tela de inicio
  document.getElementById("quiz").style.display = "block"; // mostra quiz
  document.getElementById("saudacao").textContent = `Boa sorte, ${nome}!`;
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = perguntas[indiceAtual];
  //mostra qual número da pergunta está e o texto
  document.getElementById("pergunta").textContent = `Pergunta ${indiceAtual + 1}/${perguntas.length}: ${p.pergunta}`;
  //Pega o espaço das alternativas e limpa ele
  const alternativasDiv = document.getElementById("alternativas");
  alternativasDiv.innerHTML = "";
  //criando os botões das alternativas
  p.alternativas.forEach((alt, i) => {  //percorre cada alternativa
    const btn = document.createElement("button"); //cria botao
    btn.textContent = alt; 
    btn.onclick = () => responder(i); 
    alternativasDiv.appendChild(btn);
  });
 // timer da pergunta
  tempoRestante = 5;
  document.getElementById("contador").textContent = tempoRestante;
  tempoInicio = Date.now();
  intervalo = setInterval(contarTempo, 1000);
}

function contarTempo() {
  tempoRestante--; //diminui 1 segundo
  document.getElementById("contador").textContent = tempoRestante;
  if (tempoRestante <= 0) {
    clearInterval(intervalo);
    responder(null); // não respondeu a tempo
  }
}

function responder(respostaSelecionada) {
  clearInterval(intervalo); //para o cronômetro
  const tempoResposta = (Date.now() - tempoInicio) / 1000;
  tempos.push(tempoResposta);

  if (respostaSelecionada === perguntas[indiceAtual].correta) {
    acertos++;
  }

  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "block";
  const mediaTempo = (tempos.reduce((a, b) => a + b, 0) / tempos.length).toFixed(1);
  document.getElementById("acertos").textContent = `Acertos: ${acertos}/${perguntas.length}`;
  document.getElementById("tempoMedio").textContent = `Tempo médio: ${mediaTempo} s`;
}

function reiniciarQuiz() {
  indiceAtual = 0;
  acertos = 0;
  tempos = [];
  document.getElementById("resultado").style.display = "none";
  document.getElementById("quiz").style.display = "block";
 mostrarPergunta();
}
