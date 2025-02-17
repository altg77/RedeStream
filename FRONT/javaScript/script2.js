async function carregarIndicacoesSalvas() {
    let lista = document.getElementById("sugestoes");
    let indicacoes = JSON.parse(localStorage.getItem("indicacoes")) || [];

    for (let item of indicacoes) {
        let imagemUrl = await buscarImagem(item.nome);
        let li = document.createElement("li");
        li.classList.add("item");

        let img = document.createElement("img");
        img.src = imagemUrl;
        img.alt = item.nome;

        let texto = document.createTextNode(` ${item.nome} (${item.categoria})`);

        li.appendChild(img);
        li.appendChild(texto);
        lista.appendChild(li);
    }
}

// Chama a função quando a página carregar
document.addEventListener("DOMContentLoaded", carregarIndicacoesSalvas);