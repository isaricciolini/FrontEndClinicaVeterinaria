var url = 'https://localhost:5001/consultas';
var corpoTabela = document.getElementById('corpoTabela');
var dropdownVet = document.getElementById('dropdownVet');
var textNomeAnimal = document.getElementById('textNomeAnimal');
var textNomeFuncionario = document.getElementById('textNomeFuncionario');
var textDataConsulta = document.getElementById('textDataConsulta');
var textNomeCliente = document.getElementById('textNomeCliente');

const pesoCadastrar = 0;
const descricaoCadastrar = "-";

var codConsultaAlterar = 0;
var textNomeAnimalAlterar = document.getElementById('textNomeAnimalAlterar');
var textNomeFuncionarioAlterar = document.getElementById('textNomeFuncionarioAlterar');
var textDataConsultaAlterar = document.getElementById('textDataConsultaAlterar');
var textHoraConsultaAlterar = document.getElementById('textHoraConsultaAlterar');
var textNomeClienteAlterar = document.getElementById('textNomeClienteAlterar');

var textCodAnimal = document.getElementById('textCodAnimal');
var textCodCliente = document.getElementById('textCodCliente');
var textCodFuncionario = document.getElementById('textCodFuncionario');
var textPeso = document.getElementById('textPeso');
var textDescricao = document.getElementById('textDescricao');

var textPesoAlterar = document.getElementById('textPesoAlterar');
var textDescricaoAlterar = document.getElementById('textDescricaoAlterar');
var textCodAnimalAlterar = document.getElementById('textCodAnimalAlterar');
var textCodFuncionarioAlterar = document.getElementById('textCodFuncionarioAlterar');

var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});
var modalCadastrarDataHora = new bootstrap.Modal(document.getElementById('modalCadastrarDataHora'), {});
var modalListaClientes = new bootstrap.Modal(document.getElementById('modalListaClientes'), {});
var modalListaAnimais = new bootstrap.Modal(document.getElementById('modalListaAnimais'), {});
var modalListaFuncionarios = new bootstrap.Modal(document.getElementById('modalListaFuncionarios'), {});
var modalConfirmarCadastrar = new bootstrap.Modal(document.getElementById('modalConfirmarCadastrar'), {});
var modalSucesso = new bootstrap.Modal(document.getElementById('modalSucesso'), {});
var modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'), {});
var modalAlertaDeOperacao = new bootstrap.Modal(document.getElementById('modalAlertaDeOperacao'))


exibirAgenda();

