"use strict"; // PARA O JavaScript SER MAIS RIGOROSO avisar quando eu estiver fazendo algumas coisas de maneira incorreta



// Procura no HTML o elemento que possui  o ID "total-treinos".
const totalTreinos = document.querySelector("#total-treinos");

// Procura no HTML o elemento que mostra o tempo total treinado.
const tempoTreinado = document.querySelector("#tempo-treinado");

// Procura no HTML o elemento que mostra o último trino 
const ultimoTreino = document.querySelector("#ultimo-treino");

const nomeTreinoHoje = document.querySelector("#nome-treino-hoje");
const gruposTreinoHoje = document.querySelector("#grupos-treino-hoje");

const botaoContinuarTreino = document.querySelector("#btn-continuar-treino");//Button do card treino de hoje

const listaAtividades = document.querySelector("#lista-atividades"); //o JavaScript consegue acessar a lista e adicionar as atividades dinamicamente




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

/* Lógica do treino últimas atividades */

const atividadesRecentes = [...historicoTreinos].sort(function(a, b) {
    return new Date(b.dataConclusao) - new Date(a.dataConclusao);
})

listaAtividades.innerHTML = "";

atividadesRecentes.forEach(function(sessao) {

    //JavaScript será responsável por reconstruir a lista.
    const itemAtividade = document.createElement("li");

    const iconeAtividade = document.createElement("div");
    iconeAtividade.classList.add("atividade-icone");

    const icone = document.createElement("i");
    icone.classList.add("fa-solid", "fa-circle-check");

    iconeAtividade.appendChild(icone);

    const informacoesAtividade = document.createElement("div");
    informacoesAtividade.classList.add("atividade-info");

    const tituloAtividade = document.createElement("h3");

    const dataAtividade = document.createElement("p");

    tituloAtividade.textContent = `Treino ${sessao.nome} concluído`; 

    //preencher o parágrafo com a data e o horário em que o treino foi concluído.
    const data = new Date(sessao.dataConclusao);

    dataAtividade.textContent = data.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });

    informacoesAtividade.appendChild(tituloAtividade);
    informacoesAtividade.appendChild(dataAtividade);

    itemAtividade.appendChild(iconeAtividade);
    itemAtividade.appendChild(informacoesAtividade);

    listaAtividades.appendChild(itemAtividade);

});



/* Lógica card treino de hoje   */

if(treinosSalvos.length > 0 ) {

    const indiceUltimaFicha = ultimaSessao  // descobrir a posição da última ficha executada
    ? treinosSalvos.findIndex(function(treino) {
        return treino.dataCriacao === ultimaSessao.idTreino;
    })
    : -1;
        //calcular qual será a próxima ficha da sequência.
    const proximoIndice = (indiceUltimaFicha + 1) % treinosSalvos.length;

    //recuperar a ficha que o sistema recomendou.

    const proximoTreino = treinosSalvos[proximoIndice];

    nomeTreinoHoje.textContent = proximoTreino.nome; //Exibir o nome da ficha

    //recuperar os grupos musculares da ficha recomendada.
    const gruposMusculares = [
        ...new Set (
            proximoTreino.exercicios.map(function(exercicio) {
                return exercicio.grupo;
            })
        )
    ];
    //transformar o array de grupos musculares em um texto para exibir no card.
    gruposTreinoHoje.textContent = gruposMusculares.join(" + ");

    //Evento click do button continuar treino
botaoContinuarTreino.addEventListener("click", function() {
        localStorage.setItem(
            "treinoAtual",
            JSON.stringify(proximoTreino)
        );

        window.location.href = "pages/treino-ativo.html";
    });
} else {
    nomeTreinoHoje.textContent = "Nenhum treino cadastrado";
    gruposTreinoHoje.textContent = "Crie sua primeira ficha para começar.";
}

