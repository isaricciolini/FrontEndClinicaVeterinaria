var url = 'https://localhost:5001/veterinarios';
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
                linha += `<td id="nascimento${info.codVeterinario}">${info.nascimento}</td>`;
                linha += `<td id="cpf${info.codVeterinario}">${info.cpf}</td>`;
                linha += `<td id="telefone${info.codVeterinario}">${info.telefone}</td>`;
                linha += `<td id="email${info.codVeterinario}">${info.email}</td>`;
                linha += `<td id="crmv${info.codVeterinario}">${info.crmv}</td>`;
                linha += `<td id="rua${info.codVeterinario}">${info.rua}</td>`;
                linha += `<td id="numero${info.codVeterinario}">${info.numero}</td>`;
                linha += `<td id="complemento${info.codVeterinario}">${info.complemento}</td>`;
                linha += `<td id="cep${info.codVeterinario}">${info.cep}</td>`;
                linha += `<td id="bairro${info.codVeterinario}">${info.bairro}</td>`;
                linha += `<td id="cidade${info.codVeterinario}">${info.cidade}</td>`;
                linha += '</tr>';
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
        alert('Preencha todos os dados para cadastrar!');
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
            alert(`${novoVeterinario.nomeVeterinario} cadastrado(a) com sucesso!`);
            limpar();
            pesquisarVeterinarios();
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar o veterinário.');
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novoVeterinario));
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('textNovoRua').value = ("");
    document.getElementById('textNovoBairro').value = ("");
    document.getElementById('textNovoCidade').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
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

    //Nova variável "cep" somente com dígitos.
    var cep = textNovoCEP.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('textNovoRua').value = "...";
            document.getElementById('textNovoBairro').value = "...";
            document.getElementById('textNovoCidade').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function excluirVeterinario() {
    var codVeterinario = textCodVeterinarioExcluir.value;
    if (!confirm('Tem certeza que deseja excluir este veterinário?'))
        return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert('Veterinário excluído com sucesso!');
            pesquisarVeterinarios();
        }
    };
    xhttp.open('DELETE', `${url}/${codVeterinario}`, true);
    xhttp.send();
}


function alterarVeterinario() {
    var nomeVeterinario = textNomeVeterinarioAlterar.value;
    var nascimento = textNascimentoAlterar.value;
    var cpf = textCPFAlterar.value;
    var telefone = textTelefoneAlterar.value;
    var crmv = textCRMVAlterar.value;
    var email = textEmailAlterar.value;
    var cep = textCEPAlterar.value;
    var rua = textRuaAlterar.value;
    var numero = textNumeroAlterar.value;
    var complemento = textComplementoAlterar.value;
    var bairro = textBairroAlterar.value;
    var cidade = textCidadeAlterar.value;
    if (!email || !telefone || !cpf || !nomeVeterinario || !nascimento || !crmv || !cep || !rua || !numero || !complemento || !bairro || !cidade) {
        alert('Preencha todos os dados para alterar!');
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
        codVeterinario: codVeterinarioAlterar
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`${alterarVeterinario.nomeVeterinario} alterado(a) com sucesso!`);
            limpar();
            pesquisarVeterinarios();
        } else if (this.readyState == 4) {
            alert('Não foi possível alterar o veterinário.');
        }
    };
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(alterarVeterinario));
}