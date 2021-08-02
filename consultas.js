var url = 'https://localhost:5001/consultas';
var corpoTabela = document.getElementById('corpoTabela');
var textCodAnimal = document.getElementById('textCodAnimal');
var textCodVeterinario = document.getElementById('textCodVeterinario');
var textDataConsulta = document.getElementById('textDataConsulta');
var textPeso = document.getElementById('textPeso');
var textDescricao = document.getElementById('textDescricao');
var textDataConsulta = document.getElementById('textDataConsulta');
var textHoraConsulta = document.getElementById('textHoraConsulta');
var textCodConsulta = document.getElementById('textCodConsulta');
var codConsultaCadastrarReceita = 0;
var textCodAnimalAlterar = document.getElementById('textCodAnimalAlterar');
var textCodVeterinarioAlterar = document.getElementById('textCodVeterinarioAlterar');
var textDataConsultaAlterar = document.getElementById('textDataConsultaAlterar');
var textHoraConsultaAlterar = document.getElementById('textHoraConsultaAlterar');
var textPesoAlterar = document.getElementById('textPesoAlterar');
var textDescricaoAlterar = document.getElementById('textDescricaoAlterar');
var dataReceita = document.getElementById('textDataReceita');
var prescricao = document.getElementById('textPrescricao');
var codConsultaModal = document.getElementById('textCodConsultaModal')

var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});
var modalCadastrarReceita = new bootstrap.Modal(document.getElementById('modalCadastrarReceita'), {});

var textCodConsultaExcluir = document.getElementById('textCodConsultaExcluir');

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
                linha += `<td id="codConsulta${info.codConsulta}">${info.codConsulta}</td>`;
                linha += `<td id="dataConsulta${info.codConsulta}">${info.dataConsulta.slice(0, 10)}</td>`;
                linha += `<td id="horaConsulta${info.codConsulta}">${info.dataConsulta.slice(11, 16)}</td>`;
                linha += `<td id="codAnimal${info.codConsulta}">${info.codAnimal}</td>`;
                linha += `<td id="codVeterinario${info.codConsulta}">${info.codVeterinario}</td>`;
                linha += `<td id="peso${info.codConsulta}">${info.peso}</td>`;
                linha += `<td id="descricao${info.codConsulta}">${info.descricao}</td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirCadastrarReceita(${info.codConsulta})">+ Receita</button></td>`;
                linha += `<td><button onclick="abrirAlterar(${info.codConsulta})" class="btn btn-dark">Alterar</button></td>`
                linha += `<td><button onclick="abrirExcluir(${info.codConsulta})" class="btn btn-dark">Excluir</button></td>`
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar consultas.';
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

function abrirCadastrar() {
modalCadastrar.show()
}

function cadastrarConsulta() {
    var codAnimal = textCodAnimal.value;
    var codVeterinario = textCodVeterinario.value;
    var dataConsulta = textDataConsulta.value;
    var horaConsulta = textHoraConsulta.value;
    if (!codAnimal || !codVeterinario || !dataConsulta || !horaConsulta) {
        alert('Preencha todos os dados para cadastrar!');
        return;
    }
    var novaConsulta = {
        codAnimal: codAnimal,
        codVeterinario: codVeterinario,
        dataConsulta: dataConsulta + 'T' + horaConsulta + ':00.000',
        peso: 0,
        descricao: '-'
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Consulta cadastrada com sucesso!`);
            limparCadastro();
            pesquisarConsultas();
            modalCadastrar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar a consulta.');
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novaConsulta));
}

function abrirExcluir(codConsulta) {
    document.getElementById('textCodConsultaExcluir').value = codConsulta
    modalExcluir.show();
}

function excluirConsulta() {
    var codConsulta = textCodConsultaExcluir.value;
    if (!confirm('Tem certeza que deseja excluir esta consulta?'))
        return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert('Consulta excluída com sucesso!');
            limparExclusao();
            pesquisarConsultas();
        }
    };
    xhttp.open('DELETE', `${url}?CodConsulta=${codConsulta}`, true);
    xhttp.send();
}

function abrirAlterar(codConsulta) {
    document.getElementById('textCodConsultaAlterar').value = codConsulta
    document.getElementById('textCodAnimalAlterar').value = document.getElementById(`codAnimal${codConsulta}`).innerHTML;
    document.getElementById('textCodVeterinarioAlterar').value = document.getElementById(`codVeterinario${codConsulta}`).innerHTML.slice(0,10);
    document.getElementById('textDataConsultaAlterar').value = document.getElementById(`dataConsulta${codConsulta}`).innerHTML;
    document.getElementById('textHoraConsultaAlterar').value = document.getElementById(`horaConsulta${codConsulta}`).innerHTML;
    document.getElementById('textPesoAlterar').value = document.getElementById(`peso${codConsulta}`).innerHTML;
    document.getElementById('textDescricaoAlterar').value = document.getElementById(`descricao${codConsulta}`).innerHTML;
    modalAlterar.show();
}

function alterarConsulta() {
    var codConsulta = textCodConsultaAlterar.value;
    var codAnimal = textCodAnimalAlterar.value;
    var codVeterinario = textCodVeterinarioAlterar.value;
    var dataConsulta = textDataConsultaAlterar.value;
    var horaConsulta = textHoraConsultaAlterar.value;
    var peso = textPesoAlterar.value;
    var descricao = textDescricaoAlterar.value;
    if (!codAnimal || !codVeterinario || !dataConsulta || !horaConsulta || !peso || !descricao || !codConsulta) {
        alert('Preencha todos os dados para cadastrar!');
        return;
    }
    var alterarConsulta = {
        codAnimal: codAnimal,
        codVeterinario: codVeterinario,
        dataConsulta: dataConsulta + 'T' + horaConsulta + ':00.000',
        peso: peso,
        descricao: descricao,
        codConsulta: codConsulta
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Consulta alterada com sucesso!');
            limparAlteracao();
            pesquisarConsultas();
            modalAlterar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível alterar a consulta.');
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(alterarConsulta));
}

function limparExclusao() {
    textCodConsultaExcluir.value = '';
}

function limparCadastro() {
    textCodAnimal.value = '';
    textCodVeterinario.value = '';
    textDataConsulta.value = '';
    textHoraConsulta.value = '';
    textPesoAlterar.value = '';
    textDescricaoAlterar.value = '';
}

function limparAlteracao() {
    textCodConsultaAlterar.value = '';
    textCodAnimalAlterar.value = '';
    textCodVeterinarioAlterar.value = '';
    textDataConsultaAlterar.value = '';
    textHoraConsultaAlterar.value = '';
    textPesoAlterar.value = '';
    textDescricaoAlterar.value = '';
}

function cadastrarReceita() {
    var url = 'https://localhost:5001/receitas';
    var dataReceita = document.getElementById('textDataReceita').value;
    var prescricao = document.getElementById('textPrescricao').value;
    var codConsultaModal = document.getElementById('textCodConsultaModal').value;
    if (!dataReceita || !prescricao) {
        alert('Preencha todos os dados para cadastrar a receita.');
        return;
    }
    var receitaCadastrada = {
        dataReceita: dataReceita,
        prescricao: prescricao,
        codConsulta: codConsultaModal
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Receita cadastrada com sucesso!');
            modalCadastrarReceita.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar a receita.');
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(receitaCadastrada));
    document.getElementById('textDataReceita').value = "";
    document.getElementById('textPrescricao').value = "";

}

function abrirCadastrarReceita(codConsulta) {
    document.getElementById(`textCodConsultaModal`).value = codConsulta;
    modalCadastrarReceita.show();
}