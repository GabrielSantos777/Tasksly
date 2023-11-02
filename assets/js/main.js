const inputTarefa = document.querySelector('.input-tarefa');// É CRIADO UMA CONST QUE VAI PEGAR O ELEMENTO COM A CLASSE SELECIONADA NO HTML
const btnTarefa = document.querySelector('.btn-tarefa');// É CRIADO UMA CONST QUE VAI PEGAR O ELEMENTO COM A CLASSE SELECIONADA NO HTML
const tarefas = document.querySelector('.tarefas');// É CRIADO UMA CONST QUE VAI PEGAR O ELEMENTO COM A CLASSE SELECIONADA NO HTML
const dateElement = document.querySelector(".data");

//FUNÇÃO PARA APARECER A DATA NA TELA
function atualizarData(){
    const dataAtual = new Date();
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    dateElement.innerHTML = dataFormatada;
}

atualizarData();

//FUNÇÃO QUE IRÁ CAPTAR AS OUTRAS FUNÇÕES QUE IRÃO CRIAR AS TAREFAS
function criaTarefa(textoInput){
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-tarefa';

    const label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(textoInput));
    label.className = 'tarefa-item'; // Adicione uma classe para identificar a tarefa

    tarefas.appendChild(label);

    limpaInput();
    criaBotaoApagar(label);
    salvarTarefas();
}


//É UMA FUNÇÃO QUE IRA CAPTAR QUANDO A TECLA ENTER É PRESSIONADA NO TECLADO, E QUANDO PRESSIONADA ELA CRIA A TAREFA
inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode == 13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

//FUNÇÃO PARA LIMAPAR O INPUT E COLOCAR O FOCO NO INPUT NOVAMENTE
function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

//FUNÇÃO QUE IRÁ CRIAR UM BUTTON ASSIM QUE A TAREFA FOR ADICIONADA E COLOCA O BUTTON COMO "FILHO"
function criaBotaoApagar(label){
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'X';
    botaoApagar.setAttribute('class', 'apagar');
    label.appendChild(botaoApagar);
}

//EVENTO DE CLICK QUE ASSIM QUE A CONST EL IDENTIFICAR QUE FOI CLICADO NO ELEMENTO QUE TEM A CLASS "APAGAR" ELE IRA REMOVER OS "PAIS" DESTE ELEMENTO
document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    } else if (el.classList.contains('checkbox-tarefa')){
        const tarefa = el.parentElement; // Obtém o elemento label (pai do checkbox)
        if (el.checked) {
            const tarefaClone = tarefa.cloneNode(true); // Clona o elemento label
            tarefa.remove(); // Remove o elemento original da lista de tarefas pendentes
            const listaConcluidas = document.querySelector('.concluidas');
            listaConcluidas.appendChild(tarefaClone); // Adiciona o clone na lista de tarefas concluídas
        } else {
            tarefa.querySelector('.checkbox-tarefa').checked = false; // Desmarca o checkbox
            tarefas.appendChild(tarefa); // Adiciona a tarefa de volta à lista de tarefas pendentes
            salvarTarefas();
        }
        salvarTarefas();
    }
});


//FUNÇÃO CRIADA PARA SALVAR AS TAREFAS(LI) QUE FORAM CRIADAS
function salvarTarefas(){
    const checkboxes = tarefas.querySelectorAll('.checkbox-tarefa');
    const listaDeTarefas = [];

    for (let checkbox of checkboxes){
        if (!checkbox.checked) {
            let tarefaTexto = checkbox.nextSibling.textContent.trim();
            listaDeTarefas.push(tarefaTexto);
        }
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        const listaDeTarefas = JSON.parse(tarefasSalvas);
        for (let tarefa of listaDeTarefas){
            criaTarefa(tarefa);
        }
    }
}

adicionaTarefasSalvas();

