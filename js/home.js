"use strict"; // PARA O JavaScript SER MAIS RIGOROSO avisar quando eu estiver fazendo algumas coisas de maneira incorreta



// Procura no HTML o elemento que possui  o ID "total-treinos".
const totalTreinos = document.querySelector("#total-treinos");

// Procura no HTML o elemento que mostra o tempo total treinado.
const tempoTreinado = document.querySelector("#tempo-treinado");

// Procura no HTML o elemento que mostra o último trino 
const ultimoTreino = document.querySelector("#ultimo-treino");





/*==================
CARD TOTAL DE TREINOS 
=====================*/


// Recupera os treinos salvos no navegador. Se ainda não existir nenhum treino, usamos um array vazio.
const treinosSalvos = JSON.parse(localStorage.getItem("treinos")) || [];

// Conta quantos treinos existem no array.
const quantidadeTreinos = treinosSalvos.length;

// Atualiza o número mostrado no card.
totalTreinos.textContent = quantidadeTreinos;


/* ===================
CARD FAVORITO EM BREVE
===================== */



/* =====================
CARD TEMPO        
======================= */
const historicoTreinos = JSON.parse(
    localStorage.getItem("historicoTreinos")
) || [];

let somaTempo = 0; //começa em zero e acumulará a duração dessas sessões.

//percorrer o histórico
historicoTreinos.forEach(function(sessao){
    somaTempo += Number(sessao.duracaoSegundos);
});

//converter os segundos acumulados em horas e minutos.

// Calcula as horas completas.
const horas = Math.floor(somaTempo / 3600);

//calcula os minutos restantes.
const minutos = Math.floor((somaTempo % 3600) / 60);

//Atualizando o tempo treinado no navegador

tempoTreinado.textContent = `${horas}h ${minutos}min `;

//Card último treino ou (Sessão)
const ultimaSessao = historicoTreinos[historicoTreinos.length - 1];

//tratar o caso em que não existe nenhum treino concluído.
if(ultimaSessao) {

    const data = new Date(ultimaSessao.dataConclusao);

    ultimoTreino.textContent = data.toLocaleDateString("pt-BR");

} else {
    ultimoTreino.textContent  = "--";
}