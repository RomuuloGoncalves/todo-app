const atividades = document.querySelector(".atividades")
const input = document.querySelector(".input__add");
const itens = document.querySelector(".itens");

input.addEventListener('keyup', (e) => {
    if (e.key == 'Enter')
        criarTarefas()
});

let storage = {
    guardarTarefa: () => localStorage.setItem("tarefas", JSON.stringify(tarefas)) || [],
    pegarTarefa: () => JSON.parse(localStorage.getItem("tarefas")) || [],
    guardarTarefaConcluida: () => localStorage.setItem("tarefasConcluidas", JSON.stringify(tarefasConcluidas)) || [],
    pegarTarefaConcluida: () => JSON.parse(localStorage.getItem("tarefasConcluidas")) || [],
}
var tarefas = storage.pegarTarefa()
var tarefasConcluidas = storage.pegarTarefaConcluida()

function criarTarefas() {
    if (input.value.trim() != '')
        tarefas.push(input.value)
    input.value = ''
    gerarEstrutura()
}

function concluirTarefa(elemento) {
    tarefasConcluidas.push(tarefas.splice(elemento, 1)[0]);
    gerarEstrutura()
}

function voltarTarefa(elemento) {
    tarefas.push(tarefasConcluidas.splice(elemento, 1)[0]);
    gerarEstrutura()
}

function gerarEstrutura() {
    storage.guardarTarefa(tarefas)
    storage.guardarTarefaConcluida(tarefasConcluidas)
    atividades.innerHTML = ""
    let html = ""

    if (tarefas.length > 0) {
        tarefas.forEach((elemento, index) => {
            html += `
            <div class="campo">
            <input type="checkbox" onclick="concluirTarefa(${index})" id=""tarefa-${index}">
            <label for="tarefa-${index}">${elemento}</label>
            </div>
            `
        })
    }

    if (tarefasConcluidas.length > 0) {
        tarefasConcluidas.forEach((elemento, index) => {
            html += `
            <div class="campo">
            <input type="checkbox" onclick="voltarTarefa(${index})" checked id=""tarefa-${index}">
            <label for="tarefa-${index}">${elemento}</label>
            </div>
            `
        })
    }

    if (tarefasConcluidas.length <= 0 && tarefas.length <= 0) {
        html = `
        <div class="campo">
           <p style="text-align: center; width: 100%;">Crie uma tarefa</p>
        </div>
        `
    }

    atividades.innerHTML = html
    itens.innerHTML = `${tarefas.length} tarefas`
}

function apagarTarefas() {
    localStorage.clear()
    window.location.reload()
}

gerarEstrutura()