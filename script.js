function fetchPokemonData(id) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';

    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log("Console: " + error);
        });
}

function carregaPokemon(){
    let id = document.getElementById(`txtPokemon`).value;
    if (id !== "") {
        fetchPokemonData(id)
            .then((data) => {
                document.getElementById(`nomePokemon`).innerHTML = data['name'];
                document.getElementById(`numero`).innerHTML = data['id'];
                let img = data['sprites']['front_default'];
                document.getElementById(`pic`).setAttribute('src', img);
            });
    }
}

function trocaImagem(){
    let id = document.getElementById(`txtPokemon`).value;
    fetchPokemonData(id)
        .then((data) => {
            let img = data['sprites']['back_default'];
            document.getElementById(`pic`).setAttribute('src', img);
        });
}

function voltaImagem() {
    let id = document.getElementById(`txtPokemon`).value;
    fetchPokemonData(id)
        .then((data) => {
            let img = data['sprites']['front_default'];
            document.getElementById(`pic`).setAttribute('src', img);
        });
}

document.getElementById(`pic`).onmouseenter = trocaImagem;
document.getElementById(`pic`).onmouseleave = voltaImagem;
document.getElementById(`btn1`).onclick = carregaPokemon;