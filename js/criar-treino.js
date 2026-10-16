/* javaScript do criar-treino */


/* =====================
1- Seleção dos elementos
====================== */

const filtros = document.querySelectorAll('.filtros button');

const lista = document.querySelector('.lista-exercicio');

const listaAdicionados = document.querySelector('.conteudo-lista');

const contador = document.querySelector('.contador');
//Configurações da lupa 
const campoBusca = document.querySelector('#busca');
const lupa = document.querySelector('.campo-busca i');

// Elementos  Formulário do dados do treino 
const nometreino = document.querySelector("#nome-Treino");

const objetivo = document.querySelector(".objetivo-treino")

const diaSemana = document.querySelector("#dia-semana");

const nivelTreino = document.querySelector("#nivel");

const tempoEstimado = document.querySelector("#tempo");

const observacoes = document.querySelector("#observacoes");

const botaoSalvar = document.querySelector(".acoes-treino button");
//
const mensagemExercicios = document.querySelector("#mensagem-exercicios");





 

//2- Banco de exercícios 
/*=======================
 Criação do banco exercícios 
 ========================*/

 const exercicios = [
    {
        id: 1,
        nome: "Supino Reto",

        descricao: "Trabalha os músculos do peito, ombros e tríceps.",

        grupo: "Peito",

        imagem: "../imagens/supino-reto.png"


       
    },

    {
        id: 2,
        nome: "Remada Curvada",

        descricao: "Fortalece costas e lombar.",

        grupo: "Costas",

        imagem: "../imagens/remada-curvada.png"

        
    },

    {
    id: 3,
    nome: "Remada Curvada",

    descricao: "Fortalece costas e lombar.",

    grupo: "Costas",

    imagem: "../imagens/remada-curvada.png"

        
    },

    {
    id: 4,
    nome: "Remada Curvada",

    descricao: "Fortalece costas e lombar.",

    grupo: "Costas",

    imagem: "../imagens/remada-curvada.png"

        
    },

    {
    id: 5,
    nome: "Remada Curvada",

    descricao: "Fortalece costas e lombar.",

    grupo: "Costas",

    imagem: "../imagens/remada-curvada.png"

        
    },
    {
    id: 6,
    nome: "Remada Curvada",

    descricao: "Fortalece costas e lombar.",

    grupo: "Costas",

    imagem: "../imagens/remada-curvada.png"

        
    },
    {
    id: 7,
    nome: "Remada Curvada",

    descricao: "Fortalece costas e lombar.",

    grupo: "Costas",

    imagem: "../imagens/remada-curvada.png"

        
    }

 ];

 //3- Array dos exerícios escolhidos 
/* ============================
Exercícios que o usuário escolheu, Cria array dos exercícios escolhidos
================================= */
 const exerciciosSelecionados = [];

lista.addEventListener("click", function(event) {

    if(event.target.closest(".btn-adicionar")) {

        const botao = event.target.closest(".btn-adicionar");

        const id = botao.dataset.id;

        

        const exercicio = exercicios.find(function(exercicio) {

            return exercicio.id === Number(id);

        });

        const jaAdicionado = exerciciosSelecionados.some(function(exercicioSelecionado) {
            return exercicioSelecionado.id === exercicio.id;
        });

        if (jaAdicionado) {
            return;
        }


        exerciciosSelecionados.push(exercicio); //push() coloca o exercício dentro do array.
        mensagemExercicios.textContent = "";  //Faz a mennsagem de erro (red) desaparecer 

        console.log(exerciciosSelecionados); // console.log() mostra o array no console.

        mostrarExerciciosSelecionados(); // mostrarExerciciosSelecionados() pega esse array e atualiza o HTML.
       
        atualizarContador();
        
        

        

        
    }

});






/*  =========================
4- FUNÇÃO QUE CRIAM/MONTAM HTML
============================== */

// Criando o HTML com JS, Função que cria o card da biblioteca

 function criarCard(exercicio) {

    return  `

             <article class="card-exercicio" data-grupo="${exercicio.grupo.toLowerCase()}">

                    <img src="${exercicio.imagem}"
                    alt= "${exercicio.nome}">

                    <div class="conteudo-exercicio">

                        <h3>${exercicio.nome}</h3>
  
                        <p class="descricao">
                            ${exercicio.descricao}
                        </p>
                    </div>
                     <div class="acoes-exercicio">

                        <div class="tags">
                            <span class="tag-musculo ${exercicio.grupo.toLowerCase()}">

                            ${exercicio.grupo}
                            
                            </span>                          
                           
                        </div>
                        
                        <button class="btn-adicionar" data-id="${exercicio.id}">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div> 
                </article>

    `;     
        
 }
    
  // mostra os exercícios da biblioteca

 function mostrarExercicios(listaExercicios) {

    let cards = ""; // cria uma variável vazia.

    for(const exercicio of listaExercicios) {
        
        cards += criarCard(exercicio);
    }

    lista.innerHTML = cards;
}


 mostrarExercicios(exercicios);

