var url = 'https://localhost:5001/logins';
var usuario = document.getElementById('textusuario').value;
var senha = document.getElementById('textsenha').value;
var codVeterinario = document.getElementById('textcodVeterinario');
var modalCadastrar = new bootstrap.Modal(document.getElementById('modalCadastrar'), {});



function pesquisarLogins() {
    senha = document.getElementById('textsenha').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            login = JSON.parse(this.response);
            console.log(login);
            if (senha == login[0].senha) {
                alert("Login realizado com sucesso!");
                console.log(login.codVeterinario);
                window.location = `login-sucess.html?codVeterinario=${login[0].codVeterinario}`;
                return false;
            }else {
                return BadRequest('Senha incorreta!');
            }
            
        } else if (this.readyState == 4) {
            return BadRequest('Usuário inválido.');
        }
    };
    xhttp.open('GET', `${url}/${usuario}`, true);
    xhttp.send();
}



function abrirCadastrar() {
    modalCadastrar.show()
    }

function cadastrarLogin() {
    var codVeterinario = textcodVeterinario.value;
    var usuario = textusuario.value;
    var senha = textsenha.value;
    if (!codVeterinario || !usuario || !senha) {
        alert('Preencha todos os dados para cadastrar!');
        return;
    }
    var novoLogin = {
        codVeterinario: codVeterinario,
        usuario: usuario,
        senha: senha
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(`Login cadastrado com sucesso!`);
            limparCadastro();
            modalCadastrar.hide();
        } else if (this.readyState == 4) {
            console.log(novoLogin);
            alert('Não foi possível cadastrar o usuário e senha.');
        }
    };
    console.log(novoLogin);
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(novoLogin));
}



function limpar() {
    usuario.value = '';
    senha.value = '';
}

function limparCadastro() {
    usuario.value = '';
    senha.value = '';
    codVeterinario.value = '';
}