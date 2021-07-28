var url = 'https://localhost:5001/consultas';
var corpoTabela = document.getElementById('corpoTabela');
var textNomeAnimal = document.getElementById('textNomeAnimal');
var textNomeVeterinario = document.getElementById('textNomeVeterinario');
var textDataConsulta = document.getElementById('textDataConsulta');
var textNomeCliente = document.getElementById('textNomeCliente');

const pesoCadastrar = 0;
const descricaoCadastrar = "-";

var codConsultaAlterar = 0;
var textNomeAnimalAlterar = document.getElementById('textNomeAnimalAlterar');
var textNomeVeterinarioAlterar = document.getElementById('textNomeVeterinarioAlterar');
var textDataConsultaAlterar = document.getElementById('textDataConsultaAlterar');
var textHoraConsultaAlterar = document.getElementById('textHoraConsultaAlterar');
var textNomeClienteAlterar = document.getElementById('textNomeClienteAlterar');

var textCodAnimal = document.getElementById('textCodAnimal');
var textCodCliente = document.getElementById('textCodCliente');
var textCodVeterinario = document.getElementById('textCodVeterinario');
var textPeso = document.getElementById('textPeso');
var textDescricao = document.getElementById('textDescricao');

var textPesoAlterar = document.getElementById('textPesoAlterar');
var textDescricaoAlterar = document.getElementById('textDescricaoAlterar');
var textCodAnimalAlterar = document.getElementById('textCodAnimalAlterar');
var textCodVeterinarioAlterar = document.getElementById('textCodVeterinarioAlterar');

var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});
var modalCadastrarDataHora = new bootstrap.Modal(document.getElementById('modalCadastrarDataHora'), {});
var modalListaClientes = new bootstrap.Modal(document.getElementById('modalListaClientes'), {});
var modalListaAnimais = new bootstrap.Modal(document.getElementById('modalListaAnimais'), {});
var modalListaVeterinarios = new bootstrap.Modal(document.getElementById('modalListaVeterinarios'), {});
var modalConfirmarCadastrar = new bootstrap.Modal(document.getElementById('modalConfirmarCadastrar'), {});


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
                linha += `<td id="dataConsulta${info.codConsulta}">${info.dataConsulta.slice(0, 10)}</td>`;
                linha += `<td id="horaConsulta${info.codConsulta}">${info.dataConsulta.slice(11, 16)}</td>`;
                linha += `<td id="nomeAnimal${info.codConsulta}">${info.nomeAnimal}</td>`;
                linha += `<td id="nomeCliente${info.codConsulta}">${info.nomeCliente}</td>`;
                linha += `<td id="nomeVeterinario${info.codConsulta}">${info.nomeVeterinario}</td>`;
                linha += `<td><button class="btn btn-dark " onclick="abrirAlterarConsulta(${info.codConsulta})">Alterar</button></td>`;
                linha += `<td><button class="btn btn-dark " onclick="excluirConsulta(${info.codConsulta})">Excluir</button></td>`;
                linha += '</tr>';
                linha += '<div style="display: none;">';
                linha += `<p id="codAnimal${info.codConsulta}">${info.codAnimal}</p>`;
                linha += `<p id="codCiente${info.codConsulta}">${info.codCliente}</p>`;
                linha += `<p id="codVeterinario${info.codConsulta}">${info.codVeterinario}</p>`;
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
    if (!confirm('Tem certeza que deseja excluir esta consulta?'))
        return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert('Consulta excluída com sucesso!');
            exibirAgenda();
        }
    };
    xhttp.open('DELETE', `${url}/${codConsulta}`, true);
    xhttp.send();
}

function abrirCadastrarDataHora() {
    modalCadastrarDataHora.show();
}

