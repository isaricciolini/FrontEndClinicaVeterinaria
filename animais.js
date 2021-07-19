var url = 'https://localhost:5001/animais';
var corpoTabela = document.getElementById('corpoTabela');
var textCodAnimal = document.getElementById('textCodAnimal');
var textNomeAnimal = document.getElementById('textNomeAnimal');
var textNascimentoAnimal = document.getElementById('textNascimentoAnimal');
var textRacaAnimal = document.getElementById('textRacaAnimal');
var textTipoAnimal = document.getElementById('textTipoAnimal');
var textDeficienciaAnimal = document.getElementById('textDeficienciaAnimal');
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var codAnimalAlterar = 0;
var textNomeAnimalAlterar = document.getElementById('textNomeAnimalAlterar');
var textNascimentoAlterar = document.getElementById('textNascimentoAlterar');
var textRacaAlterar = document.getElementById('textRacaAlterar');
var textTipoAlterar = document.getElementById('textTipoAlterar');
var textDeficienciaAlterar = document.getElementById('textDeficienciaAlterar');
var textCodClienteAlterar = document.getElementById('textCodClienteAlterar');
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var textCodCliente = document.getElementById('textCodCliente');


pesquisarAnimais();

function pesquisarAnimais() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var animal = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${animal.codAnimal}</td>`;
                linha += `<td id="nomeAnimal${animal.codAnimal}">${animal.nomeAnimal}</td>`;
                linha += `<td id="nascimentoAnimal${animal.codAnimal}">${animal.nascimento}</td>`;
                linha += `<td id="racaAnimal${animal.codAnimal}">${animal.raca}</td>`;
                linha += `<td id="tipoAnimal${animal.codAnimal}">${animal.tipo}</td>`;
                linha += `<td id="deficienciaAnimal${animal.codAnimal}">${animal.deficiencia}</td>`;
                linha += `<td><button onclick="abrirAlterar(${animal.codAnimal})">Alterar</button></td>`;
                linha += `<td><button onclick="excluirAnimal(${animal.codAnimal})">Excluir</button></td>`;
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela','.item', 'td:nth-child(1)'); 
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar animais';
        }
    };
    xhttp.open('GET', `${url}`, true);
    xhttp.send();
}

function abrirCadastrar() {
    modalCadastrar.show();
}

function cadastrarAnimal() {
    var nomeAnimal = textNomeAnimal.value;
    var nascimento = textNascimentoAnimal.value;
    var raca = textRacaAnimal.value;
    var tipo = textTipoAnimal.value;
    var deficiencia = textDeficienciaAnimal.value;
    var codCliente = textCodCliente.value;
    if (!nomeAnimal || !nascimento || !raca || !tipo || !codCliente) {
        alert('Preencha os campos para cadastrar!');
        return;
    }
    var animal = {
        nomeAnimal: nomeAnimal,
        nascimento: nascimento,
        raca: raca,
        tipo: tipo,
        deficiencia: deficiencia,
        codCliente: codCliente
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`${animal.nomeAnimal}cadastrado com sucesso!`);
            limpar();
            pesquisarAnimais();
            modalCadastrar.hide();
        } 
        else if (this.readyState == 4) {
            alert('Não foi possivel cadastrar animal.');
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(animal));
}

function abrirAlterar(codAnimal) {
    codAnimalAlterar = codAnimal;
    var nomeAnimal = document.getElementById(`nomeAnimal${codAnimal}`).innerHTML;
    var nascimento = document.getElementById(`nascimentoAnimal${codAnimal}`).innerHTML;
    var raca = document.getElementById(`racaAnimal${codAnimal}`).innerHTML;
    var tipo = document.getElementById(`tipoAnimal${codAnimal}`).innerHTML;
    //var codCliente = document.getElementById(`codCliente${codAnimal}`).innerHTML;
    textNomeAnimalAlterar.value = nomeAnimal;
    textNascimentoAlterar.value = nascimento;
    textRacaAlterar.value = raca;
    textTipoAlterar.value = tipo;
    //textCodClienteAlterar.value = codCliente;
    modalAlterar.show();
}

function alterarAnimal() {
    var nomeAnimal = textNomeAnimalAlterar.value;
    var nascimentoAnimal = textNascimentoAlterar.value;
    var racaAnimal = textRacaAlterar.value;
    var tipoAnimal = textTipoAlterar.value; 
    var codCliente = textCodClienteAlterar.value;
    if (!nomeAnimal || !nascimentoAnimal || !racaAnimal || !tipoAnimal || !codCliente) {
        alert('Preencha os campos para alterar!');
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
            alert(`${animal.nomeAnimal} Alterado(a) com sucesso!`);
            pesquisarAnimais();
            modalAlterar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível alterar o seu animal.');
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(animal));
}

function excluirAnimal(codAnimal) {
    if (!confirm('Tem certeza que deseja excluir este animal?'))
        return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert('Animal excluído com sucesso!');
            pesquisarAnimais();
        }
    };
    xhttp.open('DELETE', `${url}/${codAnimal}`, true);
    xhttp.send();
}

function limpar() {
    textNomeAnimal.value = '';
    textNascimentoAnimal.value = '';
    textRacaAnimal.value = '';
    textTipoAnimal.value = '';
}