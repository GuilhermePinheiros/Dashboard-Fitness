/* =====================
1- Seleção dos elementos
====================== */

const filtros = document.querySelectorAll('.filtros button');

const lista = document.querySelector(".lista-exercicio");

const listaAdicionados = document.querySelector('.conteudo-lista');

const contador = document.querySelector('.contador');



 

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





/* ======================
 6-EVENTOS 
 =========================*/

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









 



