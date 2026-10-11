










const treinoAtual = localStorage.getItem("treinoAtual"); // Recupera do localStorage a ficha que foi selecionada.

const treino = JSON.parse(treinoAtual);
// Transforma o texto JSON novamente em um objeto JavaScript.

const tituloTreino = document.getElementById("tituloTreino");// Procura no DOM o <h1> que possui o ID "tituloTreino".

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