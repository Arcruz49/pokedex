function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchPokemonData(id) {
    if(isNaN(id)) id = id.toLowerCase();

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
                document.getElementById(`nomePokemon`).innerHTML = capitalizeFirstLetter(data['name']);
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
            if(img != null)
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
document.getElementById(`txtPokemon`).oninput = carregaPokemon;