var url = 'https://localhost:5001/consultas';
var corpoTabela = document.getElementById('corpoTabela');
var textNomeAnimal = document.getElementById('textNomeAnimal');
var textNomeVeterinario = document.getElementById('textNomeVeterinario');
var textDataConsulta = document.getElementById('textDataConsulta');
var textNomeCliente = document.getElementById('textNomeCliente');
var codConsultaAlterar = 0;
var textNomeAnimalAlterar = document.getElementById('textNomeAnimalAlterar');
var textNomeVeterinarioAlterar = document.getElementById('textNomeVeterinarioAlterar');
var textDataConsultaAlterar = document.getElementById('textDataConsultaAlterar');
var textNomeClienteAlterar = document.getElementById('textNomeClienteAlterar');

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
                linha += `<td><a href="#" onclick="abrirAlterarConsulta(${info.codConsulta})">Alterar</a></td>`;
                linha += `<td><a href="#" onclick="excluirConsulta(${info.codConsulta})">Excluir</a></td>`;
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