function exibirAgenda() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${info.codConsulta}</td>`;
                linha += `<td id="dataConsulta${info.codConsulta}">${(info.dataConsulta.slice(8, 10)) + "/" + (info.dataConsulta.slice(5, 7)) + "/" + (info.dataConsulta.slice(0, 4))}</td>`;
                linha += `<td id="horaConsulta${info.codConsulta}">${info.dataConsulta.slice(11, 16)}</td>`;
                linha += `<td id="nomeAnimal${info.codConsulta}">${info.nomeAnimal}</td>`;
                linha += `<td id="nomeCliente${info.codConsulta}">${info.nomeCliente}</td>`;
                linha += `<td id="nomeFuncionario${info.codConsulta}">${info.nomeFuncionario}</td>`;
                linha += `<td><button class="btn btn-warning " onclick="abrirAlterarConsulta(${info.codConsulta})">Alterar</button></td>`;
                linha += `<td><button class="btn btn-danger " onclick="excluirConsulta(${info.codConsulta})">Excluir</button></td>`;
                linha += '</tr>';
                linha += '<div style="display: none;">';
                linha += `<p id="codAnimal${info.codConsulta}">${info.codAnimal}</p>`;
                linha += `<p id="codCiente${info.codConsulta}">${info.codCliente}</p>`;
                linha += `<p id="codFuncionario${info.codConsulta}">${info.codFuncionario}</p>`;
                linha += `<p id="peso${info.codConsulta}">${info.peso}</p>`;
                linha += `<p id="descricao${info.codConsulta}">${info.descricao}</p>`;
                linha += '</div>';
                corpoTabela.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar consultas.';
        }
    };
    xhttp.open('GET', `${url}/agenda`, true);
    xhttp.send();
}


function excluirConsulta(codConsulta) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            exibirAgenda();
            modalExcluir.hide();
            modalSucesso.show();
        }
    };
    xhttp.open('DELETE', `${url}?codConsulta=${codConsulta}`, true);
    xhttp.send();
}

function formatarData() {

}

function abrirCadastrarDataHora() {
    modalCadastrarDataHora.show();
}

function confirmarCadastrarDataHora() {
    dataConsultaCadastrar = document.getElementById('textDataConsultaCadastrar').value;
    horaConsultaCadastrar = document.getElementById('textHoraConsultaCadastrar').value;


    if (!dataConsultaCadastrar || !horaConsultaCadastrar) {
        modalAlertaDeOperacao.show();
        return;
    }
    else {
        modalCadastrarDataHora.hide();
        abrirCadastrarListaClientes();
    }
}

function abrirCadastrarListaClientes() {
    modalListaAnimais.hide();
    modalListaClientes.show();
    corpoTabelaClientes.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                if (info.cpf == 00000000000) {
                }
                else {
                    var cliente = resposta[i];
                    var linha = '<tr class="itemClientes">';
                    linha += `<td>${cliente.codCliente}</td>`;
                    linha += `<td id="nomeClienteConsultaCadastrar${cliente.codCliente}">${cliente.nomeCliente}</td>`;
                    linha += `<td>${cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>`;
                    linha += `<td><button onclick="abrirCadastrarListaAnimais(${cliente.codCliente})" class="btn btn-dark">+</button></td>`
                    linha += '</tr>';
                    corpoTabelaClientes.innerHTML += linha;
                }
            }
        } else if (this.readyState == 4) {
            corpoTabelaClientes.innerHTML = 'Erro ao pesquisar clientes.';
        }
    };
    xhttp.open('GET', 'https://localhost:5001/clientes', true);
    xhttp.send();
}

function abrirCadastrarListaAnimais(codCliente) {
    nomeClienteConsultaCadastrar = document.getElementById(`nomeClienteConsultaCadastrar${codCliente}`).innerHTML;
    modalListaClientes.hide();
    modalListaAnimais.show();
    corpoTabelaAnimais.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.animais.length; i++) {
                var animal = resposta.animais[i];
                var linha = '<tr class="itemAnimais">';
                linha += `<td>${animal.codAnimal}</td>`;
                linha += `<td id="nomeAnimalConsultaCadastrar${animal.codAnimal}">${animal.nomeAnimal}</td>`;
                linha += `<td>${animal.raca}</td>`;
                linha += `<td>${animal.tipo}</td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirCadastrarListaFuncionarios(${animal.codAnimal})">+</button></td>`;
                linha += '</tr>';
                corpoTabelaAnimais.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            corpoTabelaAnimais.innerHTML = 'Nenhum animal cadastrado.';
        }
    };
    xhttp.open('GET', `https://localhost:5001/clientes/relatorio/${codCliente}`, true);
    xhttp.send();

}

function abrirCadastrarListaFuncionarios(codAnimal) {
    codAnimalConsultaCadastrar = codAnimal;
    nomeAnimalConsultaCadastrar = document.getElementById(`nomeAnimalConsultaCadastrar${codAnimal}`).innerHTML;
    modalListaAnimais.hide();
    modalListaFuncionarios.show();
    corpoTabelaFuncionarios.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var vet = resposta[i];
                if (!vet.crmv == null || !vet.crmv == undefined || !vet.crmv == "") {
                    var linha = '<tr class="itemFuncionarios">';
                    linha += `<td>${vet.codFuncionario}</td>`;
                    linha += `<td id="nomeFuncionarioConsultaCadastrar${vet.codFuncionario}">${vet.nomeFuncionario}</td>`;
                    linha += `<td>${vet.crmv}</td>`;
                    linha += `<td><button class="btn btn-dark" onclick="abrirConfirmarCadastrar(${vet.codFuncionario})">+</button></td>`;
                    linha += '</tr>';
                    corpoTabelaFuncionarios.innerHTML += linha;
                }
            }
        } else if (this.readyState == 4) {
            corpoTabelaFuncionarios.innerHTML = 'Nenhum animal cadastrado.';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Funcionarios`, true);
    xhttp.send();


}



function abrirListaFuncionarios() {
    dropdownVet.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            var linha = `<option selected>Selecione um veterinário</option>`;
            for (var i = 0; i < resposta.length; i++) {
                var vet = resposta[i];
                if (!vet.crmv == null || !vet.crmv == undefined || !vet.crmv == "") {
                    linha += `<option value=${vet.codFuncionario}>${vet.nomeFuncionario}</option>`;
                }
            }
            dropdownVet.innerHTML += linha;
        } else if (this.readyState == 4) {
            dropdownVet.innerHTML = 'Nenhum veterinário cadastrado.';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Funcionarios`, true);
    xhttp.send();
}

