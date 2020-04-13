const URL_POKEAPI = "https://pokeapi.co/api/v2/";

// Lista de pokemones consultados
const requestedPokemons = [];

const inputRef = document.querySelector('#buscador');
const abilitiesListRef = document.querySelector('#abilities');
const typesListRef = document.querySelector('#types');


async function buscarPokemon() {

    const pokemon = await buscarPokemonAsincrono(inputRef.value);
    const { id, name } = pokemon;

    document.querySelector('#pokemon-name').innerHTML = name;

    document.querySelector('#pokemon-sprite').src = pokemon.sprites.front_default;

    //Abilities
    pokemon.abilities.forEach(ability => {

        let abilityTag = document.createElement('li');
        abilityTag.innerHTML = ability.ability.name;
        abilitiesListRef.appendChild(abilityTag);
    })

    // types
    pokemon.types.forEach(type => {

        let typeTag = document.createElement('li')
        typeTag.innerHTML = type.type.name
        typesListRef.appendChild(typeTag)
    })

}
async function buscarPokemonAsincrono(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    return await response.json()
}