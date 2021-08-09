var url = 'https://localhost:5001/clientes';
var corpoTabela = document.getElementById('corpoTabela');
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});
var modalEndereco = new bootstrap.Modal(document.getElementById('modalEndereco'), {});
var modalSucesso = new bootstrap.Modal(document.getElementById('modalSucesso'), {});
var modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'), {});
var modalAlertaDeOperacao = new bootstrap.Modal(document.getElementById('modalAlertaDeOperacao'))
var modalAlertaDeCEP = new bootstrap.Modal(document.getElementById('modalAlertaDeCEP'))

var textNovoNomeCliente = document.getElementById('textNovoNomeCliente');
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
var codClienteAlterar = 0;
var textNomeClienteAlterar = document.getElementById('textNomeClienteAlterar');
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
var textCodCliente = document.getElementById('textCodCliente');
var textCodClienteExcluir = document.getElementById('textCodClienteExcluir');




pesquisarClientes();

function pesquisarClientes() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var info = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${info.codCliente}</td>`;
                linha += `<td id="nome${info.codCliente}">${info.nomeCliente}</td>`;
                linha += `<td>${(info.nascimento.slice(8, 10)) + "/" + (info.nascimento.slice(5, 7)) + "/" + (info.nascimento.slice(0, 4))}</td>`;
                linha += `<td>${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>`;
                linha += `<td>${info.telefone}</td>`;
                linha += `<td id="email${info.codCliente}">${info.email}</td>`;
                linha += `<td><button onclick="abrirEndereco(${info.codCliente})" class="btn btn-dark">Exibir</button></td>`
                linha += `<td><button onclick="abrirAlterar(${info.codCliente})" class="btn btn-dark">Alterar</button></td>`
                linha += `<td><button onclick="abrirExcluir(${info.codCliente})" class="btn btn-dark">Excluir</button></td>`
                linha += '</tr>';
                linha += '<div style="display: none;">'
                linha += `<p id="telefone${info.codCliente}">${info.telefone}</p>`;
                linha += `<p id="nascimento${info.codCliente}">${info.nascimento}</p>`;
                linha += `<p id="cpf${info.codCliente}">${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>`;
                linha += `<p id="cep${info.codCliente}">${info.cep}</p>`
                linha += `<p id="rua${info.codCliente}">${info.rua}</p>`
                linha += `<p id="numero${info.codCliente}">${info.numero}</p>`;
                linha += `<p id="complemento${info.codCliente}">${info.complemento}</p>`;
                linha += `<p id="bairro${info.codCliente}">${info.bairro}</p>`;
                linha += `<p id="cidade${info.codCliente}">${info.cidade}</p>`;
                linha += '</div>'
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar clientes.';
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

function abrirEndereco(codCliente) {
    document.getElementById('textCEP').value =  document.getElementById(`cep${codCliente}`).innerHTML.replace(/(\d{5})(\d{3})/, "$1-$2");
    document.getElementById('textRua').value =  document.getElementById(`rua${codCliente}`).innerHTML;
    document.getElementById('textNumero').value =  document.getElementById(`numero${codCliente}`).innerHTML;
    document.getElementById('textComplemento').value =  document.getElementById(`complemento${codCliente}`).innerHTML;
    document.getElementById('textBairro').value =  document.getElementById(`bairro${codCliente}`).innerHTML;
    document.getElementById('textCidade').value =  document.getElementById(`cidade${codCliente}`).innerHTML;
    modalEndereco.show();
}

function abrirCadastrar() {
    modalCadastrar.show();
}


function cadastrarCliente() {
    var nascimento = textNovoNascimento.value;
    var cpf = textNovoCPF.value;
    var telefone = textNovoTelefone.value;
    var nomeCliente = textNovoNomeCliente.value;
    var email = textNovoEmail.value;
    var cep = textNovoCEP.value;
    var rua = textNovoRua.value;
    var numero = textNovoNumero.value;
    var complemento = textNovoComplemento.value;
    var bairro = textNovoBairro.value;
    var cidade = textNovoCidade.value;
    if (!nascimento || !cpf || !telefone || !email || !nomeCliente || !cep || !rua || !numero || !bairro || !cidade) {
        modalAlerta.show();
        return;
    }
    var novoCliente = {
        nomeCliente: nomeCliente,
        nascimento: nascimento,
        cpf: cpf,
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
            pesquisarClientes();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novoCliente));
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

function abrirAlterar(codCliente) {
    document.getElementById('textCodCliente').value = codCliente
    document.getElementById('textNomeClienteAlterar').value = document.getElementById(`nome${codCliente}`).innerHTML;
    document.getElementById('textNascimentoAlterar').value = document.getElementById(`nascimento${codCliente}`).innerHTML.slice(0,10);
    document.getElementById('textTelefoneAlterar').value = document.getElementById(`telefone${codCliente}`).innerHTML;
    document.getElementById('textEmailAlterar').value = document.getElementById(`email${codCliente}`).innerHTML;
    document.getElementById('textCPFAlterar').value = document.getElementById(`cpf${codCliente}`).innerHTML;
    document.getElementById('textCEPAlterar').value =  document.getElementById(`cep${codCliente}`).innerHTML;
    document.getElementById('textRuaAlterar').value =  document.getElementById(`rua${codCliente}`).innerHTML;
    document.getElementById('textNumeroAlterar').value =  document.getElementById(`numero${codCliente}`).innerHTML;
    document.getElementById('textComplementoAlterar').value =  document.getElementById(`complemento${codCliente}`).innerHTML;
    document.getElementById('textBairroAlterar').value =  document.getElementById(`bairro${codCliente}`).innerHTML;
    document.getElementById('textCidadeAlterar').value =  document.getElementById(`cidade${codCliente}`).innerHTML;
    modalAlterar.show();
}

function alterarCliente() {
    var nomeCliente = textNomeClienteAlterar.value;
    var nascimento = textNascimentoAlterar.value;
    var cpf = textCPFAlterar.value.slice(0,3);
    cpf += textCPFAlterar.value.slice(4,7);
    cpf += textCPFAlterar.value.slice(8,11);
    cpf += textCPFAlterar.value.slice(12,14);
    var telefone = textTelefoneAlterar.value;
    var email = textEmailAlterar.value;
    var cep = textCEPAlterar.value;
    var rua = textRuaAlterar.value;
    var numero = textNumeroAlterar.value;
    var complemento = textComplementoAlterar.value;
    var bairro = textBairroAlterar.value;
    var cidade = textCidadeAlterar.value;
    var codCliente = textCodCliente.value;
    if (!codCliente || !email || !telefone || !cpf || !nomeCliente || !nascimento || !cep || !rua || !numero || !bairro || !cidade) {
        modalAlerta.show();
        return;
    }
    var alterarCliente = {
        nomeCliente: nomeCliente,
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
        codCliente: codCliente
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            pesquisarClientes();
            modalAlterar.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(alterarCliente));
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

function abrirExcluir(codCliente) {
    document.getElementById("textCodClienteExcluir").value = codCliente;
    modalExcluir.show();
}

// function excluirCliente(codCliente) {
//     var codCliente = textCodClienteExcluir.value;
//     if (!confirm('Tem certeza que deseja excluir este cliente?'))
//         return;
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             alert('Cliente excluído com sucesso!');
//             modalExcluir.hide();
//             pesquisarClientes();
//         }
//     };
//     xhttp.open('DELETE', `${url}/${codCliente}`, true);
//     xhttp.send();
// }

function apagarDadosCliente(codCliente) {
    var codCliente = textCodClienteExcluir.value;
    var apagarDadosCliente = {
        nomeCliente: "Padrão",
        nascimento: "1999-09-09T00:00:00.000Z",
        cpf: "00000000000",
        email: "padrao@padrao.com",
        telefone: 10000000001,
        rua: 'Padrão',
        numero: 101,
        complemento: "",
        bairro: "Padrão",
        cidade: "Padrão",
        cep: "00000000",
        codCliente: codCliente
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            pesquisarClientes();
            modalExcluir.hide();
            modalSucesso.show();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(apagarDadosCliente));
}

        // mostrarAnimais: function (codCliente) {
        //     var xhttp = new XMLHttpRequest();
        //     xhttp.onreadystatechange = function () {
        //         if (this.readyState == 4 && this.status == 200) {
        //             var resposta = JSON.parse(this.response);
        //             app.infos = resposta;
        //         } else if (this.readyState == 4) {
        //             corpoTabela.innerHTML = 'Erro ao pesquisar.';
        //         }
        //     };
        //     xhttp.open('GET', `${app.url}​/Animais​/cliente​/${codCliente}`, true);
        //     xhttp.send();
        //     modalAnimais.show();

        // }
  
// var modalAnimais = new bootstrap.Modal(document.getElementById('modalAnimais'), {});
