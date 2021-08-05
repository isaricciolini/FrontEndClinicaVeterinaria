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
var codConsultaModal = document.getElementById('textCodConsultaModal')

var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});
var modalCadastrarReceita = new bootstrap.Modal(document.getElementById('modalCadastrarReceita'), {});

var textCodConsultaExcluir = document.getElementById('textCodConsultaExcluir');

var modalDados = new bootstrap.Modal(document.getElementById('modalDados'), {});
var modalTodasConsultasReceitas = new bootstrap.Modal(document.getElementById('modalTodasConsultasReceitas'), {});
var modalTodasReceitas = new bootstrap.Modal(document.getElementById('modalTodasReceitas'), {});
var inicio = new Date();
let now = new Date();
now.setDate(now.getDate() + 7);
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



var modalDescricao = new bootstrap.Modal(document.getElementById('modalDescricao'), {});

pesquisarConsultas(inicio, fim);

function pesquisarConsultas(inicio, fim) {
    corpoTabela.innerHTML = '';
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
                linha += `<td>${info.nomeCliente}: | ${info.tipo} | ${info.nomeAnimal}</td>`
                linha += `<td><button class="btn btn-dark" onclick="abrirDados(${info.codAnimal})">Dados</button></td>`;
                linha += `<td id="peso${info.codConsulta}">${info.peso}</td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirDescricao(${info.codConsulta})">Exibir</button></td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirTodasConsultasReceitas(${info.codAnimal})">Exibir</button></td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirCadastrarReceita(${info.codConsulta})">+</button></td>`;
                linha += `<td><button onclick="abrirAlterar(${info.codConsulta})" class="btn btn-dark">Alterar</button></td>`
                linha += `<td><button onclick="abrirExcluir(${info.codConsulta})" class="btn btn-dark">Excluir</button></td>`
                linha += '</tr>';
                linha += '<div style="display: none;">'
                linha += `<p id="descricao${info.codConsulta}">${info.descricao}</p>`;
                linha += `<p id="codVeterinario${info.codConsulta}">${info.codVeterinario}</p>`;
                linha += `<p id="codAnimal${info.codConsulta}">${info.codAnimal}</p>`;
                linha += '</div>'
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar consultas.';
        }
    };
    xhttp.open('GET', `${url}/atendimento/${inicio}ate${fim}/${getCookie("codVeterinario")}`, true);
    xhttp.send();
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
            pesquisarConsultas(inicio, fim);
        }
    };
    xhttp.open('DELETE', `${url}?CodConsulta=${codConsulta}`, true);
    xhttp.send();
}

function abrirAlterar(codConsulta) {
    document.getElementById('textCodConsultaAlterar').value = codConsulta
    document.getElementById('textCodAnimalAlterar').value = document.getElementById(`codAnimal${codConsulta}`).innerHTML;
    document.getElementById('textCodVeterinarioAlterar').value = document.getElementById(`codVeterinario${codConsulta}`).innerHTML.slice(0, 10);
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
            pesquisarConsultas(inicio, fim);
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


function abrirDados(codAnimal) {
    cardBodyDados.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var animal = JSON.parse(this.response);
            var linha = `
                <div class="col-12">
                                        <p class="card-text container"><b>Dono Animal: </b>${animal.codClienteNavigation.nomeCliente}<br>
                                        <b>CodAnimal: </b>${animal.codAnimal}<br>
                                        <b>Nome: </b>${animal.nomeAnimal}<br>
                                        <b>Nascimento: </b>${(animal.nascimento.slice(8, 10)) + "/" + (animal.nascimento.slice(5, 7)) + "/" + (animal.nascimento.slice(0, 4))}<br>
                                        <b>Tipo: </b>${animal.tipo}<br>
                                        <b>Raça: </b>${animal.raca}</p>
                                </div>`;
            cardBodyDados.innerHTML += linha;
        } else if (this.readyState == 4) {
            cardBodyDados.innerHTML = 'Erro ao pesquisar dados do animal';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Animais/animal/${codAnimal}`, true);
    xhttp.send();
    modalDados.show();
}

function abrirTodasConsultasReceitas(codAnimal) {

    cardBodyTodasConsultasReceitas.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response)
            var topo = `<div class="card col-12 text-center">
            <p>
            <br>
            <b>Cod.Animal: </b>${resposta.codAnimal}
            <b>Nome Animal: </b>${resposta.nomeAnimal}<br>
            <b>Nascimento: </b>${(resposta.nascimento.slice(8, 10)) + "/" + (resposta.nascimento.slice(5, 7)) + "/" + (resposta.nascimento.slice(0, 4))}
            <b>Tipo: </b>${resposta.tipo}
            <b>Raça: </b>${resposta.raca}
            </p></div>`
            cardBodyTodasConsultasReceitas.innerHTML += topo;
            for (var i = 0; i < resposta.consulta.length; i++) {
                var consulta = resposta.consulta[i];
                var linha = `
                <div class="card col-12 col-md-6">
                                    <div class="card-body">
                                        <h5 class="card-title">Consultas:</h5>
                                        <p class="card-text"><b>Cod.Consulta: </b>${consulta.codConsulta}<br>
                                        <b>Data da consulta: </b>${(consulta.dataConsulta.slice(8, 10)) + "/" + (consulta.dataConsulta.slice(5, 7)) + "/" + (consulta.dataConsulta.slice(0, 4))} ${(consulta.dataConsulta.slice(11,16) )}<br>
                                        <b>Peso: </b>${consulta.peso}<br>
                                        <b>Descrição: </b>${consulta.descricao}<br>
                                        <b>Código do Veterinário: </b>${consulta.codVeterinario}</p>
                                        <button class="btn btn-dark" onclick="abrirTodasReceitas(${consulta.codConsulta})">Exibir Receitas</button>
                                      </div>
                                </div>`;
                cardBodyTodasConsultasReceitas.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            cardBodyTodasConsultasReceitas.innerHTML = 'Erro ao pesquisar dados da consulta';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Animais/Consultar/${codAnimal}`, true);
    xhttp.send();
    modalTodasConsultasReceitas.show();
}

