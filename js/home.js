"use strict"; // PARA O JavaScript SER MAIS RIGOROSO avisar quando eu estiver fazendo algumas coisas de maneira incorreta



// Procura no HTML o elemento que possui  o ID "total-treinos".
const totalTreinos = document.querySelector("#total-treinos");

// Procura no HTML o elemento que mostra o tempo total treinado.
const tempoTreinado = document.querySelector("#tempo-treinado");





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
CARD TEMPO        Obs: MUDAR ATUALIZAR ESSE CARD PARA TEMPO REAL MAIS PARA FRENTE, DATA ATUAL 12/09/2026
======================= */
//começamos a soma com zero.
let somaTempo = 0;

//Percorrendo os treinos
treinosSalvos.forEach(function(treino){
    somaTempo += Number(treino.tempo);
});

// Descobre quantas horas completas existem.
const horas = Math.floor(somaTempo / 60);

// Descobre quantos minutos sobraram  depois de retirar as horas completas.
const minutos = somaTempo % 60;

// Atualiza o card da Home.
tempoTreinado.textContent = `${horas}h ${minutos}min `;