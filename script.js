
function carregaPokemon(){
    debugger
    let id = document.getElementById(`txtPokemon`).value;

    if(id != ""){
        let url = 'https://pokeapi.co/api/v2/pokemon/'+ id +'/';


        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById(`nomePokemon`).innerHTML = data['name'];
            document.getElementById(`numero`).innerHTML = data['id'];
            let img = data[`sprites`]['front_default'];
            document.getElementById(`pic`).setAttribute('src',img);


        })
        .catch((error) => {
            console.log("Console: " + error);
        })
    }
}



document.getElementById(`btn1`).onclick = carregaPokemon;