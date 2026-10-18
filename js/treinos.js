
/* ==============
ELEMENTOS DA PÁGINA
================= */

//Filtros 
const campoBusca = document.querySelector("#busca-treinos");

const filtroObjetivo = document.querySelector("#filtro-objetivo");
const listaTreinos = document.querySelector("#lista-treinos");

//Função de atualização de dados 
const treinosSalvos = JSON.parse(localStorage.getItem("treinos")) || [];
console.log(treinosSalvos); //TESTE

//CADS DE RESUMO
const totalTreinos = document.querySelector("#total-treinos");
const treinosSemana = document.querySelector("#treinos-semana");
const totalExercicios = document.querySelector("#total-exercicios");
const duracaoMedia = document.querySelector("#duracao-media");



/* =================
Função de criar fichas 
=====================  */
function criarCard(treino) {

    const quantidadeSeries = treino.series ?? 3;
    
    return `
        <article class="card-ficha">

            <div class="imagem-ficha">
                <img
                    src="${treino.exercicios[0].imagem}"
                    alt="${treino.exercicios[0].nome}"
                >

            </div>

            <div class="conteudo-ficha">

                <div class="cabecalho-ficha">  

                    <h2>${treino.nome}</h2>

                    <span class="tag-ficha">
                        <i class="fa-solid fa-bullseye"></i>
                        ${treino.objetivo}
                    </span>

                </div>

                <div class="quantidade-series">

                <i class="fa-solid fa-list-ol"></i>
               ${quantidadeSeries} ${Number(quantidadeSeries) === 1 ? "série" : "séries"}

                </div>

                <div class="informacoes-ficha">

                    <span>
                        <i class="fa-solid fa-dumbbell"></i>
                        ${treino.exercicios.length} exercícios
                    </span>

                    <span>
                        <i class="fa-regular fa-clock"></i>
                        ${treino.tempo} min
                    </span>

                    <span>
                        <i class="fa-solid fa-layer-group"></i>
                        ${treino.nivel}
                    </span>

                </div>

                <div class="exercicios-ficha">

                    <i class="fa-solid fa-list"></i>

                    ${treino.exercicios.map(function(exercicio) {  // Percorre os exercícios da ficha. O join("") apenas junta todos esses HTML em uma única sequência.

                    return `

                            <span>${exercicio.nome}</span>

                    `;

                    }).join("")} 

                </div>

                <div class="acoes-ficha">

                    <button class="btn-iniciar" data-id="${treino.dataCriacao}">
                        <i class="fa-solid fa-play"></i>
                        Iniciar ficha
                    </button>

                    <button class="btn-editar">
                        <i class="fa-solid fa-pen"></i>
                        Editar
                    </button>

                    <button class="btn-excluir">
                        <i class="fa-solid fa-trash"></i>
                    
                    </button>



                </div>

            </div>

        </article>

    `;

}

/* Função para percorrer treinosSalvos e colocar os cards na página. */
function mostrarTreinos() {

    listaTreinos.innerHTML = ""; // Isso limpa o conteúdo atual de #lista-treinos.

    treinosSalvos.forEach(function(treino) {

        listaTreinos.innerHTML += criarCard(treino);

    });

}

mostrarTreinos(); //Chamando a função 


/* Detectar o clique do botão iniciar ficha */
listaTreinos.addEventListener("click", function(evento) {

    const botao = evento.target.closest(".btn-iniciar"); // Procura o botão "Iniciar ficha" que recebeu o clique.

    if (!botao) {  // Se o clique não aconteceu no botão, encerra a função.
        return;
    }

    const idTreino = botao.dataset.id; // Pega o ID da ficha armazenado no botão.

    const treinoSelecionado = treinosSalvos.find(function(treino) {

    return treino.dataCriacao === idTreino; // Procura a ficha cujo dataCriacao corresponde ao ID do botão.

    });

    console.log(treinoSelecionado);

    localStorage.setItem( // Salva a ficha selecionada no localStorage como "treinoAtual".
    "treinoAtual",
    JSON.stringify(treinoSelecionado) // JSON.stringify() transforma o objeto em texto.
    );

    window.location.href = "treino-ativo.html"; // fazendo o botão “Iniciar ficha” levar o usuário para treino-ativo.html

    

});


 









/* =================
Filtros de busca
==================== */
campoBusca.addEventListener("input", filtrarTreinos); //campo busca
filtroObjetivo.addEventListener("change", filtrarTreinos);

function filtrarTreinos() {

    const textoBusca = campoBusca.value.toLowerCase().trim(); //Pegando o que o usuário digitou

    const objetivoSelecionado = filtroObjetivo.value; //Pegando o objetivo selecionado

    const cardsTreino = document.querySelectorAll(".card-treino"); // Encontrando os cards

    cardsTreino.forEach(card => { //Percorrendo cada card

    const conteudoCard = card.textContent.toLowerCase(); // Pegando todo o texto do card

    const objetivo = card.dataset.objetivo; // Pegando o objetivo do card

    const treino =
        treinosSalvos.find(
            treino =>
                treino.nome.toLowerCase() === //Pega o nome armazenado no objeto.
                card.querySelector("h2") //procura o <h2> dentro do card.
                    .textContent //pega o texto.
                    .toLowerCase() //transforma em minúsculo.
        );

    // Verificando os exercícios
    const correspondeExercicio =
        treino.exercicios.some(exercicio => //vai verificar cada exercício:
            exercicio.nome //pega o nome do exercício.
                .toLowerCase() // transforma em minúsculo.
                .includes(textoBusca) // significa: "Esse texto contém o texto que estou procurando?"
        );

    //juntamos as duas buscas
    const correspondeBusca =
        conteudoCard.includes(textoBusca) || //O texto pesquisado está no conteúdo visível do card?
        correspondeExercicio; //Algum exercício daquele treino corresponde à pesquisa?
    
    const correspondeObjetivo = //Agora o filtro de objetivo
        objetivoSelecionado === "todos" || //O usuário selecionou "Todos os objetivos"?
        objetivo === objetivoSelecionado; //Se não, verificamos

    card.style.display = // significa: não renderizar visualmente esse elemento na página.
        correspondeBusca && correspondeObjetivo
            ? ""
            : "none";
    });
}

