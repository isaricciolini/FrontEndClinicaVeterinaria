var url = 'https://localhost:5001/clientes';
var corpoTabela = document.getElementById('corpoTabela');
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var modalAlterar = new bootstrap.Modal(document.getElementById('modalAlterar'), {});
var modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'), {});
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
                linha += `<td id="nascimento${info.codCliente}">${info.nascimento.slice(0,10)}</td>`;
                linha += `<td id="cpf${info.codCliente}">${info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>`;
                linha += `<td id="telefone${info.codCliente}">${info.telefone}</td>`;
                linha += `<td id="email${info.codCliente}">${info.email}</td>`;
                linha += `<td id="rua${info.codCliente}">${info.rua}</td>`;
                linha += `<td id="numero${info.codCliente}">${info.numero}</td>`;
                linha += `<td id="complemento${info.codCliente}">${info.complemento}</td>`;
                linha += `<td id="cep${info.codCliente}">${info.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}</td>`;
                linha += `<td id="bairro${info.codCliente}">${info.bairro}</td>`;
                linha += `<td id="cidade${info.codCliente}">${info.cidade}</td>`;
                linha += '</tr>';
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
        alert('Preencha todos os dados para cadastrar!');
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
            alert(`${novoCliente.nomeCliente} cadastrado(a) com sucesso!`);
            modalCadastrar.hide();
            pesquisarClientes();
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar o cliente.');
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
        alert("CEP não encontrado.");
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

function abrirAlterar() {
    modalAlterar.show();
}

function alterarCliente() {
    var nomeCliente = textNomeClienteAlterar.value;
    var nascimento = textNascimentoAlterar.value;
    var cpf = textCPFAlterar.value;
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
        alert('Preencha todos os dados para alterar!');
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
            alert(`${alterarVeterinario.nomeCliente} alterado(a) com sucesso!`);
            pesquisarClientes();
            modalAltertar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível alterar o cliente.');
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
        alert("CEP não encontrado.");
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

function abrirExcluir() {
    modalExcluir.show();
}

function excluirCliente(codCliente) {
    var codCliente = textCodClienteExcluir.value;
    if (!confirm('Tem certeza que deseja excluir este cliente?'))
        return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert('Cliente excluído com sucesso!');
            pesquisarClientes();
            modalExcluir();
        }
    };
    xhttp.open('DELETE', `${url}?CodCliente=${codCliente}`, true);
    xhttp.send();
}

        // mostrarAnimais: function (codCliente) {
        //     var xhttp = new XMLHttpRequest();
        //     xhttp.onreadystatechange = function () {
        //         if (this.readyState == 4 && this.status == 200) {
        //             var resposta = JSON.parse(this.response);
        //             app.infos = resposta;
        //             console.log(resposta)
        //         } else if (this.readyState == 4) {
        //             corpoTabela.innerHTML = 'Erro ao pesquisar.';
        //         }
        //     };
        //     xhttp.open('GET', `${app.url}​/Animais​/cliente​/${codCliente}`, true);
        //     xhttp.send();
        //     modalAnimais.show();

        // }
  
// var modalAnimais = new bootstrap.Modal(document.getElementById('modalAnimais'), {});

