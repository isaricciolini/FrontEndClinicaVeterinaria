var url = 'https://localhost:5001/animais';
var corpoTabela = document.getElementById('corpoTabela');
var textCodAnimal = document.getElementById('textCodAnimal');
var textNomeAnimal = document.getElementById('textNomeAnimal');
var textRacaAnimal = document.getElementById('textRacaAnimal');
var textTipoAnimal = document.getElementById('textTipoAnimal');
var textDeficienciaAnimal = document.getElementById('textDeficienciaAnimal');
var codAnimalAlterar = 0;
var textNomeAnimalAlterar = document.getElementById('textNomeAnimalAlterar');
var textNascimentoAlterar = document.getElementById('textNascimentoAlterar');
var textRacaAlterar = document.getElementById('textRacaAlterar');
var textTipoAlterar = document.getElementById('textTipoAlterar');
var textDeficienciaAlterar = document.getElementById('textDeficienciaAlterar');
var textCodClienteAlterar = document.getElementById('textCodClienteAlterar');
var textCodCliente = document.getElementById('textCodCliente');

var modalListaClientes = new bootstrap.Modal(document.getElementById('modalListaClientes'), {});
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalSucesso = new bootstrap.Modal(document.getElementById('modalSucesso'), {});
var modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'), {});
var modalAlertaDeOperacao = new bootstrap.Modal(document.getElementById('modalAlertaDeOperacao'));
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'));


// var nascimentoAnimal = textNascimentoAnimal.value;
// var anoAnimal = nascimentoAnimal.getFullYear();
// var mesAnimal = nascimentoAnimal.getMonth();
// var diaAnimal = nascimentoAnimal.getDay();



pesquisarAnimais();

