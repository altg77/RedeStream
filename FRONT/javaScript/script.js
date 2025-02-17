const TMDB_API_KEY = "94cf5c3fe8bf7f2d4c8b0df5b9adc973"; //KEY DO TMDb

const preferencias = [
    { nome: "Fate Stay Night", categoria: "Anime"},
    { nome: "Jujutsu Kaisen", categoria: "Anime"},
    { nome: "Demon Slayer", categoria: "Anime"},
    { nome: "Stranger Things", categoria: "Serie"},
    { nome: "Invocação do mal", categoria: "Filme"},
    { nome: "Naruto", categoria: "Anime"},
    { nome: "Bunny girl senpai", categoria: "Anime"},
    { nome: "Gambito da rainha", categoria: "Série"},
    { nome: "Solo Leveling", categoria: "Anime"}
]

const listadedesejo = [
    { nome: "Bleach", categoria: "Anime"},
    { nome: "My Hero Academia", categoria: "Anime"},
    { nome: "Kaiju No.8", categoria: "Anime"},
    { nome: "Deadpool 3", categoria: "Filme"},
    { nome: "Coringa 2", categoria: "Filme"},
    { nome: "Loki (Temporada 2)", categoria: "Série"},
    { nome: "One Piece (Live-action) ", categoria: "Série"},
    { nome: "Fallout", categoria: "Série"}
]

async function buscarImagem(nome) {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(nome)}`;

    try {
        const r = await fetch(url);
        const dados = await r.json();

        if (dados.results && dados.results.length > 0) {
            let imagemPath = dados.results[0].poster_path || dados.results[0].backdrop_path;

            if (imagemPath) {
                return `https://image.tmdb.org/t/p/w200${imagemPath}`;
            }
        }
    } 
    
    catch (error) {
        console.error("Erro ao buscar imagem:", error);
    }

    return "https://via.placeholder.com/80x120?text=Sem+Imagem";
}

async function carregarLista(lista, array) {
    for (let item of array) {
        let imagemUrl = await buscarImagem(item.nome);
        let li = document.createElement("li");
        li.classList.add("item");

        let img = document.createElement("img");
        img.src = imagemUrl;
        img.alt = item.nome;

        let texto = document.createTextNode(`${item.nome} (${item.categoria})`);

        li.appendChild(img);
        li.appendChild(texto);
        lista.appendChild(li);
    }
}

document.getElementById("form-indicacao").addEventListener("submit", function(event) {
    event.preventDefault();
    adicionarIndicacao();
});

async function adicionarIndicacao() {
    let categoria = document.getElementById("categoria").value;
    let indicacao = document.getElementById("indicacao").value;
    
    if (indicacao.trim() !== "") {
        let lista = document.getElementById("sugestoes");
        let novoItem = document.createElement("li");
        novoItem.classList.add("item");
        
        let imagem = document.createElement("img");
        imagem.alt = indicacao;
        imagem.src = await buscarImagem(indicacao);
        
        novoItem.appendChild(imagem);
        novoItem.appendChild(document.createTextNode(` ${indicacao} (${categoria})`));
        lista.appendChild(novoItem);
    }
    
    document.getElementById("indicacao").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    carregarLista(document.getElementById("preferidos"), preferencias);
    carregarLista(document.getElementById("assistir"), listadedesejo);
});