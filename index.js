var url = 'https://localhost:5001/logins';
var textUsuario = document.getElementById('textUsuario');
var textSenha = document.getElementById('textSenha');
var codFuncionario = document.getElementById('textCodFuncionario');
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var textUsuarioCadastrar = document.getElementById('textUsuarioCadastrar');
var textSenhaCadastrar = document.getElementById('textSenhaCadastrar')

var modalSucesso = new bootstrap.Modal(document.getElementById('modalSucesso'), {});
var modalAlerta = new bootstrap.Modal(document.getElementById('modalAlerta'), {});
var modalAlertaDeOperacao = new bootstrap.Modal(document.getElementById('modalAlertaDeOperacao'))


function logar() {
    var senhaDigitada = textSenha.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            login = JSON.parse(this.response);
            if (senhaDigitada == login.senha) {
                setCookie("usuario",login.usuario)
                setCookie("codFuncionario",login.codFuncionario)
                pesquisarCRMV()
                window.location = "agenda.html";
                return false;
            } else {
                return alert('Senha incorreta!');
            }
        } else if (this.readyState == 4) {
            return alert('Usuário inválido.');
        }
    };
    xhttp.open('GET', `${url}/${textUsuario.value}`, true);
    xhttp.send();
}

function pesquisarCRMV() {
        corpoTabela.innerHTML = '';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            funcionario = JSON.parse(this.response)
            setCookie("CRMV",funcionario.CRMV)
        };
        xhttp.open('GET', `https://localhost:5001/funcionarios/${getCookie("codFuncionario")}`, true);
        xhttp.send();
    }
}


function abrirCadastrar() {
    modalCadastrar.show();
}


function cadastrarLogin() {
    var codFuncionario = textCodFuncionario.value;
    var Usuario = textUsuarioCadastrar.value;
    var Senha = textSenhaCadastrar.value;
    if (!codFuncionario || !Usuario || !Senha) {
        modalAlerta.show();
        return;
    }
    var novoLogin = {
        codFuncionario: codFuncionario,
        usuario: Usuario,
        senha: Senha
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            limparCadastro();
            modalCadastrar.hide();
        } else if (this.readyState == 4) {
            modalAlertaDeOperacao.show();
        }
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novoLogin));
}

/**
 * Grava um cookie.
 * @param  {String} usuario Nome do cookie
 * @param  {String} nomeUsuario Valor do cookie
 */
 function setCookie(usuario, nomeUsuario) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000)); // cookie válido por 24 horas
    let expires = "expires=" + d.toUTCString();
    document.cookie = usuario + "=" + nomeUsuario + ";" + expires + ";path/";
}

function limpar() {
    textUsuario.value = '';
    textSenha.value = '';
}

function limparCadastro() {
    textUsuario.value = '';
    textSenha.value = '';
    codFuncionario.value = '';
}