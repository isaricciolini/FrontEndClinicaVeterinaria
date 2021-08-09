var url = 'https://localhost:5001/funcionarios';
var corpoTabela = document.getElementById('corpoTabela');
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});
var modalEndereco = new bootstrap.Modal(document.getElementById('modalEndereco'), {});
var modalSucesso = new bootstrap.Modal(document.getElementById('modalSucesso'), {});
var modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'), {});
var modalAlertaDeOperacao = new bootstrap.Modal(document.getElementById('modalAlertaDeOperacao'))
var modalAlertaDeCEP = new bootstrap.Modal(document.getElementById('modalAlertaDeCEP'))

var textNovoNomeFuncionario = document.getElementById('textNovoNomeFuncionario');
var textNovoCodVeterinario = document.getElementById('textNovoCodVeterinario');
var textNovoNascimento = document.getElementById('textNovoNascimento');
var textNovoCPF = document.getElementById('textNovoCPF');
var textNovoTelefone = document.getElementById('textNovoTelefone');
var textNovoEmail = document.getElementById('textNovoEmail');
var textNovoRua = document.getElementById('textNovoRua');
var textNovoNumero = document.getElementById('textNovoNumero');
var textNovoComplemento = document.getElementById('textNovoComplemento');
var textNovoCEP = document.getElementById('textNovoCEP');
var textNovoBairro = document.getElementById('textNovoBairro');
var textNovoCidade = document.getElementById('textNovoCidade');
var codFuncionarioAlterar = 0;
var textNomeFuncionarioAlterar = document.getElementById('textNomeClienteAlterar');
var textNascimentoAlterar = document.getElementById('textNascimentoAlterar');
var textCPFAlterar = document.getElementById('textCPFAlterar');
var textTelefoneAlterar = document.getElementById('textTelefoneAlterar');
var textEmailAlterar = document.getElementById('textEmailAlterar');
var textRuaAlterar = document.getElementById('textRuaAlterar');
var textNumeroAlterar = document.getElementById('textNumeroAlterar');
var textComplementoAlterar = document.getElementById('textComplementoAlterar');
var textCEPAlterar = document.getElementById('textCEPAlterar');
var textBairroAlterar = document.getElementById('textBairroAlterar');
var textCidadeAlterar = document.getElementById('textCidadeAlterar');
var textCodFuncionario = document.getElementById('textCodFuncionario');
var textAtivoAlterar = document.getElementById('textAtivoAlterar');
var textCodVeterinarioAlterar = document.getElementById('textCodVeterinarioAlterar');
var textCodFuncionarioExcluir = document.getElementById('textCodFuncionarioExcluir');




pesquisarFuncionarios();

