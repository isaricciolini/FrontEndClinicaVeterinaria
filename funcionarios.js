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
var modalCadastrarFuncionario = new bootstrap.Modal(document.getElementById('modalCadastrarFuncionario'));
var modalListaFuncionarios = new bootstrap.Modal(document.getElementById('modalListaFuncionarios'));
var modalListaFuncionarios = new bootstrap.Modal(document.getElementById('modalListaFuncionarios'));

var textCRMVFuncionario = document.getElementById('textCRMVFuncionario');
var textNovoNomeFuncionario = document.getElementById('textNovoNomeFuncionario');
var textNovoCodFuncionario = document.getElementById('textNovoCodFuncionario');
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
var textNomeFuncionarioAlterar = document.getElementById('textNomeFuncionarioAlterar');
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
var textCodFuncionarioAlterar = document.getElementById('textCodFuncionarioAlterar');
var textCodFuncionarioExcluir = document.getElementById('textCodFuncionarioExcluir');
var textAtivo = document.getElementById('textAtivo');
var textFuncionario = document.getElementById('textFuncionario');
var textCRMV = document.getElementById('textCRMV');
var textCodFuncionarioFuncionario = document.getElementById('textCodFuncionarioFuncionario');




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
                linha += `<td id="codFuncionario${info.codFuncionario}">${info.codFuncionario}</td>`;
                linha += `<td id="crmv${info.codFuncionario}">${info.crmv == null ? "" : info.crmv}</td>`;
                linha += `<td id="nome${info.codFuncionario}">${info.nomeFuncionario}</td>`;
                linha += `<td>${(info.nascimento.slice(8, 10)) + "/" + (info.nascimento.slice(5, 7)) + "/" + (info.nascimento.slice(0, 4))}</td>`;
                linha += `<td>${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>`;
                linha += `<td>${"(" + (info.telefone.toString().slice(0, 2)) + ") " + (info.telefone.toString().slice(2, 7)) + "-" + (info.telefone.toString().slice(7, 11))}</td>`;
                linha += `<td id="email${info.codFuncionario}">${info.email}</td>`;
                linha += `<td id="ativo${info.codFuncionario}">${info.ativo == true ? "Sim" : "Não"}</td>`;
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


function abrirListaFuncionarios(codFuncionario) {
    modalListaFuncionarios.hide();
    modalListaFuncionarios.show();
    corpoTabelaFuncionarios.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td id="codFuncionario${info.codFuncionario}">${info.codFuncionario}</td>`;
                linha += `<td id="nome${info.codFuncionario}">${info.nomeFuncionario}</td>`;
                linha += `<td>${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>`;
                linha += `<td><button onclick="atualizarFuncionario(${info.codFuncionario})" class="btn btn-dark">+</button></td>`;
                corpoTabelaFuncionarios.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            corpoTabelaFuncionarios.innerHTML = 'Erro ao pesquisar colaboradores.';
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}


function atualizarFuncionario(codFuncionario) {
    nascimento = document.getElementById(`nascimento${codFuncionario}`).innerHTML.split('/');
    cpf = document.getElementById(`cpf${codFuncionario}`).innerHTML;
    var alterarFuncionario = {
        nomeFuncionario: document.getElementById(`nome${codFuncionario}`).innerHTML,
        nascimento: new Date(nascimento[2], nascimento[1] - 1, nascimento[0]).toISOString().substring(0, 10),
        cpf: (cpf.slice(0, 3)) + (cpf.slice(4,7)) + (cpf.slice(8,11)) + (cpf.slice(12,14)),
        email: document.getElementById(`email${codFuncionario}`).innerHTML,
        telefone: document.getElementById(`telefone${codFuncionario}`).innerHTML,
        rua: document.getElementById(`rua${codFuncionario}`).innerHTML,
        numero: document.getElementById(`numero${codFuncionario}`).innerHTML,
        complemento: document.getElementById(`complemento${codFuncionario}`).innerHTML,
        bairro: document.getElementById(`bairro${codFuncionario}`).innerHTML,
        cidade: document.getElementById(`cidade${codFuncionario}`).innerHTML,
        cep: document.getElementById(`cep${codFuncionario}`).innerHTML,
        codFuncionario: codFuncionario,
        ativo: document.getElementById(`ativo${codFuncionario}`).innerHTML == "Sim" ? true : false
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            pesquisarFuncionarios();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            console.log(alterarFuncionario);
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(alterarFuncionario));
};




function pesquisarFuncionariosVeterinarios() {
    corpoTabelaFuncionarios.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            console.log(resposta);
            for (var i = 0; i < resposta.length; i++) {
                var funcionario = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${funcionario.codFuncionario}</td>`;
                linha += `<td>${funcionario.crmv}</td>`;
                linha += `<td><button onclick="abrirListaFuncionarios(${funcionario.codFuncionario})" class="btn btn-dark">+</button></td>`;
                linha += `</tr>`;
                corpoTabelaFuncionarios.innerHTML += linha;
            }
        }
    }
    xhttp.open('GET', 'https://localhost:5001/funcionarios', true);
    xhttp.send();
}


function cadastrarFuncionario() {
    var nascimento = document.getElementById('textNovoNascimento').value;
    var cpf = document.getElementById('textNovoCPF').value;
    var telefone = document.getElementById('textNovoTelefone').value;
    var nomeFuncionario = document.getElementById('textNovoNomeFuncionario').value;
    var email = document.getElementById('textNovoEmail').value;
    var cep = document.getElementById('textNovoCEP').value;
    var rua = document.getElementById('textNovoRua').value;
    var numero = document.getElementById('textNovoNumero').value;
    var complemento = document.getElementById('textNovoComplemento').value;
    var bairro = document.getElementById('textNovoBairro').value;
    var cidade = document.getElementById('textNovoCidade').value;
    var crmv = document.getElementById('textCRMVFuncionario').value;
    
    if (!nascimento || !cpf || !telefone || !email || !nomeFuncionario || !cep || !rua || !numero || !bairro || !cidade) {
        modalAlerta.show();
        return;
    }
    if (document.getElementById('textAtivo').checked == true) {
        var ativo = true;
    } else {
        var ativo = false;
    }
    var novoFuncionario = {
        nomeFuncionario: nomeFuncionario,
        nascimento: `${nascimento}T00:00:00.000Z`,
        cpf: cpf,
        email: email,
        telefone: telefone,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        cep: cep,
        ativo: ativo,
        crmv: crmv
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
    nascimentoAlterar = document.getElementById(`nascimento${codFuncionario}`).innerHTML.split('/');
    document.getElementById('textCodFuncionario').value = codFuncionario;
    document.getElementById('textCodFuncionarioAlterar').value = document.getElementById(`codFuncionario${codFuncionario}`).innerHTML;
    document.getElementById('textNomeFuncionarioAlterar').value = document.getElementById(`nome${codFuncionario}`).innerHTML;
    document.getElementById('textNascimentoAlterar').value = new Date(nascimentoAlterar[2], nascimentoAlterar[1] - 1, nascimentoAlterar[0]).toISOString().substring(0, 10);
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
    var codFuncionario = textCodFuncionarioAlterar.value;
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
    if (!email || !telefone || !cpf || !nomeFuncionario || !nascimento || !cep || !rua || !numero || !bairro || !cidade) {
        modalAlerta.show();
        return;
    }
    if (textAtivoAlterar.checked == true) {
        var ativo = true;
    } else {
        var ativo = false;
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
        codFuncionario: codFuncionario,
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
    } else { return "NÃO"; }
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