function confirmarCadastrarDataHora() {
    dataConsultaCadastrar = document.getElementById('textDataConsultaCadastrar').value;
    horaConsultaCadastrar = document.getElementById('textHoraConsultaCadastrar').value;


    if (!dataConsultaCadastrar || !horaConsultaCadastrar) {
        alert('Preencha todos os dados para alterar!');
        return;
    }
    else {
        modalCadastrarDataHora.hide();
        abrirCadastrarListaClientes();
    }
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
                linha += `<td><button onclick="abrirCadastrarListaAnimais(${cliente.codCliente})" class="btn btn-dark">+</button></td>`
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
                linha += `<td><button class="btn btn-dark" onclick="abrirCadastrarListaVeterinarios(${animal.codAnimal})">+</button></td>`;
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

function abrirCadastrarListaVeterinarios(codAnimal) {
    codAnimalConsultaCadastrar = codAnimal;
    nomeAnimalConsultaCadastrar = document.getElementById(`nomeAnimalConsultaCadastrar${codAnimal}`).innerHTML;
    modalListaAnimais.hide();
    modalListaVeterinarios.show();
    corpoTabelaVeterinarios.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var vet = resposta[i];
                var linha = '<tr class="itemVeterinarios">';
                linha += `<td>${vet.codVeterinario}</td>`;
                linha += `<td id="nomeVeterinarioConsultaCadastrar${vet.codVeterinario}">${vet.nomeVeterinario}</td>`;
                linha += `<td>${vet.crmv}</td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirConfirmarCadastrar(${vet.codVeterinario})">+</button></td>`;
                linha += '</tr>';
                corpoTabelaVeterinarios.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            corpoTabelaVeterinarios.innerHTML = 'Nenhum animal cadastrado.';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Veterinarios`, true);
    xhttp.send();


}

function abrirConfirmarCadastrar(codVeterinario) {
    modalConfirmarCadastrar.show();
    modalListaVeterinarios.hide();
    nomeVeterinarioConsultaCadastrar = document.getElementById(`nomeVeterinarioConsultaCadastrar${codVeterinario}`).innerHTML
    codVeterinarioConsultaCadastrar = codVeterinario
    document.getElementById('textDataConsultaConfirmar').value = dataConsultaCadastrar;
    document.getElementById('textHoraConsultaConfirmar').value = horaConsultaCadastrar;
    document.getElementById('textNomeAnimalCadastrar').value = nomeAnimalConsultaCadastrar;
    document.getElementById('textNomeAnimalCadastrar').value = codAnimalConsultaCadastrar;
    document.getElementById('textNomeVeterinarioCadastrar').value = nomeVeterinarioConsultaCadastrar;
    document.getElementById('textCodVeterinarioCadastrar').value = codVeterinarioConsultaCadastrar;
    document.getElementById('textNomeClienteCadastrar').value = nomeClienteConsultaCadastrar;

}

function cadastrarConsulta() {

    dataConsultaCadastrar = document.getElementById('textDataConsultaConfirmar').value;
    horaConsultaCadastrar = document.getElementById('textHoraConsultaConfirmar').value;
    codAnimalCadastrar = codAnimalConsultaCadastrar;
    codVeterinarioCadastrar = codVeterinarioConsultaCadastrar;


    if (!codAnimalCadastrar || !codVeterinarioCadastrar || !dataConsultaCadastrar || !horaConsultaCadastrar) {
        alert('Preencha todos os dados para cadastrar!');
        return;
    }
    var novaConsulta = {
        codAnimal: codAnimalCadastrar,
        codVeterinario: codVeterinarioCadastrar,
        dataConsulta: dataConsultaCadastrar + 'T' + horaConsultaCadastrar + ':00.000',
        peso: pesoCadastrar,
        descricao: descricaoCadastrar
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Consulta cadastrada com sucesso!`);
            modalConfirmarCadastrar.hide();

        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar a consulta.');
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novaConsulta));

}

function abrirAlterarConsulta(codConsulta) {
    modalAlterar.show();
    document.getElementById('textCodConsultaAlterar').value = codConsulta
    document.getElementById('textNomeVeterinarioAlterar').value = document.getElementById(`nomeVeterinario${codConsulta}`).innerHTML;
    document.getElementById('textNomeClienteAlterar').value = document.getElementById(`nomeCliente${codConsulta}`).innerHTML;
    document.getElementById('textNomeAnimalAlterar').value = document.getElementById(`nomeAnimal${codConsulta}`).innerHTML;
    document.getElementById('textHoraConsultaAlterar').value = document.getElementById(`horaConsulta${codConsulta}`).innerHTML;
    document.getElementById('textDataConsultaAlterar').value = document.getElementById(`dataConsulta${codConsulta}`).innerHTML;
    document.getElementById('textCodAnimalAlterar').value = document.getElementById(`codAnimal${codConsulta}`).innerHTML;
    document.getElementById('textCodVeterinarioAlterar').value = document.getElementById(`codVeterinario${codConsulta}`).innerHTML;

}


function alterarConsulta() {
    var dataConsulta = textDataConsultaAlterar.value;
    var horaConsulta = textHoraConsultaAlterar.value;
    var codConsulta = textCodConsultaAlterar.value;
    var codAnimal = textCodAnimalAlterar.value;
    var codVeterinario = textCodVeterinarioAlterar.value;

    if (!dataConsulta || !horaConsulta) {
        alert('Preencha todos os dados para alterar!');
        return;
    }
    var consulta = {
        dataConsulta: dataConsulta + 'T' + horaConsulta + ':00.000Z',
        codConsulta: codConsulta,
        codAnimal: codAnimal,
        codVeterinario: codVeterinario,
        peso: pesoCadastrar,
        descricao: descricaoCadastrar
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Consulta alterada com sucesso!`);
            exibirAgenda();
            modalAlterar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível alterar a consulta.');
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
    textNomeVeterinario.value = '';
}
