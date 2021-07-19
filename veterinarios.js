var url = 'https://localhost:5001/veterinarios';

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
                linha += `<td id="bairro${info.codVeterinario}">${info.bairro}</td>`;
                linha += `<td id="cidade${info.codVeterinario}">${info.cidade}</td>`;
                linha += `<td><a onclick="abrirAlterarConsulta(${info.codVeterinario})">Alterar</a></td>`;
                linha += `<td><a onclick="excluirConsulta(${info.codVeterinario})">Excluir</a></td>`;
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela','.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar veterinários.';
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}