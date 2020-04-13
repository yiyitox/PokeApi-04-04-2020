const URL_POKEAPI = "https://pokeapi.co/api/v2/";

// Lista de pokemones consultados
const requestedPokemons = [];

document.getElementById('username').onkeyup = function() {

}

// obtiene los datos de pokemones
async function getPokemonData(name, index) {
    if (!requestedPokemons.includes(name)) {
        const resp = await axios.get(URL_POKEAPI + 'pokemon/' + name)
        mostrarInformacionPokemon(resp.data, index);
    }
}

function mostrarInformacionPokemon(data) {

    const tableList = document.getElementById('pokemon-list').getElementsByTagName('tbody')[0];
    const row = tableList.insertRow();

    const insertarID = row.insertCell();
    const insertarNombre = row.insertCell();
    const insertarImagen = row.insertCell();
    const insertarHabilidades = row.insertCell();
    const insertarTipo = row.insertCell();
    const insertarAcciones = row.insertCell();
    const listaHabilidades = document.createElement('ul');

    data.abilities.reverse().map(abilities => {
        const liAbility = document.createElement('li');
        liAbility.innerHTML = abilities.ability.name;
        listaHabilidades.appendChild(liAbility);
    });

    insertarHabilidades.append(listaHabilidades);

    const typesList = document.createElement('ul');
    data.types.map(types => {
        const typeLi = document.createElement('li');
        typeLi.innerHTML = types.type.name;
        typesList.appendChild(typeLi);
    });
    insertarTipo.append(typesList);

    const img = document.createElement('img');
    img.src = data.sprites.front_shiny;
    img.title = data.name;
    insertarImagen.append(img);
    insertarID.innerHTML = data.id;
    insertarNombre.innerHTML = data.name;
    const buttons = `
        <button class='btn btn-primary' onclick="savePokemon(${data.id})"> Guardar </button>
    `
    insertarAcciones.innerHTML = buttons;
}

let i = 1;

// For para que muestre de a 10 Pokemones
async function getFirstTen() {
    const ii = i + 10;
    for (i; i < ii; i++) {
        await getPokemonData(i, i);
    }
}


function savePokemon(id) {
    axios.post(`http://localhost:4000/pokemon/${id}`).then(response => {
         const { data } = response;
         if (!data.status) {
             
         } else 
         
         alert('Pokemon Guardado')

    })

}