var url = 'https://localhost:5001/logins';
var textUsuario = document.getElementById('textUsuario');
var textSenha = document.getElementById('textSenha');
var codVeterinario = document.getElementById('textcodVeterinario');
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});
var textUsuarioCadastrar = document.getElementById('textUsuarioCadastrar');
var textSenhaCadastrar = document.getElementById('textSenhaCadastrar')


function logar() {
    //textUsuario = textUsuario.value;
    var senhaDigitada = textSenha.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            login = JSON.parse(this.response);
            if (senhaDigitada == login.senha) {
                setCookie("usuario",login.usuario)
                alert("Login realizado com sucesso!");
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


function abrirCadastrar() {
    modalCadastrar.show();
}


function cadastrarLogin() {
    var codVeterinario = textcodVeterinario.value;
    var Usuario = textUsuarioCadastrar.value;
    var Senha = textSenhaCadastrar.value;
    if (!codVeterinario || !Usuario || !Senha) {
        alert('Preencha todos os dados para cadastrar!');
        return;
    }
    var novoLogin = {
        codVeterinario: codVeterinario,
        usuario: Usuario,
        senha: Senha
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Login cadastrado com sucesso!`);
            limparCadastro();
            modalCadastrar.hide();
        } else if (this.readyState == 4) {
            alert('Não foi possível cadastrar o usuário e senha.');
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
    codVeterinario.value = '';
}