/* ======================
Função que vai trasformar em HTML e colocar na tela do (Exercicios selecionados) */
function mostrarExerciciosSelecionados() {
    
    let cards = "";
    
    // Verifica se nenhum exercício foi adicionado
    if (exerciciosSelecionados.length === 0) {

        listaAdicionados.innerHTML = `
            <i class="fa-solid fa-clipboard-list"></i>

            <h4>Nenhum exercício adicionado</h4>

            <p>
                Adicione exercícios da biblioteca ao lado para montar seu treino.
            </p>
        
        `;

        return;
    }

    
//Cria os cards dos exercícios adicionados 
    for (const exercicio of exerciciosSelecionados) {

        cards += `
            <article class="exercicio-adicionado">

                <div class="informacoes-adicionado">

                    <h3>${exercicio.nome}</h3>
                    <p>${exercicio.grupo}</p>
                </div>
                
                <div class="acoes-lixeira">
                    <button class="btn-remover"
                    data-id="${exercicio.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>

            </article>
        `;
    }

    listaAdicionados.innerHTML = cards;

    

    
}







    
  


/* =======================
5- FUNÇÃO DE ALTERAÇÃO DOS DADOS 
=========================== */



// input de busca dos exercícios
function buscarExercicios(texto) {
    const resultado = exercicios.filter(function(exercicio) {

        return exercicio.nome.toLowerCase().includes(texto.toLowerCase());
    });
    
    mostrarExercicios(resultado);

    
    
}

campoBusca.addEventListener("input", function(){
        const texto = campoBusca.value;

        buscarExercicios(texto);
});

//Evento do click da lupa 
lupa.addEventListener("click", function() {

    campoBusca.focus();
 })



//Apagar um exercício
function removerExercicio(id) {

    const novaLista = exerciciosSelecionados.filter(function(exercicio) {

        console.log (
            "Comparando: ",
            exercicio.id,
            "com",
            Number(id)
        )

        return exercicio.id !== Number(id);

    });

    exerciciosSelecionados.length = 0;
    exerciciosSelecionados.push(...novaLista);

    mostrarExerciciosSelecionados();

    atualizarContador();
}



//filtro dos exercicios
 function filtrarExercicios(grupo) {

    if(grupo === "todos") {
        mostrarExercicios(exercicios);

        return;
    }

    const filtrados = exercicios.filter(function(exercicio) {

        return exercicio.grupo.toLowerCase() === grupo;

    });

    mostrarExercicios(filtrados);

  
}
//Contador dos exercícios
function atualizarContador() {

    contador.textContent = exerciciosSelecionados.length;

}


//Validador  do treino
function validarTreino(treino) {

    const erroNome = document.querySelector("#erro-nome");
    const erroObjetivo = document.querySelector("#erro-objetivo");
    const erroDiaSemana = document.querySelector("#erro-dia-semana");
    const erroNivel = document.querySelector("#erro-nivel");
    const erroTempo = document.querySelector("#erro-tempo");
    erroNome.textContent = "";
    erroObjetivo.textContent = "";
    erroDiaSemana.textContent = "";
    erroNivel.textContent = "";
    erroTempo.textContent = "";

    if (treino.nome.trim() === "") {
        erroNome.textContent = "Informe o nome da ficha.";
        return false;
    }

    if (treino.objetivo === "") {
        erroObjetivo.textContent = "Selecione o objetivo do treino.";
        return false;
    }

    if (treino.diaSemana === "") {
        erroDiaSemana.textContent = "Selecione o dia da semana.";
        return false;
    }

    if (treino.nivel === "") {
        erroNivel.textContent = "Selecione o nível do treino.";
        return false;
    }

    if (treino.tempo === "") {
        erroTempo.textContent = "Selecione o tempo estimado.";
        return false;
    }

    if (treino.exercicios.length === 0 ) {
        return false;
    }

    return true;
}

