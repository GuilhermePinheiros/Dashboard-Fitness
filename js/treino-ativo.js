


// Recupera a ficha selecionada
const treinoAtual = localStorage.getItem("treinoAtual");

// Transforma o JSON em objeto JavaScript
const treino = treinoAtual ? JSON.parse(treinoAtual) : null;



// Procura o título no HTML
const tituloTreino = document.getElementById("tituloTreino");

// Elemento do cronômetro do treino
const cronometroTreino = document.getElementById("cronometroTreino");

const botaoPausarTreino = document.getElementById("btnPausarTreino"); //Conectar o botão de pausa

// Elementos do modal de finalização
const modalFinalizarTreino = document.getElementById("modalFinalizarTreino");
const botaoCancelarFinalizacao = document.getElementById("btnCancelarFinalizacao");
const botaoConfirmarFinalizacao = document.getElementById("btnConfirmarFinalizacao");
const botaoFinalizarTreino = document.getElementById("btn-finalizar-treino"); //seletor do botão
 /*========================
  Controle do cronômetro do treino
  ============================== */

let segundosTreino = 0;
let intervaloTreino = null;

function atualizarCronometro() {
    const horas = Math.floor(segundosTreino / 3600);
    const minutos = Math.floor((segundosTreino % 3600) / 60);
    const segundos = segundosTreino % 60;

    cronometroTreino.textContent =
    `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

/* Função que inicia o cronometro  */

function iniciarCronometro() {

    if (intervaloTreino !== null ) return; //Evita que o cronometro seja iniciado mais de uma vez

    intervaloTreino = setInterval(() => {
        segundosTreino++;
        atualizarCronometro();
    }, 1000);

    botaoPausarTreino.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar treino'; //alterando o texto do pausar treino
}

//Implementar a pausa e a retomada
function pausarCronometro() {
    clearInterval(intervaloTreino);
    intervaloTreino = null;

    botaoPausarTreino.innerHTML = '<i class="fa-solid fa-play "></i> Retomar treino'; 
    //Alterando o texto do retomar treino
}

//Detectar o clique 
botaoPausarTreino.addEventListener("click", () => {
    if (intervaloTreino !== null) {
        pausarCronometro();
    } else {
        iniciarCronometro();
    }
})
/* 
iniciarCronometro(); //Inicia o cronometro manual */


















// Verifica se existe uma ficha selecionada
if (treino) {
    tituloTreino.textContent = treino.nome;
} else {
    tituloTreino.textContent = "Nenhuma ficha selecionada";
}

/* fazer o JavaScript criar os cards automaticamente. */
const listaExercicios = document.querySelector(".lista-exercicios");



function mostrarExercicios() {

    if (!treino || !treino.exercicios || treino.exercicios.length === 0) {
        listaExercicios.innerHTML = "<p>Nenhum exercício encontrado nesta ficha.</p>";
        return;
    }

    const quantidadeSeries = Number(treino.series) || 3;

    listaExercicios.innerHTML = treino.exercicios.map((exercicio, indice) => {
        const idDetalhes = `detalhes-${indice}`;

        const linhasSeries = Array.from(
            { length: quantidadeSeries },
            (_, i) => `
                <div class="linha-serie">
                
                    <span>${i + 1}</span>

                    <div class="campo-carga">
                        <input type="number"
                         class="input-carga" 
                         min="0" 
                         step="0.5"
                         value="0" 
                         aria-label="Carga da série ${i + 1}">
                        <span>kg</span>

                    </div>

                    <div>

                    <input type="number" 
                            class="input-repeticoes"
                            min="1"
                            value="12"
                            aria-label="Repetições da série ${i + 1}">

                    </div>

                    <span>01:00</span>

                    <button type="button" class="btn-concluir-serie">
                        Concluir
                    </button>

                </div>
            `
        ).join("");

        return `
            <article class="item-exercicio">
                <div class="resumo-exercicio">
                    <span class="numero-exercicio">${indice + 1}</span>

                    <div class="imagem-exercicio">
                        <img src="${exercicio.imagem}" alt="${exercicio.nome}">
                    </div>

                    <div class="info-exercicio">
                        <h3>${exercicio.nome}</h3>
                        <span class="grupo-muscular">${exercicio.grupo}</span>
                    </div>

                    <div class="progresso-circular" aria-label="Progresso do exercício: 0%">

                        <svg viewBox="0 0 60 60">
                            <circle class="circulo-fundo" cx="30" cy="30" r="25"></circle>
                            <circle class="circulo-preenchido" cx="30" cy="30" r="25"></circle>
                        </svg>

                        <span class="porcentagem-exercicio">0%</span>

                    </div>

                    <button type="button"
                        class="btn-expandir-exercicio"
                        aria-expanded="false"
                        aria-controls="${idDetalhes}">
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                </div>

                <div class="detalhes-exercicio" id="${idDetalhes}" hidden>
                    <div class="series-exercicio">
                        <div class="linha-serie divisao-cor">
                            <span>Série</span>
                            <span class="input-carga">Carga (kg)</span>
                            <span>Repetições</span>
                            <span>Descanso</span>
                            <span>Status</span>
                        </div>

                        ${linhasSeries}
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

mostrarExercicios();

iniciarCronometro();

tituloTreino.textContent = treino.nome;// Coloca o nome da ficha dentro do <h1>.

//recuperar os valores salvos antes de gerar o HTML de cada série.
const chaveSeries = `seriesTreino_${treino?.nome ?? "sem-ficha"}`;

const seriesSalvas = JSON.parse(
    localStorage.getItem(chaveSeries) || "{}"
);

// Elementos do card Controle de carga
const nomeExercicioCarga = document.querySelector(".exercicio-carga h3");
const cargaAnterior = document.getElementById("cargaAnterior");
const cargaAtual = document.getElementById("cargaAtual");
const resultadoCarga = document.getElementById("resultado-carga");

// Atualiza o card com os dados do exercício selecionado
function atualizarCardCarga(exercicio, linhaSerie) {

    const nome = exercicio.querySelector("h3").textContent;
    const carga = Number(linhaSerie.querySelector("input.input-carga").value);
    const repeticoes = Number(linhaSerie.querySelector("input.input-repeticoes").value);

    const chave = `ultimaSerie_${treino.nome}_${nome}`;
    const ultimaSerie = JSON.parse(localStorage.getItem(chave) || "null");

    nomeExercicioCarga.textContent = nome;

    if (ultimaSerie) {
        cargaAnterior.textContent =
            `${ultimaSerie.carga} kg × ${ultimaSerie.repeticoes} reps`;
    } else {
        cargaAnterior.textContent = "Sem sessão anterior";
    }

    cargaAtual.textContent = `${carga} kg × ${repeticoes} reps`;

    if (ultimaSerie) {
        const diferenca = carga - ultimaSerie.carga;

        resultadoCarga.textContent =
            `${diferenca > 0 ? "+" : ""}${diferenca} kg`;
    } else {
        resultadoCarga.textContent = "Primeira sessão";
    }
}














/* ========================
 Criar a função de abrir e fechar os detalhes das fichas
 =========================*/

 /* Seleciiona todos os   botões de expandir */
const botoesExpandir = document.querySelectorAll('.btn-expandir-exercicio');

 //Percorrer os botões encontrados
botoesExpandir.forEach((botao) => {

    const idDetalhes = botao.getAttribute('aria-controls');
    const detalhes = document.getElementById(idDetalhes);

    detalhes.hidden = true;

    //Executa quando o botão é clicado 
    botao.addEventListener('click', () => {

        // Encontra a área de detalhes controlada pelo botão
        const idDetalhes = botao.getAttribute('aria-controls');
        const detalhes = document.getElementById(idDetalhes);

        // Verifica se os detalhes estão abertos
        const estaAberto = botao.getAttribute('aria-expanded') === 'true';


        // Mostra ou esconde os detalhes
        detalhes.hidden = estaAberto;

        // Inverte o estado atual
        botao.setAttribute('aria-expanded', !estaAberto);

        // Atualiza a seta
        const icone = botao.querySelector('i');

        if (estaAberto) {
            icone.classList.replace('fa-chevron-up', 'fa-chevron-down');
        } else {
            icone.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }


    });

});

/* =======================================
Função do cronometro PULAR DESCANSO e FINALIZAR TREINO
===================================*/

// Seleciona o elemento que exibe o tempo de descanso
const tempoDescanso = document.querySelector(".tempo-descanso");

// Seleciona o botão de pular descanso
const botaoPularDescanso = document.querySelector(".btn-pular-descanso");

// O botão começa desabilitado
botaoPularDescanso.disabled = true;

// Permite pular o descanso e concluir a série
botaoPularDescanso.addEventListener("click", () => {
    finalizarDescanso();
});

// Guarda o identificador do cronômetro
let intervaloDescanso = null;

// Guarda a série que está aguardando o fim do descanso
let serieEmDescanso = null;

// Atualiza o progresso circular do exercício
function atualizarProgresso(exercicio) {
    const botoes = exercicio.querySelectorAll(".btn-concluir-serie");

            const concluidas = exercicio.querySelectorAll(
                ".btn-concluir-serie.concluida"
            );

            const porcentagem = Math.round(
                (concluidas.length / botoes.length) * 100
            );

            const texto = exercicio.querySelector(".porcentagem-exercicio");
            const circulo = exercicio.querySelector(".circulo-preenchido");

            texto.textContent = `${porcentagem}%`;

            const circunferencia = 2 * Math.PI * 25;

            circulo.style.strokeDashoffset =
                circunferencia * (1 - porcentagem / 100);

            const progresso = exercicio.querySelector(".progresso-circular");

            progresso.setAttribute(
                "aria-label",
                `Progresso do exercício: ${porcentagem}%`
            );

            if (porcentagem === 100) {
                progresso.classList.add("concluido");
            }
        }

// Finaliza o descanso e conclui a série
function finalizarDescanso() {

    clearInterval(intervaloDescanso);
    intervaloDescanso = null;

    // Desabilita o botão após o fim do descanso
    botaoPularDescanso.disabled = true;

    // Libera as séries que ainda não foram concluídas
    document.querySelectorAll(".btn-concluir-serie").forEach((botao) => {
        if (!botao.classList.contains("concluida")) {
            botao.disabled = false;
        }
    });

    // Restaura o cronômetro para o tempo inicial
    tempoDescanso.textContent = "01:00";

    // Verifica se existe uma série aguardando
    if (!serieEmDescanso) return;

    // Marca a série como concluída
    serieEmDescanso.textContent = "Concluída";
    serieEmDescanso.classList.add("concluida");
    serieEmDescanso.disabled = true;

    // Encontra o exercício ao qual a série pertence
    const exercicio = serieEmDescanso.closest(".item-exercicio");

         // Identifica a linha da série concluída
    const linhaSerie = serieEmDescanso.closest(".linha-serie");

    // Recupera a carga e as repetições digitadas
    const carga = Number(linhaSerie.querySelector("input.input-carga").value);
    const repeticoes = Number(linhaSerie.querySelector("input.input-repeticoes").value);

    // Atualiza o card antes de salvar os novos valores
    atualizarCardCarga(exercicio, linhaSerie);

    // Identifica o nome do exercício
    const nomeExercicio = exercicio.querySelector("h3").textContent;

    // Cria uma chave específica para o exercício
    const chaveCarga = `ultimaSerie_${treino.nome}_${nomeExercicio}`;

    // Salva os dados atuais no navegador
    localStorage.setItem(chaveCarga, JSON.stringify({
        carga,
        repeticoes
    }));
    

    // Salva os dados no navegador
    localStorage.setItem(chaveCarga, JSON.stringify({
        carga: Number(carga),
        repeticoes: Number(repeticoes)
    }));

    // Atualiza o progresso circular desse exercício
    atualizarProgresso(exercicio);

    // Limpa a referência da série atual
    serieEmDescanso = null;

    
}

// Inicia a contagem regressiva do descanso
function iniciarDescanso() {


    if (intervaloDescanso !== null) return;

    let segundosRestantes = 60;
    tempoDescanso.textContent = "01:00";

    // Permite pular o descanso enquanto o cronômetro estiver ativo
    botaoPularDescanso.disabled = false;

    // Bloqueia todos os botões Concluir durante o descanso
    document.querySelectorAll(".btn-concluir-serie").forEach((botao) => {
        if (botao !== serieEmDescanso) {
            botao.disabled = true;
        }
    });

    intervaloDescanso = setInterval(() => {
        segundosRestantes--;

        const minutos = Math.floor(segundosRestantes / 60);
        const segundos = segundosRestantes % 60;

        tempoDescanso.textContent =
            `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

        if (segundosRestantes <= 0) {
            finalizarDescanso();
        }
    }, 1000);
}

//função Butão finalizar treino
botaoFinalizarTreino.addEventListener("click", () => {
    modalFinalizarTreino.hidden = false;

    
});

//Implementar o botão Cancelar

botaoCancelarFinalizacao.addEventListener("click", () => {
    modalFinalizarTreino.hidden = true;
});

// Conectar o botão Confirmar
botaoConfirmarFinalizacao.addEventListener("click", () => {
    pausarCronometro();

    window.location.href = "treinos.html"; //Voltar para as fichas
})




/* fazer o botão conncluir atualizar a barra de progresso redonda */

document.querySelectorAll(".btn-concluir-serie").forEach((botao) => { //Encontrar os botões de concluir
    botao.addEventListener("click", () => { //Detectar o clique

        // Guarda a série que iniciou o descanso
        serieEmDescanso = botao;

        // Altera o texto do botão durante o descanso
        botao.textContent = "Descansando...";

        

        // Desabilita o botão temporariamente
        botao.disabled = true;

        // Inicia o cronômetro
        iniciarDescanso();

        

       

        const exercicio = botao.closest(".item-exercicio"); //Identificar o exercício correto



    });
});


/* ====================
CARD observação da ficha
================*/

//Evento do botão Editar
document.querySelectorAll(".btn-editar-observacao").forEach((botao) => {

    botao.addEventListener("click", ()  => {

        const textoObservacao = document.getElementById("textoObservacao");

        textoObservacao.contentEditable = true;

        textoObservacao.focus();

        

       
        
    })

})

//Evento do botão salvar

document.querySelector(".btn-salvar-observacao").addEventListener("click", () => {
    
    const textoObservacao = document.getElementById("textoObservacao");


    const observacaoSalva = textoObservacao.textContent;

    localStorage.setItem("observacaoFicha", observacaoSalva);


    textoObservacao.contentEditable = false;

});

const textoObservacao = document.getElementById("textoObservacao");

const observacaoSalva = localStorage.getItem("observacaoFicha");

if (observacaoSalva !== null) {
    textoObservacao.textContent = observacaoSalva;
};


/*====================
CARD controle de carga
====================  */

const camposCarga = document.querySelectorAll(".input-carga");

camposCarga.forEach((campo) => {
    campo.addEventListener("input", () => {
        const peso = Number(campo.value);
        console.log(peso);

        //Salvar a carga no localStorage
        localStorage.setItem("cargaTeste", peso);
    });
});