function abrirTodasReceitas(codConsulta) {
    modalTodasConsultasReceitas.hide()
    modalTodasReceitas.show()
    cardBodyTodasReceitas.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            var topo = `<div class="card col-12 text-center">
            <p>
            <b>Cod.Consulta: </b>${resposta.codConsulta}<br>
            <b>Data Consulta: </b>${(resposta.dataConsulta.slice(8, 10)) + "/" + (resposta.dataConsulta.slice(5, 7)) + "/" + (resposta.dataConsulta.slice(0, 4))} ${resposta.dataConsulta.slice(11, 16)}<br>
            </p></div>`
            cardBodyTodasReceitas.innerHTML += topo;
            if (resposta.receita.length == 0) {
                cardBodyTodasReceitas.innerHTML = "<p>Nenhuma receita foi cadastrada para esta consulta.</p>";
                return;
            }
            for (var i = 0; i < resposta.receita.length; i++) {
                var receita = resposta.receita[i];
                var linha = `
                <div class="card col-12 col-md-6">
                                    <div class="card-body">
                                        <h5 class="card-tittle">Receita ${receita.codReceita}</h5>
                                        <p class="card-text"><b>Cod.Consulta: </b>${receita.codConsulta}<br>
                                        <b>Data da receita: </b>${(receita.dataReceita.slice(8, 10)) + "/" + (receita.dataReceita.slice(5, 7)) + "/" + (receita.dataReceita.slice(0, 4))}<br>
                                        <b>Prescrição: </b>${receita.prescricao}</p>
                                    </div>
                                </div>`;
                cardBodyTodasReceitas.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            cardBodyTodasReceitas.innerHTML = 'Erro ao pesquisar Receita';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Consultas/receitas/${codConsulta}`, true);
    xhttp.send();
}

function pesquisarData() {
    inicio = textSemanasInicio.value;
    fim = textSemanasFim.value; 
    pesquisarConsultas(inicio, fim);

}

function abrirDescricao(codConsulta) {
    cardBodyDescricao.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var consulta = JSON.parse(this.response);
            var linha = `
                <div class="card col-12 col-md-6">
                                    <div class="card-body">
                                        <h5 class="card-title">Descrição da consulta:</h5>
                                        <p class="card-text"><b>Descrição: </b>${consulta.descricao}</p>
                                      </div>
                                </div>`;
            cardBodyDescricao.innerHTML += linha;
        } else if (this.readyState == 4) {
            cardBodyDescricao.innerHTML = 'Erro ao pesquisar descrição da consulta';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Consultas/receitas/${codConsulta}`, true);
    xhttp.send();
    modalDescricao.show();
}