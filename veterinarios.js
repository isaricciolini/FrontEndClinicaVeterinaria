var url = 'https://localhost:5001/veterinarios';
var corpoTabela = document.getElementById('corpoTabela');
var btn = document.getElementById('btn_form');
var form = document.getElementById('my_form');
var btn2 = document.getElementById('btn_form2');
var form2 = document.getElementById('my_form2');
var btn3 = document.getElementById('btn_form3');
var form3 = document.getElementById('my_form3');
var textNovoNomeVeterinario = document.getElementById('textNovoNomeVeterinario');
var textNovoNascimento = document.getElementById('textNovoNascimento');
var textNovoCPF = document.getElementById('textNovoCPF');
var textNovoTelefone = document.getElementById('textNovoTelefone');
var textNovoEmail = document.getElementById('textNovoEmail');
var textNovoCRMV = document.getElementById('textNovoCRMV');
var textNovoRua = document.getElementById('textNovoRua');
var textNovoNumero = document.getElementById('textNovoNumero');
var textNovoComplemento = document.getElementById('textNovoComplemento');
var textNovoCEP = document.getElementById('textNovoCEP');
var textNovoBairro = document.getElementById('textNovoBairro');
var textNovoCidade = document.getElementById('textNovoCidade');
var codVeterinarioAlterar = 0;
var textNomeVeterinarioAlterar = document.getElementById('textNomeVeterinarioAlterar');
var textNascimentoAlterar = document.getElementById('textNascimentoAlterar');
var textCPFAlterar = document.getElementById('textCPFAlterar');
var textTelefoneAlterar = document.getElementById('textTelefoneAlterar');
var textEmailAlterar = document.getElementById('textEmailAlterar');
var textCRMVAlterar = document.getElementById('textCRMVAlterar');
var textRuaAlterar = document.getElementById('textRuaAlterar');
var textNumeroAlterar = document.getElementById('textNumeroAlterar');
var textComplementoAlterar = document.getElementById('textComplementoAlterar');
var textCEPAlterar = document.getElementById('textCEPAlterar');
var textBairroAlterar = document.getElementById('textBairroAlterar');
var textCidadeAlterar = document.getElementById('textCidadeAlterar');
var textCodVeterinario = document.getElementById('textCodVeterinario');
var textCodVeterinarioExcluir = document.getElementById('textCodVeterinarioExcluir');
var codVeterinario = textCodVeterinarioExcluir.value;

var modalEndereco = new bootstrap.Modal(document.getElementById('modalEndereco'), {});
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});

var modalSucesso = new bootstrap.Modal(document.getElementById('modalSucesso'), {});
var modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'), {});
var modalAlertaDeOperacao = new bootstrap.Modal(document.getElementById('modalAlertaDeOperacao'))
var modalAlertaDeCEP = new bootstrap.Modal(document.getElementById('modalAlertaDeCEP'))

pesquisarVeterinarios();

