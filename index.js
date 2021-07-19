var url = 'https://localhost:5001/consultas';
var corpoTabela = document.getElementById('corpoTabela');
var textNomeAnimal = document.getElementById('textNomeAnimal');
var textNomeVeterinario = document.getElementById('textNomeVeterinario');
var textDataConsulta = document.getElementById('textDataConsulta');
var textNomeCliente = document.getElementById('textNomeCliente');
var codConsultaAlterar = 0;
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var textNomeAnimalAlterar = document.getElementById('textNomeAnimalAlterar');
var textNomeVeterinarioAlterar = document.getElementById('textNomeVeterinarioAlterar');
var textDataConsultaAlterar = document.getElementById('textDataConsultaAlterar');
var textNomeClienteAlterar = document.getElementById('textNomeClienteAlterar');
var textCodAnimal = document.getElementById('textCodAnimal');
var textCodCliente = document.getElementById('textCodCliente');
var textCodVeterinario = document.getElementById('textCodVeterinario');
var textPeso = document.getElementById('textPeso');
var textDescricao = document.getElementById('textDescricao');

pesquisarConsultas();

function pesquisarConsultas() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${info.codConsulta}</td>`;
                linha += `<td id="codConsulta${info.codConsulta}">${info.dataConsulta}</td>`;
                linha += `<td id="nomeAnimal${info.codConsulta}">${info.nomeAnimal}</td>`;
                linha += `<td id="nomeCliente${info.codConsulta}">${info.nomeCliente}</td>`;
                linha += `<td id="nomeVeterinario${info.codConsulta}">${info.nomeVeterinario}</td>`;
                linha += `<td><a onclick="abrirAlterarConsulta(${info.codConsulta})">Alterar</a></td>`;
                linha += `<td><a onclick="excluirConsulta(${info.codConsulta})">Excluir</a></td>`;
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela','.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar consultas.';
        }
    };
    xhttp.open('GET', `${url}/agenda`, true);
    xhttp.send();
}

function cadastrarConsulta() {
    var dataConsulta = textDataConsulta.value;
    var nomeAnimal = textNomeAnimal.value;
    var nomeCliente = textNomeCliente.value;
    var nomeVeterinario = textNomeVeterinario.value;
    if (!dataConsulta || !nomeAnimal || !nomeCliente || !nomeAnimal || nomeVeterinario) {
        alert('Preencha todos os dados para cadastrar!');
        return;
    }
    var consulta = {
        dataConsulta: dataConsulta,
        codAnimal: codAnimal,
        codCliente: codCliente,
        codVeterinario: codVeterinario,
        peso: 0,
        descricao: ''
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Consulta de ${consulta.nomeAnimal} cadastrada com sucesso!`);
            limpar();
            pesquisarConsultas();
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar a consulta.');
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(consulta));    
}

function excluirConsulta(codConsulta) {
    if (!confirm('Tem certeza que deseja excluir esta consulta?'))
        return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert('Consulta excluída com sucesso!');
            pesquisarConsultas();
        }
    };
    xhttp.open('DELETE', `${url}/${codConsulta}`, true);
    xhttp.send();
}

function abrirAlterarConsulta(codConsulta) {
    codConsultaAlterar = codConsulta;
    var nomeAnimal = document.getElementById(`nomeAnimal${codConsulta}`).innerHTML;
    var nomeVeterinario = document.getElementById(`nomeVeterinario${codConsulta}`).innerHTML;
    var nomeCliente = document.getElementById(`nomeCliente${codConsulta}`).innerHTML;
    var dataConsulta = document.getElementById(`dataConsulta${codConsulta}`).innerHTML;
    textNomeAnimalAlterar.value = nomeAnimal;
    textNomeVeterinarioAlterar.value = nomeVeterinario;
    textDataConsultaAlterar.value = dataConsulta;
    textNomeClienteAlterar.value = nomeCliente;
    modalAlterar.show();
}

function alterarConsulta() {
    var dataConsulta = textDataConsultaAlterar.value;
    var nomeAnimal = textNomeAnimalAlterar.value;
    var nomeCliente = textNomeClienteAlterar.value;
    var nomeVeterinario = textNomeVeterinarioAlterar.value;
    if (!dataConsulta || !nomeAnimal || !nomeCliente || !nomeVeterinario) {
        alert('Preencha todos os dados para alterar!');
        return;
    }
    var consulta = {
        dataConsulta: dataConsulta,
        nomeAnimal: nomeAnimal,
        nomeCliente: nomeCliente,
        nomeVeterinario: nomeVeterinario,
        codConsulta: codConsultaAlterar
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Consulta de ${consulta.nomeAnimal} alterado(a) com sucesso!`);
            limpar();
            pesquisarConsultas();
            modalAlterar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível alterar a consulta.');
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(consulta)); 
}

function limpar() {
    textDataConsulta.value = '';
    textNomeAnimal.value = '';
    textNomeCliente.value = '';
    textNomeVeterinario.value = '';
}