function pesquisarAnimais() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var animal = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${animal.codAnimal}</td>`;
                linha += `<td id="nomeAnimal${animal.codAnimal}">${animal.nomeAnimal}</td>`;
                linha += `<td id="idadeAnimal${animal.codAnimal}"></td>`;
                linha += `<td id="nascimentoAnimal${animal.codAnimal}">${(animal.nascimento.slice(8, 10)) + "/" + (animal.nascimento.slice(5, 7)) + "/" + (animal.nascimento.slice(0, 4))}</td>`;
                linha += `<td id="tipoAnimal${animal.codAnimal}">${animal.tipo}</td>`;
                linha += `<td id="racaAnimal${animal.codAnimal}">${animal.raca}</td>`;
                linha += `<td id="deficienciaAnimal${animal.codAnimal}">${animal.deficiencia}</td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirAlterar(${animal.codAnimal})">Alterar</button></td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirExcluir(${animal.codAnimal})">Excluir</button></td>`;
                linha += '</tr>';
                linha += '<div style="display: none">'
                linha += `<p id="codCliente${animal.codAnimal}">${animal.codCliente}</p>`
                linha += `<p id="nascimento${animal.codAnimal}">${animal.nascimento}</p>`
                linha += '</div>'
                corpoTabela.innerHTML += linha;
                idade(animal.codAnimal);
            }
            w3.sortHTML('#tabela','.item', 'td:nth-child(1)'); 
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar animais';
        }
    };
    xhttp.open('GET', `${url}`, true);
    xhttp.send();
}

function idade(codAnimal) {
    var dataAtual = new Date();
    var ano = dataAtual.getFullYear().toString();
    var mes = dataAtual.getMonth().toString() + 1;
    var dia = dataAtual.getDay().toString();
    var nascimentoAnimal = document.getElementById(`nascimentoAnimal${codAnimal}`).innerHTML;
    var anoAnimal = nascimentoAnimal.slice(6,10);
    var mesAnimal = nascimentoAnimal.slice(3,5);
    var diaAnimal = nascimentoAnimal.slice(0,2);
    var idade;
    diferencaData = (ano - anoAnimal)
    if (mesAnimal < mes) {
        idade = diferencaData;
    }
    else {
        if(diaAnimal < dia) {
            idade = diferencaData;
        } else {
            idade = diferencaData + 1;
        }
    }
    document.getElementById(`idadeAnimal${codAnimal}`).innerHTML = idade;
}

function abrirCadastrarListaClientes() {
    modalListaClientes.show();
    corpoTabelaClientes.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var cliente = resposta[i];
                var linha = '<tr class="itemClientes">';
                linha += `<td>${cliente.codCliente}</td>`;
                linha += `<td id="nomeClienteConsultaCadastrar${cliente.codCliente}">${cliente.nomeCliente}</td>`;
                linha += `<td>${cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>`;
                linha += `<td><button onclick="abrirCadastrar(${cliente.codCliente})" class="btn btn-dark">+</button></td>`
                linha += '</tr>';
                corpoTabelaClientes.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            corpoTabelaClientes.innerHTML = 'Erro ao pesquisar clientes.';
        }
    };
    xhttp.open('GET', 'https://localhost:5001/clientes', true);
    xhttp.send();
}

function abrirCadastrar(codCliente) {
    codClienteCadastrar = codCliente;
    nomeClienteCadastrar = document.getElementById(`nomeClienteConsultaCadastrar${codCliente}`).innerHTML;
    modalCadastrar.show();
    modalListaClientes.hide();
    document.getElementById('textNomeCliente').value = nomeClienteCadastrar;
    document.getElementById('textCodCliente').value = codClienteCadastrar;
}

function cadastrarAnimal() {
    var nomeAnimal = textNomeAnimal.value;
    var nascimento = textNascimentoAnimal.value;
    var raca = textRacaAnimal.value;
    var tipo = textTipoAnimal.value;
    var deficiencia = textDeficienciaAnimal.value;
    var codCliente = textCodCliente.value;
    if (!nomeAnimal || !nascimento || !raca || !tipo || !codCliente) {
        modalAlerta.show();
        return;
    }
    var animal = {
        nomeAnimal: nomeAnimal,
        nascimento: `${nascimento}T00:00:00.000Z`,
        raca: raca,
        tipo: tipo,
        deficiencia: deficiencia,
        codCliente: codCliente
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            limpar();
            pesquisarAnimais();
            modalCadastrar.hide();
            modalSucesso.show();
        } 
        else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(animal));
}

function abrirAlterar(codAnimal) {
    codAnimalAlterar = codAnimal;
    var nomeAnimal = document.getElementById(`nomeAnimal${codAnimal}`).innerHTML;
    var nascimento = document.getElementById(`nascimento${codAnimal}`).innerHTML.slice(0,10);
    var raca = document.getElementById(`racaAnimal${codAnimal}`).innerHTML;
    var tipo = document.getElementById(`tipoAnimal${codAnimal}`).innerHTML;
    var codCliente = document.getElementById(`codCliente${codAnimal}`).innerHTML;
    textNomeAnimalAlterar.value = nomeAnimal;
    textNascimentoAlterar.value = nascimento;
    textRacaAlterar.value = raca;
    textTipoAlterar.value = tipo;
    textCodClienteAlterar.value = codCliente;
    modalAlterar.show();
}

function alterarAnimal() {
    var nomeAnimal = textNomeAnimalAlterar.value;
    var nascimentoAnimal = nascimentoAnimal.value;
    var racaAnimal = textRacaAlterar.value;
    var tipoAnimal = textTipoAlterar.value; 
    var codCliente = textCodClienteAlterar.value;
    if (!nomeAnimal || !nascimentoAnimal || !racaAnimal || !tipoAnimal || !codCliente) {
        modalAlerta.show();
        return;
    }
    var animal = {
        nomeAnimal: nomeAnimal,
        nascimento: nascimentoAnimal,
        raca: racaAnimal,
        tipo: tipoAnimal,
        codAnimal: codAnimalAlterar,
        codCliente: codCliente
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            pesquisarAnimais();
            modalAlterar.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(animal));
}

function abrirExcluir(codAnimal) {
    document.getElementById("textCodAnimalExcluir").value = codAnimal;
    modalExcluir.show();
}

function excluirAnimal(codAnimal) {
    var codAnimal = document.getElementById('textCodAnimalExcluir').value
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            modalExcluir.hide();
            modalSucesso.show();
            pesquisarAnimais();
        }
    };
    xhttp.open('DELETE', `${url}?codAnimal=${codAnimal}`, true);
    xhttp.send();
}

function limpar() {
    textNomeAnimal.value = '';
    textNascimentoAnimal.value = '';
    textRacaAnimal.value = '';
    textTipoAnimal.value = '';
}
