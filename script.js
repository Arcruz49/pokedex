function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchPokemonData(id) {
    if(isNaN(id)) id = id.toLowerCase();
    if (id === "2249*") {
        let img = 'images/estEgg.jpg';
        document.getElementById('pic').setAttribute('src', img);
        return;
    }
    document.getElementById('divTipo').style.display = 'block';
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
        document.getElementById('tipo2').style.display = 'inline-block';
    }
    else{
        document.getElementById('tipo2').innerHTML = "";
        document.getElementById('tipo2').style.display = 'none';
    }
}

function mudaCorTipo(n, tipo) {
    var colorMap = {
        "bug": "#a3b21e",
        "dark": "#4f3c2e",
        "dragon": "#a89beb",
        "electric": "#fcb816",
        "fairy": "#f3abf3",
        "fighting": "#7f321d",
        "fire": "#dc3b12",
        "flying": "#98a9f2",
        "ghost": "#6262b1",
        "grass": "#76c338",
        "ground": "#d2b359",
        "ice": "#9fe5fd",
        "normal": "#c7c3b9",
        "poison": "#954794",
        "psychic": "#ea467f",
        "rock": "#b8a55c",
        "steel": "#b7b7c5",
        "water": "#4ca0f1"
    };

    var color = colorMap[tipo] || "";

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