function pesquisarVeterinarios() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${info.codVeterinario}</td>`;
                linha += `<td id="nome${info.codVeterinario}">${info.nomeVeterinario}</td>`;
                linha += `<td>${(info.nascimento.slice(8, 10)) + "/" + (info.nascimento.slice(5, 7)) + "/" + (info.nascimento.slice(0, 4))}</td>`;
                linha += `<td>${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>`;
                linha += `<td>${info.telefone}</td>`;
                linha += `<td id="email${info.codVeterinario}">${info.email}</td>`;
                linha += `<td id="crmv${info.codVeterinario}">${info.crmv}</td>`;
                linha += `<td><button onclick="abrirEndereco(${info.codVeterinario})" class="btn btn-dark">Exibir</button></td>`
                linha += `<td><button onclick="abrirAlterar(${info.codVeterinario})" class="btn btn-dark">Alterar</button></td>`
                linha += `<td><button onclick="abrirExcluir(${info.codVeterinario})" class="btn btn-dark">Excluir</button></td>`
                linha += '</tr>';
                linha += '<div style="display: none;">'
                linha += `<p id="telefone${info.codVeterinario}">${info.telefone}</p>`;
                linha += `<p id="nascimento${info.codVeterinario}">${(info.nascimento.slice(8, 10)) + "/" + (info.nascimento.slice(5, 7)) + "/" + (info.nascimento.slice(0, 4))}</p>`;
                linha += `<p id="cpf${info.codVeterinario}">${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>`;
                linha += `<p id="cep${info.codVeterinario}">${info.cep}</p>`
                linha += `<p id="rua${info.codVeterinario}">${info.rua}</p>`
                linha += `<p id="numero${info.codVeterinario}">${info.numero}</p>`;
                linha += `<p id="complemento${info.codVeterinario}">${info.complemento}</p>`;
                linha += `<p id="bairro${info.codVeterinario}">${info.bairro}</p>`;
                linha += `<p id="cidade${info.codVeterinario}">${info.cidade}</p>`;
                linha += '</div>'
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar veterinários.';
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

function abrirEndereco(codVeterinario) {
    document.getElementById('textCEP').value =  document.getElementById(`cep${codVeterinario}`).innerHTML.replace(/(\d{5})(\d{3})/, "$1-$2");
    document.getElementById('textRua').value =  document.getElementById(`rua${codVeterinario}`).innerHTML;
    document.getElementById('textNumero').value =  document.getElementById(`numero${codVeterinario}`).innerHTML;
    document.getElementById('textComplemento').value =  document.getElementById(`complemento${codVeterinario}`).innerHTML;
    document.getElementById('textBairro').value =  document.getElementById(`bairro${codVeterinario}`).innerHTML;
    document.getElementById('textCidade').value =  document.getElementById(`cidade${codVeterinario}`).innerHTML;
    modalEndereco.show();
}

function abrirCadastrar() {
    modalCadastrar.show();
}

function cadastrarVeterinario() {
    var nascimento = textNovoNascimento.value;
    var cpf = textNovoCPF.value;
    var telefone = textNovoTelefone.value;
    var nomeVeterinario = textNovoNomeVeterinario.value;
    var email = textNovoEmail.value;
    var cep = textNovoCEP.value;
    var rua = textNovoRua.value;
    var numero = textNovoNumero.value;
    var complemento = textNovoComplemento.value;
    var bairro = textNovoBairro.value;
    var cidade = textNovoCidade.value;
    var crmv = textNovoCRMV.value;
    if (!nascimento || !cpf || !telefone || !email || !nomeVeterinario || !cep || !rua || !numero || !bairro || !cidade || !crmv) {
        modalAlerta.show();
        return;
    }
    var novoVeterinario = {
        nomeVeterinario: nomeVeterinario,
        nascimento: nascimento,
        cpf: cpf,
        crmv: crmv,
        email: email,
        telefone: telefone,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        cep: cep
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            modalCadastrar.hide();
            modalSucesso.show();
            pesquisarVeterinarios();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novoVeterinario));
}

function limpa_formulário_cep() {
    document.getElementById('textNovoRua').value = ("");
    document.getElementById('textNovoBairro').value = ("");
    document.getElementById('textNovoCidade').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('textNovoRua').value = (conteudo.logradouro);
        document.getElementById('textNovoBairro').value = (conteudo.bairro);
        document.getElementById('textNovoCidade').value = (conteudo.localidade);
    }
    else {
        limpa_formulário_cep();
        ModalAlertaDeCEP.show();
    }
}

function pesquisacep(textNovoCEP) {
    var cep = textNovoCEP.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            document.getElementById('textNovoRua').value = "...";
            document.getElementById('textNovoBairro').value = "...";
            document.getElementById('textNovoCidade').value = "...";
            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        }
    }
    else {
        limpa_formulário_cep();
    }
};

function abrirAlterar(codVeterinario) {

    document.getElementById('textCodVeterinario').value = codVeterinario
    document.getElementById('textNomeVeterinarioAlterar').value = document.getElementById(`nome${codVeterinario}`).innerHTML;
    document.getElementById('textNascimentoAlterar').value = document.getElementById(`nascimento${codVeterinario}`).innerHTML.slice(0,10);
    document.getElementById('textTelefoneAlterar').value = document.getElementById(`telefone${codVeterinario}`).innerHTML;
    document.getElementById('textEmailAlterar').value = document.getElementById(`email${codVeterinario}`).innerHTML;
    document.getElementById('textCPFAlterar').value = document.getElementById(`cpf${codVeterinario}`).innerHTML;
    document.getElementById('textCRMVAlterar').value = document.getElementById(`crmv${codVeterinario}`).innerHTML;
    document.getElementById('textCEPAlterar').value =  document.getElementById(`cep${codVeterinario}`).innerHTML;
    document.getElementById('textRuaAlterar').value =  document.getElementById(`rua${codVeterinario}`).innerHTML;
    document.getElementById('textNumeroAlterar').value =  document.getElementById(`numero${codVeterinario}`).innerHTML;
    document.getElementById('textComplementoAlterar').value =  document.getElementById(`complemento${codVeterinario}`).innerHTML;
    document.getElementById('textBairroAlterar').value =  document.getElementById(`bairro${codVeterinario}`).innerHTML;
    document.getElementById('textCidadeAlterar').value =  document.getElementById(`cidade${codVeterinario}`).innerHTML;
    modalAlterar.show();
}

function alterarVeterinario() {
    var nomeVeterinario = textNomeVeterinarioAlterar.value;
    var nascimento = textNascimentoAlterar.value.slice(6,10) + "/";
    nascimento += textNascimentoAlterar.value.slice(3,6);
    nascimento += textNascimentoAlterar.value.slice(0,2);
    var cpf = textCPFAlterar.value.slice(0,3);
    cpf += textCPFAlterar.value.slice(4,7);
    cpf += textCPFAlterar.value.slice(8,11);
    cpf += textCPFAlterar.value.slice(12,14);
    var telefone = textTelefoneAlterar.value;
    var crmv = textCRMVAlterar.value;
    var email = textEmailAlterar.value;
    var cep = textCEPAlterar.value;
    var rua = textRuaAlterar.value;
    var numero = textNumeroAlterar.value;
    var complemento = textComplementoAlterar.value;
    var bairro = textBairroAlterar.value;
    var cidade = textCidadeAlterar.value;
    var codVeterinario = textCodVeterinario.value;
    if (!codVeterinario || !email || !telefone || !cpf || !nomeVeterinario || !nascimento || !crmv || !cep || !rua || !numero || !bairro || !cidade) {
        modalAlerta.show();
        return;
    }
    var alterarVeterinario = {
        nomeVeterinario: nomeVeterinario,
        nascimento: nascimento,
        cpf: cpf,
        crmv: crmv,
        email: email,
        telefone: telefone,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        cep: cep,
        codVeterinario: codVeterinario
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            pesquisarVeterinarios();
            modalAlterar.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(alterarVeterinario));
}

function limpaFormularioCEP() {
    document.getElementById('textRuaAlterar').value = ("");
    document.getElementById('textBairroAlterar').value = ("");
    document.getElementById('textCidadeAlterar').value = ("");
}

function meu_callback2(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('textRuaAlterar').value = (conteudo.logradouro);
        document.getElementById('textBairroAlterar').value = (conteudo.bairro);
        document.getElementById('textCidadeAlterar').value = (conteudo.localidade);
    }
    else {
        limpaFormularioCEP();
        modalAlertaDeCEP.show();
    }
}

function pesquisaCEPAlterar(textCEPAlterar) {
    var cep = textCEPAlterar.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            document.getElementById('textRuaAlterar').value = "...";
            document.getElementById('textBairroAlterar').value = "...";
            document.getElementById('textCidadeAlterar').value = "...";
            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback2';
            document.body.appendChild(script);
        }
    }
    else {
        limpaFormularioCEP();
    }
};

function abrirExcluir(codVeterinario) {
    document.getElementById("textCodVeterinarioExcluir").value = codVeterinario;
    modalExcluir.show();
}


function excluirVeterinario(codVeterinario) {
    var codVeterinario = textCodVeterinarioExcluir.value;
    modalExcluir.show();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            pesquisarVeterinarios();
            modalExcluir();
            modalSucesso.show();
        }
    };
    xhttp.open('DELETE', `${url}?CodVeterinario=${codVeterinario}`, true);
    xhttp.send();
}