/* ================
ATUALIZAR OS CARDS RESUMO 
====================== */
    function atualizarResumo() {
    // Quantidade  total de treinos salvos.
    const quantidadeTreinos = treinosSalvos.length;
    //Atualizar o primeiro card.
    totalTreinos.textContent = quantidadeTreinos;

    //TOTAL DE EXERCÍCIOS 

    let quantidadeExercicios = 0;

    //Pecorre todos os treinos salvos.
    treinosSalvos.forEach(function(treino){

        //Soma a quantidade de exercícios
        //existente dentro de cada treino.
        quantidadeExercicios += treino.exercicios.length;
    });

        //coloca o total no card.
        totalExercicios.textContent = quantidadeExercicios;

        //DURAÇÃO MÉDIA
        let somaDuracao = 0;

        //percorre todos os treinos.
    treinosSalvos.forEach(function(treino){

        //converte o tempo do treino, que vem do formulário como texto, para número.
        somaDuracao += Number(treino.tempo);
    });

    

    //Se não houver treinos, a média será 0.
    const media = treinosSalvos.length > 0 // "A quantidade de treinos é maior que zero?"
             ? somaDuracao / treinosSalvos.length //Se sim
             : 0; // Se não

    //Arredonda a média para não mostrar números decimais desnecessários.
    duracaoMedia.textContent = `${Math.round(media)} min`;

    // Calcula quantos treinos foram criados  desde o início desta semana.
    const quantidadeTreinosSemana = calcularTreinosSemana();

    // Atualiza o card "Esta Semana".
    treinosSemana.textContent = quantidadeTreinosSemana;



}
atualizarResumo();

// TREINOS CRIADOS NESTA SEMANA 

function calcularTreinosSemana() {

    //Pega a data e hora atuais.
    const hoje = new Date();

    // Descobre o dia da semana.
    // Domingo = 0
    // Segunda = 1
    // Terça = 2
    // ...
    // Sábado = 6
    const diaSemanaAtual = hoje.getDay();

    // Calcula quantos dias precisamos voltar  para chegar à segunda-feira.
    const diasDesdeSegunda = 
    diaSemanaAtual === 0 // pergunta "Hoje é domingo?"
    ? 6 // Se for domingo: voltamos 6 dias até segunda.
    :diaSemanaAtual - 1; //Se for domingo: fazemos a conta normalmente.

    //Cria uma nova data baseada em hoje.
    const inicioSemana = new Date(hoje);

    //volta até a segunda-feira
    inicioSemana.setDate(
        hoje.getDate() - diasDesdeSegunda
    );

    // Define o início da segunda-feira:  00:00:00.000
    inicioSemana.setHours(0, 0, 0, 0);

    // Conta quantos treinos foram criados a partir do início desta semana.
    let quantidade = 0;

    treinosSalvos.forEach(function(treino){

        // Alguns treinos antigos podem não possuir a propriedade dataCriacao.
        if(!treino.dataCriacao) {
            return;
        }

        // Converte o texto salvo no localStorage  novamente para uma data.
        const dataCriacao = new Date(treino.dataCriacao);

         // Se o treino foi criado nesta semana,  aumenta o contador.
         if(dataCriacao >= inicioSemana) {
            quantidade++;
         }
    });

    return quantidade;



}


/*====================
 Eventos da lixeira 
 =====================*/
// Evento de exclusão

listaTreinos.addEventListener("click", function(evento) {

    const botao = evento.target.closest(".btn-excluir");

    if (!botao) {
        return;
    }

    excluirTreino(evento);
});

function excluirTreino(evento) {

    // Descubra qual é o botão da lixeira
    const botao = evento.target.closest(".btn-excluir");

    // Descubra qual card pertence a esse botão
    const card = botao.closest(".card-treino");

    // Pergunte se o usuário realmente quer excluir
    const confirmar =
        confirm("Tem certeza que deseja excluir este treino?");

    // Se ele cancelar, pare aqui
    if (!confirmar) {
        return;
    }

    // Pegue todos os cards que estão na tela
    const cards =
        Array.from(listaTreinos.children);

    // Descubra a posição do card clicado
    const indice =
        cards.indexOf(card);

    // Remova esse treino do Array
    treinosSalvos.splice(indice, 1);

    // Salve o Array atualizado no localStorage
    localStorage.setItem(
        "treinos",
        JSON.stringify(treinosSalvos)
    );

    // Atualize a tela
    mostrarTreinos();
    atualizarResumo();
}