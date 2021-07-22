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
var btn = document.getElementById('btn_form');
var form = document.getElementById('my_form');
var btn2 = document.getElementById('btn_form2');
var form2 = document.getElementById('my_form2');
var btn3 = document.getElementById('btn_form3');
var form3 = document.getElementById('my_form3');
var codConsultaCadastrarReceita = 0;
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var textCodAnimalAlterar = document.getElementById('textCodAnimalAlterar');
var textCodVeterinarioAlterar = document.getElementById('textCodVeterinarioAlterar');
var textDataConsultaAlterar = document.getElementById('textDataConsultaAlterar');
var textHoraConsultaAlterar = document.getElementById('textHoraConsultaAlterar');
var textPesoAlterar = document.getElementById('textPesoAlterar');
var textDescricaoAlterar = document.getElementById('textDescricaoAlterar');
var dataReceita = document.getElementById('textDataReceita');
var prescricao = document.getElementById('textPrescricao');
var codConsultaModal = document.getElementById('textCodConsultaModal')
var textCodConsultaExcluir = document.getElementById('textCodConsultaExcluir');

btn.addEventListener('click', function () {
    if (form.style.display != 'block') {
        form.style.display = 'block';
        return;
    }
    form.style.display = 'none';
});

btn2.addEventListener('click', function () {
    if (form2.style.display != 'block') {
        form2.style.display = 'block';
        return;
    }
    form2.style.display = 'none';
});

btn3.addEventListener('click', function () {
    if (form3.style.display != 'block') {
        form3.style.display = 'block';
        return;
    }
    form3.style.display = 'none';
});

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
                linha += `<td id="dataConsulta${info.codConsulta}">${info.dataConsulta.slice(11, 16)}</td>`;
                linha += `<td id="codAnimal${info.codConsulta}">${info.codAnimal}</td>`;
                linha += `<td id="codVeterinario${info.codConsulta}">${info.codVeterinario}</td>`;
                linha += `<td id="peso${info.codConsulta}">${info.peso}</td>`;
                linha += `<td id="descricao${info.codConsulta}">${info.descricao}</td>`;
                linha += `<td><a href="#" class="btn btn-dark" onclick="abrirCadastrarReceita(${info.codConsulta})">+ Receita</a></td>`;
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

function cadastrarConsulta() {
    var codAnimal = textCodAnimal.value;
    var codVeterinario = textCodVeterinario.value;
    var dataConsulta = textDataConsulta.value;
    var horaConsulta = textHoraConsulta.value;
    var peso = textPeso.value;
    var descricao = textDescricao.value;
    if (!codAnimal || !codVeterinario || !dataConsulta || !horaConsulta || !peso || !descricao) {
        alert('Preencha todos os dados para cadastrar!');
        return;
    }
    var novaConsulta = {
        codAnimal: codAnimal,
        codVeterinario: codVeterinario,
        dataConsulta: dataConsulta + 'T' + horaConsulta + ':00.000',
        peso: peso,
        descricao: descricao
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Consulta cadastrada com sucesso!`);
            limparCadastro();
            pesquisarConsultas();
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar a consulta.');
        }
    };
    console.log(novaConsulta);
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novaConsulta));
}

function excluirConsulta(codConsulta) {
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
    textPeso.value = '';
    textDescricao.value = '';
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
    console.log(receitaCadastrada);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Receita cadastrada com sucesso!');
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar a receita.');
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(receitaCadastrada));
}

function abrirCadastrarReceita(codConsulta) {
    document.getElementById(`textCodConsultaModal`).value = codConsulta;
    modalCadastrar.show();
}