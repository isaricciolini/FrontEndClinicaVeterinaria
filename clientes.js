var app = new Vue({
    el: '#app',
    data: {
        pagina: 'Clientes',
        url: 'https://localhost:5001',
        infos: {},
    },
    methods: {
        pesquisar: function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var resposta = JSON.parse(this.response);
                    console.log('Cheguei aqui');
                    app.infos = resposta;
                    console.log(resposta)
                } else if (this.readyState == 4) {
                    corpoTabela.innerHTML = 'Erro ao pesquisar.';
                }
            };
            xhttp.open('GET', `${app.url}/Clientes/Completo`, true);
            xhttp.send();

        },

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
    }
});

// var modalAnimais = new bootstrap.Modal(document.getElementById('modalAnimais'), {});

app.pesquisar();