const TMDB_API_KEY = "94cf5c3fe8bf7f2d4c8b0df5b9adc973"; //KEY DO TMDb

const preferencias = [
    { nome: "The Flash", categoria: "Série"},
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

async function buscarImagem (nome) {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(nome)}`;

    try{
        const r = await fetch(url);
        const dados = await r.json();

        if(dados.results && dados.results > 0){
            let imagemPath = dados.results[0].poster_path || dados.results[0].backdrop_path; 

            if (imagemPath) {
                return `https://image.tmdb.org/t/p/w200${imagemPath}`;
            }
        }
        return "https://via.placeholder.com/80x120?text=Sem+Imagem";
    }
}

async function carregarPreferencias() {
    const lista = document.getElementById("preferidos");

    for (let item of preferencias) {
        let imagemUrl = await buscarImagem(item.nome);
        let li = document.createElement("li");
        li.classList.add("cp");

        let img = document.createElement("img");
        
    }
}

async function carregarlistadedesejo() {
    const lista = document.getElementById("assistir");
    
}