function pesquisarFuncionarios() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${info.codFuncionario}</td>`;
                linha += `<td>${info.codVeterinario}</td>`;
                linha += `<td id="nome${info.codFuncionario}">${info.nomeFuncionario}</td>`;
                linha += `<td>${(info.nascimento.slice(8, 10)) + "/" + (info.nascimento.slice(5, 7)) + "/" + (info.nascimento.slice(0, 4))}</td>`;
                linha += `<td>${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>`;
                linha += `<td>${info.telefone}</td>`;
                linha += `<td id="email${info.codFuncionario}">${info.email}</td>`;
                linha += `<td id="ativo${info.codFuncionario}">${info.ativo}</td>`;
                linha += `<td><button onclick="abrirEndereco(${info.codFuncionario})" class="btn btn-dark">Exibir</button></td>`
                linha += `<td><button onclick="abrirAlterar(${info.codFuncionario})" class="btn btn-dark">Alterar</button></td>`
                linha += '</tr>';
                linha += '<div style="display: none;">'
                linha += `<p id="telefone${info.codFuncionario}">${info.telefone}</p>`;
                linha += `<p id="nascimento${info.codFuncionario}">${(info.nascimento.slice(8, 10)) + "/" + (info.nascimento.slice(5, 7)) + "/" + (info.nascimento.slice(0, 4))}</p>`;
                linha += `<p id="cpf${info.codFuncionario}">${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>`;
                linha += `<p id="cep${info.codFuncionario}">${info.cep}</p>`
                linha += `<p id="rua${info.codFuncionario}">${info.rua}</p>`
                linha += `<p id="numero${info.codFuncionario}">${info.numero}</p>`;
                linha += `<p id="complemento${info.codFuncionario}">${info.complemento}</p>`;
                linha += `<p id="bairro${info.codFuncionario}">${info.bairro}</p>`;
                linha += `<p id="cidade${info.codFuncionario}">${info.cidade}</p>`;
                linha += '</div>'
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar colaboradores.';
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

function abrirEndereco(codFuncionario) {
    document.getElementById('textCEP').value = document.getElementById(`cep${codFuncionario}`).innerHTML.replace(/(\d{5})(\d{3})/, "$1-$2");
    document.getElementById('textRua').value = document.getElementById(`rua${codFuncionario}`).innerHTML;
    document.getElementById('textNumero').value = document.getElementById(`numero${codFuncionario}`).innerHTML;
    document.getElementById('textComplemento').value = document.getElementById(`complemento${codFuncionario}`).innerHTML;
    document.getElementById('textBairro').value = document.getElementById(`bairro${codFuncionario}`).innerHTML;
    document.getElementById('textCidade').value = document.getElementById(`cidade${codFuncionario}`).innerHTML;
    modalEndereco.show();
}

function abrirCadastrar() {
    modalCadastrar.show();
}


function cadastrarFuncionario() {
    var nascimento = textNovoNascimento.value;
    var codVeterinario = textNovoCodVeterinario.value;
    var cpf = textNovoCPF.value;
    var telefone = textNovoTelefone.value;
    var nomeFuncionario = textNovoNomeFuncionario.value;
    var email = textNovoEmail.value;
    var cep = textNovoCEP.value;
    var rua = textNovoRua.value;
    var numero = textNovoNumero.value;
    var complemento = textNovoComplemento.value;
    var bairro = textNovoBairro.value;
    var cidade = textNovoCidade.value;
    if (!nascimento || !cpf || !telefone || !email || !nomeFuncionario || !cep || !rua || !numero || !bairro || !cidade) {
        modalAlerta.show();
        return;
    }
    var novoFuncionario = {
        nomeFuncionario: nomeFuncionario,
        codVeterinario: codVeterinario,
        nascimento: nascimento,
        cpf: cpf,
        email: email,
        telefone: telefone,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        cep: cep,
        ativo: 1
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            modalCadastrar.hide();
            pesquisarFuncionarios();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novoFuncionario));
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
        modalAlertaDeCEP.show();
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

function abrirAlterar(codFuncionario) {

    document.getElementById('textCodFuncionario').value = codFuncionario;
    document.getElementById('textNomeFuncionarioAlterar').value = document.getElementById(`nome${codFuncionario}`).innerHTML;
    document.getElementById('textNascimentoAlterar').value = document.getElementById(`nascimento${codFuncionario}`).innerHTML.slice(0, 10);
    document.getElementById('textTelefoneAlterar').value = document.getElementById(`telefone${codFuncionario}`).innerHTML;
    document.getElementById('textEmailAlterar').value = document.getElementById(`email${codFuncionario}`).innerHTML;
    document.getElementById('textCPFAlterar').value = document.getElementById(`cpf${codFuncionario}`).innerHTML;
    document.getElementById('textCEPAlterar').value = document.getElementById(`cep${codFuncionario}`).innerHTML;
    document.getElementById('textRuaAlterar').value = document.getElementById(`rua${codFuncionario}`).innerHTML;
    document.getElementById('textNumeroAlterar').value = document.getElementById(`numero${codFuncionario}`).innerHTML;
    document.getElementById('textComplementoAlterar').value = document.getElementById(`complemento${codFuncionario}`).innerHTML;
    document.getElementById('textBairroAlterar').value = document.getElementById(`bairro${codFuncionario}`).innerHTML;
    document.getElementById('textCidadeAlterar').value = document.getElementById(`cidade${codFuncionario}`).innerHTML;
    modalAlterar.show();
}

function alterarFuncionario() {
    var nomeFuncionario = textNomeFuncionarioAlterar.value;
    var nascimento = textNascimentoAlterar.value;
    var cpf = textCPFAlterar.value.slice(0, 3);
    cpf += textCPFAlterar.value.slice(4, 7);
    cpf += textCPFAlterar.value.slice(8, 11);
    cpf += textCPFAlterar.value.slice(12, 14);
    var telefone = textTelefoneAlterar.value;
    var email = textEmailAlterar.value;
    var cep = textCEPAlterar.value;
    var rua = textRuaAlterar.value;
    var numero = textNumeroAlterar.value;
    var complemento = textComplementoAlterar.value;
    var bairro = textBairroAlterar.value;
    var cidade = textCidadeAlterar.value;
    var codFuncionario = textCodFuncionario.value;
    var ativo = textAtivoAlterar.value;
    if (!codFuncionario || !email || !telefone || !ativo || !cpf || !nomeFuncionario || !nascimento || !cep || !rua || !numero || !bairro || !cidade) {
        modalAlerta.show();
        return;
    }
    var alterarFuncionario = {
        nomeFuncionario: nomeFuncionario,
        nascimento: nascimento,
        cpf: cpf,
        email: email,
        telefone: telefone,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        cep: cep,
        codFuncionario: codFuncionario,
        codVeterinario: codVeterinario,
        ativo: ativo
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            pesquisarFuncionarios();
            modalAlterar.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(alterarFuncionario));
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

function getSimNao() {
    if (ativo == 1) {
        return "SIM";
    } else 
    { return "NÃO"; }
}

// function abrirExcluir(codFuncionario) {
//     document.getElementById("textCodFuncionarioExcluir").value = codFuncionario;
//     modalExcluir.show();
// }

// function excluirFuncionario(codFuncionario) {
//     var codFuncionario = textCodFuncionarioExcluir.value;
//     if (!confirm('Tem certeza que deseja excluir este funcionário?'))
//         return;
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             alert('Funcionário excluído com sucesso!');
//             modalExcluir.hide();
//             pesquisarFuncionarios();
//         }
//     };
//     xhttp.open('DELETE', `${url}/${codFuncionario}`, true);
//     xhttp.send();
// }