function abrirConfirmarCadastrar(codFuncionario) {
    modalConfirmarCadastrar.show();
    modalListaFuncionarios.hide();
    nomeFuncionarioConsultaCadastrar = document.getElementById(`nomeFuncionarioConsultaCadastrar${codFuncionario}`).innerHTML
    codFuncionarioConsultaCadastrar = codFuncionario
    document.getElementById('textDataConsultaConfirmar').value = dataConsultaCadastrar;
    document.getElementById('textHoraConsultaConfirmar').value = horaConsultaCadastrar;
    document.getElementById('textNomeAnimalCadastrar').value = nomeAnimalConsultaCadastrar;
    document.getElementById('textCodAnimalCadastrar').value = codAnimalConsultaCadastrar;
    document.getElementById('textNomeFuncionarioCadastrar').value = nomeFuncionarioConsultaCadastrar;
    document.getElementById('textCodFuncionarioCadastrar').value = codFuncionarioConsultaCadastrar;
    document.getElementById('textNomeClienteCadastrar').value = nomeClienteConsultaCadastrar;

}

function cadastrarConsulta() {

    dataConsultaCadastrar = document.getElementById('textDataConsultaConfirmar').value;
    horaConsultaCadastrar = document.getElementById('textHoraConsultaConfirmar').value;
    codAnimalCadastrar = codAnimalConsultaCadastrar;
    codFuncionarioCadastrar = codFuncionarioConsultaCadastrar;


    if (!codAnimalCadastrar || !codFuncionarioCadastrar || !dataConsultaCadastrar || !horaConsultaCadastrar) {
        modalAlerta.show();
        return;
    }
    var novaConsulta = {
        codAnimal: codAnimalCadastrar,
        codFuncionario: codFuncionarioCadastrar,
        dataConsulta: dataConsultaCadastrar + 'T' + horaConsultaCadastrar + ':00.000',
        peso: pesoCadastrar,
        descricao: descricaoCadastrar
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            modalConfirmarCadastrar.hide();
            exibirAgenda();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novaConsulta));

}

function abrirAlterarConsulta(codConsulta) {
    DataConsultaAlterar = document.getElementById(`dataConsulta${codConsulta}`).innerHTML.split('/');
    DataConsultaAlterar = new Date(DataConsultaAlterar[2], DataConsultaAlterar[1] - 1, DataConsultaAlterar[0]).toISOString().substring(0, 10);
    document.getElementById('textCodConsultaAlterar').value = codConsulta
    document.getElementById('textNomeClienteAlterar').value = document.getElementById(`nomeCliente${codConsulta}`).innerHTML;
    document.getElementById('textNomeAnimalAlterar').value = document.getElementById(`nomeAnimal${codConsulta}`).innerHTML;
    document.getElementById('textHoraConsultaAlterar').value = document.getElementById(`horaConsulta${codConsulta}`).innerHTML;
    document.getElementById('textDataConsultaAlterar').value = DataConsultaAlterar;
    document.getElementById('textCodAnimalAlterar').value = document.getElementById(`codAnimal${codConsulta}`).innerHTML;
    document.getElementById('textCodFuncionarioAlterar').value = document.getElementById(`codFuncionario${codConsulta}`).innerHTML;
    abrirListaFuncionarios();
    modalAlterar.show();
}


function alterarConsulta() {
    var dataConsulta = textDataConsultaAlterar.value;
    var horaConsulta = textHoraConsultaAlterar.value;
    var codConsulta = textCodConsultaAlterar.value;
    var codAnimal = textCodAnimalAlterar.value;
    var codFuncionario = dropdownVet.value;

    if (!dataConsulta || !horaConsulta) {
        modalAlerta.show();
        return;
    }
    var consulta = {
        dataConsulta: dataConsulta + 'T' + horaConsulta + ':00.000Z',
        codConsulta: codConsulta,
        codAnimal: codAnimal,
        codFuncionario: codFuncionario,
        peso: pesoCadastrar,
        descricao: descricaoCadastrar
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            exibirAgenda();
            modalAlterar.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('PUT', `${url}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(consulta));
}

function limpar() {
    textDataConsulta.value = '';
    textNomeAnimal.value = '';
    textNomeCliente.value = '';
    textNomeFuncionario.value = '';
}

function ListaVeterinarios() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                linha += `<td id="nomeFuncionario${info.codConsulta}">${info.nomeFuncionario}</td>`;
                corpoTabela.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar consultas.';
        }
    };
    xhttp.open('GET', `${url}/lista/veterinarios`, true);
    xhttp.send();
}
