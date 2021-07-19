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
var textNascimentoAlterar = document.getElementById('textDateTimeNascimentoAlterar');
var textRacaAlterar = document.getElementById('textRacaAlterar');
var textTipoAlterar = document.getElementById('textTipoAlterar');
var textDeficienciaAlterar = document.getElementById('textDeficienciaAlterar');

pesquisarAnimais();

function pesquisarAnimais() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.Status == 200) {
            console.log(this.response)
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var animal = respota[i];
                var linha = '<tr class="item">';
                linha += `<td>${animal.codAnimal}</td>`;
                linha += `<td id="nomeAnimal${animal.codAnimal}">${animal.nomeAnimal}</td>`;
                linha += `<td id="nascimentoAnimal${animal.codAnimal}">${animal.nascimentoAnimal}</td>`;
                linha += `<td id="racaAnimal${animal.codAnimal}">${animal.racaAnimal}</td>`;
                linha += `<td id="tipoAnimal${animal.codAnimal}">${animal.tipoAnimal}</td>`;
                linha += `<td id="deficienciaAnimal${animal.codAnimal}">${animal.deficienciaAnimal}</td>`;
                linha += `<td><a onclick="abrirAlterarAnimal(${animal.codAnimal})">Alterar</a></td>`;
                linha += `<td><a onclick="excluirAnimal(${animal.codAnimal})">Excluir</a></td>`;
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            //w3.sortHTML('#tabela','.item', 'td:nth-child(1)'); 
        } else if (this.response == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar animais.';
        }
    };
    xhttp.open('GET', `${url}`, true);
    xhttp.send();
}

function cadastrarAnimal() {
    var nome = textNomeAnimal.value;
    var nascimento = textNascimentoAnimal.value;
    var raca = textRacaAnimal.value;
    var tipo = textTipoAnimal.value;
    var deficiencia = textDeficienciaAnimal.value;
    if (!nome || !nascimento || !raca || !tipo) {
        alert('Preencha os campos para cadastrar!');
        return;
    }
    var animal = {
        nome: nome,
        nascimento: nascimento,
        raca: raca,
        tipo: tipo
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.Status == 200) {
            alert(`${animal.nome} cadastrado com sucesso!`);
            limpar();
            pesquisarAnimais();
        } else if (this.readyState == 4) {
            alert('Não foi possivel cadastrar animal.');
        }
    };
    xhttp.open('POST', url, true);
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

function abrirAlterar(codAnimal) {
    codAnimalAlterar = codAnimal;
    var nomeAnimal = document.getElementById(`nomeAnimal${codAnimal}`).innerHTML;
    var nascimentoAnimal = document.getElementById(`nascimentoAnimal${codAnimal}`).innerHTML;
    var racaAnimal  = document.getElementById(`racaAnimal${codAnimal}`).innerHTML;
    var tipoAnimal = document.getElementById(`tipoAnimal${codAnimal}`).innerHTML;
    textNomeAnimalAlterar.value = nomeAnimal;
    textNascimentoAlterar.value = nascimentoAnimal;
    textRacaAlterar.value = racaAnimal;
    textTipoAlterar.value = tipoAnimal;
    modalAlterar.show();
}

function alterarAnimal() {
    var nomeAnimal = textNomeAnimalAlterar.value;
    var nascimentoAnimal = textNascimentoAlterar.value;
    var racaAnimal = textRacaAlterar.value;
    var tipoAnimal = textTipoAlterar.value; 
    if (!nomeAnimal || !nascimentoAnimal || !racaAnimal || !tipoAnimal) {
        alert('Preencha os campos para alterar!');
        return;
    }
    var animal = {
        nomeAnimal: nomeAnimal,
        nascimentoAnimal: nascimentoAnimal,
        racaAnimal: racaAnimal,
        tipoAnimal: tipoAnimal,
        codAnimal: codAnimalAlterar
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange == function () {
        if (this.readyState == 4 && this.Status == 200) {
            alert(`${animal.nomeAnimal} Alterado(a) com sucesso!`);
            limpar();
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

function limpar() {
    textNomeAnimal.value = '';
    textNascimentoAnimal.value = '';
    textRacaAnimal.value = '';
    textTipoAnimal.value = '';
}