var url = 'https://localhost:5001/consultas';
var textSemanasInicio = document.getElementById('textSemanasInicio')
var textSemanasFim = document.getElementById('textSemanasFim')
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
var codConsultaModal = document.getElementById('textCodConsultaModal');
var cardBodyReceitas = document.getElementById('cardBodyReceitas');

var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});
var modalCadastrarReceita = new bootstrap.Modal(document.getElementById('modalCadastrarReceita'), {});
var modalReceitas = new bootstrap.Modal(document.getElementById('modalReceitas'), {});

var modalSucesso = new bootstrap.Modal(document.getElementById('modalSucesso'), {});
var modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'), {});
var modalAlertaDeOperacao = new bootstrap.Modal(document.getElementById('modalAlertaDeOperacao'))

var inicio = new Date();
inicio.setDate(inicio.getDate() - 1825);
let now = new Date();
now.setDate(now.getDate() + 730);
var dd = String(inicio.getDate()).padStart(2, '0');
var mm = String(inicio.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = inicio.getFullYear();
inicio = yyyy + '-' + mm + '-' + dd;
var sdd = String(now.getDate()).padStart(2, '0');
var smm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
var syyyy = now.getFullYear();
var fim = syyyy + '-' + smm + '-' + sdd;
textSemanasInicio.value = inicio;
textSemanasFim.value = fim; 


var textCodConsultaExcluir = document.getElementById('textCodConsultaExcluir');

pesquisarConsultas(inicio, fim);

function pesquisarConsultas(inicio, fim) {
    corpoTabela.innerHTML = '';
    inicio = textSemanasInicio.value;
    fim = textSemanasFim.value;
    codVeterinario = document.getElementById("textCodVeterinarioFiltro").value
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td id="codConsulta${info.codConsulta}">${info.codConsulta}</td>`;
                linha += `<td id="dataConsulta${info.codConsulta}">${(info.dataConsulta.slice(8, 10)) + "/" + (info.dataConsulta.slice(5, 7)) + "/" + (info.dataConsulta.slice(0, 4))}</td>`;
                linha += `<td id="horaConsulta${info.codConsulta}">${info.dataConsulta.slice(11, 16)}</td>`;
                linha += `<td id="codAnimal${info.codConsulta}">${info.codAnimal} - ${info.nomeAnimal}</td>`;
                linha += `<td id="codVeterinario${info.codConsulta}">${info.codVeterinario} - ${info.nomeFuncionario}</td>`;
                linha += `<td id="peso${info.codConsulta}">${info.peso}Kg</td>`;
                linha += `<td id="descricao${info.codConsulta}">${info.descricao}</td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirCadastrarReceita(${info.codConsulta})">+ Receita</button></td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirReceitas(${info.codConsulta})">Exibir</button></td>`;
                linha += `<td><button onclick="abrirAlterar(${info.codConsulta})" class="btn btn-dark">Alterar</button></td>`;
                linha += `<td><button onclick="abrirExcluir(${info.codConsulta})" class="btn btn-dark">Excluir</button></td>`;
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar consultas.';
        }
    };
    if(codVeterinario == null || codVeterinario == "") {
        xhttp.open('GET', `${url}/atendimento/${inicio}ate${fim}`, true);
        xhttp.send();
    }
    else {
        xhttp.open('GET', `${url}/atendimento/${inicio}ate${fim}/${codVeterinario}`, true);
        xhttp.send();
    }
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
        modalAlerta.show();
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
            limparCadastro();
            pesquisarConsultas(inicio, fim);
            modalCadastrar.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
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
    modalExcluir.show();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            modalExcluir.hide();
            limparExclusao();
            pesquisarConsultas(inicio, fim);
            modalSucesso.show()
        }
    };
    xhttp.open('DELETE', `${url}?CodConsulta=${codConsulta}`, true);
    xhttp.send();
}

function abrirAlterar(codConsulta) {
    DataConsultaAlterar = document.getElementById(`dataConsulta${codConsulta}`).innerHTML.split('/');
    DataConsultaAlterar = new Date(DataConsultaAlterar[2], DataConsultaAlterar[1] - 1, DataConsultaAlterar[0]).toISOString().substring(0, 10);
    document.getElementById('textCodConsultaAlterar').value = codConsulta
    document.getElementById('textCodAnimalAlterar').value = document.getElementById(`codAnimal${codConsulta}`).innerHTML;
    document.getElementById('textCodVeterinarioAlterar').value = document.getElementById(`codVeterinario${codConsulta}`).innerHTML.slice(0, 10);
    document.getElementById('textDataConsultaAlterar').value = DataConsultaAlterar;
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
        modalAlerta.show();
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
            limparAlteracao();
            pesquisarConsultas(inicio, fim);
            modalAlterar.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
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
        modalAlerta.show();
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
            modalCadastrarReceita.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(receitaCadastrada));
    document.getElementById('textDataReceita').value = "";
    document.getElementById('textPrescricao').value = "";

}

function abrirReceitas(codConsulta) {
    cardBodyReceitas.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            if (resposta.receita == 0 || resposta.receita == undefined) {
                cardBodyReceitas.innerHTML = "<p>Nenhuma receita para este animal foi encontrada.</p>";
                return;
            }
            for (var i = 0; i < resposta.receita.length; i++) {
                var receita = resposta.receita[i];
                var linha = `
                                <div class="col-sm-6">
                                    <div class="card-body">
                                        <h5 class="card-tittle">Receita ${receita.codReceita}</h5>
                                        <b>Data: </b>${(receita.dataReceita.slice(8, 10)) + "/" + (receita.dataReceita.slice(5, 7)) + "/" + (receita.dataReceita.slice(0, 4))}<br>
                                        <b>Hora: </b>${receita.dataReceita.slice(11, 16)}<br>
                                        <b>Prescrição: </b>${receita.prescricao}</p>
                                    </div>
                                </div>`;
                cardBodyReceitas.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            cardBodyReceitas.innerHTML = 'Erro ao pesquisar Receita';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Consultas/receitas/${codConsulta}`, true);
    xhttp.send();
    modalReceitas.show();
}

function abrirCadastrarReceita(codConsulta) {
    document.getElementById(`textCodConsultaModal`).value = codConsulta;
    modalCadastrarReceita.show();
}