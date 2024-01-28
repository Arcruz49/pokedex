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
                mudaPerfil(data);
                setTipos(data)
            });
    }
}

function mudaPerfil(data){
    document.getElementById(`nomePokemon`).innerHTML = capitalizeFirstLetter(data['name']);
    document.getElementById(`numero`).innerHTML = data['id'];
    let img = data['sprites']['front_default'];
    document.getElementById(`pic`).setAttribute('src', img);
}

function setTipos(data){
    const typeName = data.types[0].type.name;
    document.getElementById('tipo1').innerHTML = typeName;
    mudaCorTipo(1, typeName);

    if (data.types.length > 1) {
        const typeName2 = data.types[1].type.name;
        document.getElementById('tipo2').innerHTML = typeName2;
        mudaCorTipo(2, typeName2);
    }
    else{
        document.getElementById('tipo2').innerHTML = "";
    }
}

function mudaCorTipo(n, tipo){
    var color = "";

    switch(tipo){
        case "bug":
            color = "#a3b21e"
            break;
        case "dark":
            color = "#4f3c2e"
            break;
        case "dragon":
            color = "#a89beb"
            break;
        case "eletric":
            color = "#fcb816"
            break;
        case "fairy":
            color = "#f3abf3"
            break;
        case "fighting":
            color = "#7f321d"
            break;
        case "fire":
            color = "#dc3b12"
            break;
        case "flying":
            color = "#98a9f2"
            break;
        case "ghost":
            color = "#6262b1"
            break;
        case "grass":
            color = "#76c338"
            break;
        case "ground":
            color = "#d2b359"
            break;
        case "ice":
            color = "#9fe5fd"
            break;
        case "normal":
            color = "#c7c3b9"
            break;
        case "poison":
            color = "#954794"
            break;
        case "psychic":
            color = "#ea467f"
            break;
        case "rock":
            color = "#b8a55c"
            break;
        case "steel":
            color = "#b7b7c5"
            break;
        case "water":
            color = "#4ca0f1"
            break;
    }
    debugger
        if (n == 1)
            document.getElementById('tipo1').style.backgroundColor = color;
        else
            document.getElementById('tipo2').style.backgroundColor = color;
    
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