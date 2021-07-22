var url = 'https://localhost:5001/receitas';
var corpoTabela = document.getElementById('corpoTabela');
var codConsulta = document.getElementById('textCodConsulta');
var dataReceita = document.getElementById('textDataReceita');
var prescricao = document.getElementById('textPrescricao');
var codReceitaAlterar = 0;
var dataReceita = document.getElementById('textDataReceita');
var prescricao = document.getElementById('textPrescricao');
var codReceitaModal = document.getElementById('textCodReceitaModal');
var codConsultaModal = document.getElementById('textCodConsultaModal');
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var dataReceitaAlterar = document.getElementById('textDataReceitaAlterar');
var prescricaoAlterar = document.getElementById('textPrescricaoAlterar');


pesquisarReceitas();

function pesquisarReceitas() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td id="codReceita${info.codReceita}">${info.codReceita}</td>`;
                linha += `<td id="codConsulta${info.codReceita}">${info.codConsulta}</td>`;
                linha += `<td id="dataReceita${info.codReceita}">${info.dataReceita.slice(0, 10)}</td>`;
                linha += `<td id="prescricao${info.codReceita}">${info.prescricao}</td>`;
                linha += `<td><a href="#" class="btn btn-dark" onclick="abrirAlterarReceita(${info.codReceita}, ${info.codConsulta})">Alterar</a></td>`;
                linha += `<td><a href="#" class="btn btn-dark" onclick="excluirReceita(${info.codReceita})">Excluir</a></td>`;
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar receitas.';
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

function cadastrarReceita() {
    var codConsulta = textCodConsulta.value;
    var dataReceita = textDataReceita.value;
    var prescricao = textPrescricao.value;
    if (!codConsulta || !dataReceita || !prescricao) {
        alert('Preencha todos os dados para cadastrar!');
        return;
    }
    var novaReceita = {
        codConsulta: codConsulta,
        prescricao: prescricao,
        dataReceita: dataReceita + 'T00:00:00.000'
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Receita cadastrada com sucesso!`);
            limparCadastro();
            pesquisarReceitas();
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar a receita.');
        }
    };
    console.log(novaReceita);
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novaReceita));
}

function excluirReceita(codReceita) {
    if (!confirm('Tem certeza que deseja excluir esta receita?'))
        return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert('Receita excluída com sucesso!');
            pesquisarReceitas();
        }
    };
    xhttp.open('DELETE', `${url}/${codReceita}`, true);
    xhttp.send();
}

function abrirAlterarReceita(codReceita, codConsulta) {
    document.getElementById(`textCodReceitaModal`).value = codReceita;
    document.getElementById('textCodConsultaModal').value = codConsulta;
    modalAlterar.show();
}

function alterarReceita() {
    var codReceita = codReceitaModal.value;
    var codConsulta = codConsultaModal.value;
    var dataReceita = dataReceitaAlterar.value;
    var prescricao = prescricaoAlterar.value;
    if (!dataReceita || !prescricao) {
        alert('Preencha todos os dados para alterar!');
        return;
    }
    var receitaAlterada = {
        dataReceita: dataReceita + 'T00:00:00.000',
        prescricao: prescricao,
        codReceita: codReceita,
        codConsulta: codConsulta
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Receita nº ${receitaAlterada.codReceita} alterada com sucesso!`);
            limparAlteracao();
            pesquisarReceitas();
            modalAlterar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível alterar a receita.');
        }
    };
    console.log(receitaAlterada);
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(receitaAlterada)); 
}

function limparExclusao() {
    textCodReceita.value = '';
}

function limparAlteracao() {
    textDataReceitaAlterar.value = '';
    textPrescricaoAlterar.value = '';
}