// SALVAR TREINO NO LOCALSTORAGE

function salvarTreino(treino) {
   
    //Buscar os treinos existentes
    const treinosSalvos = JSON.parse(localStorage.getItem("treinos")) || [];

    treinosSalvos.push(treino); // push() adiciona um elemento ao final de um array. // Isso é importante porque não queremos substituir os treinos anteriores.

    localStorage.setItem("treinos",JSON.stringify(treinosSalvos)); // Salvar novamente
}



/* ======================
 6-EVENTOS 
 =========================*/

// Eventos de correção do campos, para dasaparecer a mensagem de aviso red
nometreino.addEventListener("input", function() {
    if (nometreino.value.trim() !== "") {
        document.querySelector("#erro-nome").textContent = "";
    }
});

objetivo.addEventListener("change", function() {

    if (objetivo.value !== "") {
        document.querySelector("#erro-objetivo").textContent = "";
    }

});

diaSemana.addEventListener("change", function() {

    if (diaSemana.value !== "") {
        document.querySelector("#erro-dia-semana").textContent = "";
    }

});

nivelTreino.addEventListener("change", function() {

    if (nivelTreino.value !== "") {
        document.querySelector("#erro-nivel").textContent = "";
    }

});

tempoEstimado.addEventListener("change", function() {

    if (tempoEstimado.value !== "") {
        document.querySelector("#erro-tempo").textContent = "";
    }

});




 //Teste do botão salvar treino
botaoSalvar.addEventListener("click", function(){
     
    
    const treino = {
        nome: nometreino.value,
        objetivo: objetivo.value,
        diaSemana: diaSemana.value,
        nivel: nivelTreino.value,
        tempo: tempoEstimado.value,
        observacoes: observacoes.value,
        exercicios: exerciciosSelecionados,

        // Guarda a data e a hora em que o treino foi criado.
        dataCriacao: new Date().toISOString()

    };

// Aparecer a mensagem de erro red, se não tiver nenhum dado selecionado
    if (treino.exercicios.length === 0) {

        mensagemExercicios.textContent =
        "Adicione pelo menos um exercício.";

        return;
    }

    if (!validarTreino(treino)) {
       
        return;
    }

    salvarTreino(treino);

    mostrarConfirmacao();

    
    
});

/* Função que mostra que a ficha foi salva */

function mostrarConfirmacao() {
    listaAdicionados.innerHTML = `
        <div class="confirmacao-salvamento">
            <i class="fa-solid fa-circle-check"></i>

            <h4>Ficha salva com sucesso!</h4>

            <p>
                Seu treino já está disponível em Minhas Fichas.
            </p>
        </div>
    `;

    listaAdicionados.classList.add("salvamento-concluido");

    setTimeout(function() { 
        listaAdicionados.classList.remove("salvamento-concluido");
       

        //Voltando o card ao estado padrão
        listaAdicionados.innerHTML = `
            <i class="fa-solid fa-clipboard-list"></i>

            <h4>Nenhum exercício adicionado</h4>

            <p>
                Adicione exercícios da biblioteca ao lado para montar seu treino.
            </p>

            
`;

        //Zerando o contador 
        contador.textContent = "0";

        // Limpar os campos do formulário
        nometreino.value = "";
        objetivo.value = "";
        diaSemana.value = "";
        nivelTreino.value = "";
        tempoEstimado.value = "";
        observacoes.value = "";

        // Limpar os exercícios selecionados
        exerciciosSelecionados.length = 0;

        // Limpar mensagens de validação

        document.querySelector("#erro-nome").textContent = "";
        document.querySelector("#erro-objetivo").textContent = "";
        document.querySelector("#erro-dia-semana").textContent = "";
        document.querySelector("#erro-nivel").textContent = "";
        document.querySelector("#erro-tempo").textContent = "";
        mensagemExercicios.textContent = "";

    }, 7000); /* esperar 7 segundos  */
}



 //Eventos da lixeira
listaAdicionados.addEventListener("click", function(event) {

    const botaoRemover = event.target.closest(".btn-remover");

    if (!botaoRemover) {
        return;
    }

    const id = botaoRemover.dataset.id;
        removerExercicio(id);
})
        
// Evento dos filtros
filtros.forEach(function(botao) {

    botao.addEventListener("click", function() {

        filtros.forEach(function(btn) {
            btn.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        const grupo = botao.dataset.filtro;

        filtrarExercicios(grupo);
    })
})









 



