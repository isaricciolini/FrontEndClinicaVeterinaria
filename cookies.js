if (getCookie('usuario') != "") {
    document.getElementById('usuario').innerHTML = `Olá, <b>${getCookie('usuario')}</b>`
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

/**
 * Consulta um cookie.
 * @param  {String} usuario Nome do cookie
 * @return {String} Valor do cookie
 */
function getCookie(usuario) {
    let login = usuario + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(login) == 0) {
            return c.substring(login.length, c.length);
        }
    }
    return "";
}

/**
 * Verifica a existência de um cookie.
 * @param  {String} usuario Nome do cookie
 * @return {Boolean} Cookie existe
 */
function checkCookie(usuario) {
    getCookie("usuario")
    if (usuario != "")
        return true;
    else
        return false;
}

// /**
//  * Remove um cookie.
//  * @param  {String} usuario Nome do cookie
//  */
// function removeCookie(usuario) {
//     setCookie(usuario, "");
// }

function expireCookie() {
    var expirar = "expires=Thu, 01 Jan 1970 00:00:00 UTC"
    var usuario = "usuario"
    var nomeUsuario = "deslogado"
    expires = expirar;
    document.cookie = usuario + "=" + nomeUsuario + ";" + expires + ";path=/";
    window.location = "index.html";
}