


// Recupera a ficha selecionada
const treinoAtual = localStorage.getItem("treinoAtual");

// Transforma o JSON em objeto JavaScript
const treino = treinoAtual ? JSON.parse(treinoAtual) : null;

// Procura o título no HTML
const tituloTreino = document.getElementById("tituloTreino");

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
                        <input type="number" min="0" step="0.5"
                            value="0" aria-label="Carga da série ${i + 1}">
                        <span>kg</span>
                    </div>

                    <div>

                    <input type="number" min="1"
                        value="12" aria-label="Repetições da série ${i + 1}">

                    </div>

                    <span>01:30</span>
                    <span>Pendente</span>

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

                    <span class="status-exercicio">Pendente</span>

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
                            <span>Carga (kg)</span>
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

tituloTreino.textContent = treino.nome;// Coloca o nome da ficha dentro do <h1>.














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