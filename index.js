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
var textHoraConsultaAlterar = document.getElementById('textHoraConsultaAlterar');
var textNomeClienteAlterar = document.getElementById('textNomeClienteAlterar');

var textCodAnimal = document.getElementById('textCodAnimal');
var textCodCliente = document.getElementById('textCodCliente');
var textCodVeterinario = document.getElementById('textCodVeterinario');
var textPeso = document.getElementById('textPeso');
var textDescricao = document.getElementById('textDescricao');
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});


var textPesoAlterar = document.getElementById('textPesoAlterar');
var textDescricaoAlterar = document.getElementById('textDescricaoAlterar');
var textCodAnimalAlterar = document.getElementById('textCodAnimalAlterar');
var textCodVeterinarioAlterar = document.getElementById('textCodVeterinarioAlterar');

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
                linha += `<td><a btn btn-dark _filtrar onclick="abrirAlterarConsulta(${info.codConsulta})">Alterar</a></td>`;
                linha += `<td><a btn btn-dark _filtrar onclick="excluirConsulta(${info.codConsulta})">Excluir</a></td>`;
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
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

function abrirAlterarConsulta(codConsulta) {
    document.getElementById('textCodConsultaAlterar').value = codConsulta
    document.getElementById('textNomeVeterinarioAlterar').value = document.getElementById(`nomeVeterinario${codConsulta}`).innerHTML;
    document.getElementById('textNomeClienteAlterar').value = document.getElementById(`nomeCliente${codConsulta}`).innerHTML;
    document.getElementById('textNomeAnimalAlterar').value = document.getElementById(`nomeAnimal${codConsulta}`).innerHTML;



    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            var data = resposta.dataConsulta.slice(0, 10)
            var hora = resposta.dataConsulta.slice(11, 16)
            document.getElementById('textDataConsultaAlterar').value = data;
            document.getElementById('textHoraConsultaAlterar').value = hora;
            document.getElementById('textCodAnimalAlterar').value = resposta.codAnimal;
            document.getElementById('textCodVeterinarioAlterar').value = resposta.codVeterinario;
            document.getElementById('textPesoAlterar').value = resposta.peso;
            document.getElementById('textDescricaoAlterar').value = resposta.descricao;
        }
        xhttp.open('GET', `${url}/${codConsulta}`, true);
        xhttp.send();
        modalAlterar.show();
    }
}
function abrirCadastrar() {
    modalCadastrar.show();
}


function alterarConsulta() {
    var dataConsulta = textDataConsultaAlterar.value;
    var horaConsulta = textHoraConsultaAlterar.value;
    var nomeVeterinario = textNomeVeterinarioAlterar.value;
    var nomeCliente = textNomeClienteAlterar.value;
    var nomeAnimal = textNomeAnimalAlterar.value;
    var codConsulta = textCodConsultaAlterar.value;
    if (!dataConsulta || !nomeVeterinario || !horaConsulta) {
        alert('Preencha todos os dados para alterar!');
        return;
    }
    var consulta = {
        dataConsulta: dataConsulta + 'T' + horaConsulta + ':00.000Z',
        nomeVeterinario: nomeVeterinario,
        nomeCliente: nomeCliente,
        nomeAnimal: nomeAnimal,
        codConsulta: codConsulta
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Consulta de ${consulta.nomeAnimal} alterado(a) com sucesso!`);
            limpar();
            exibirAgenda();
            modalAlterar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível alterar a consulta.');
        }
    };
    console.log(consulta);
    xhttp.open('PUT', `${url}/agenda`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(consulta));
}

function limpar() {
    textDataConsulta.value = '';
    textNomeAnimal.value = '';
    textNomeCliente.value = '';
    textNomeVeterinario.value = '';
}
