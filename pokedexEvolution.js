//Importing Pokedex-promise-v2
let Pokedex = require('pokedex-promise-v2');
let P = new Pokedex();

exports.findEvolution = function(pokemonId) {
    let promise = P.getEvolutionChainById(pokemonId).then(response => { return response });
    return promise;
}

exports.parseEvolution = function(json) {
    let pokemon = []; 
    //First Pokemon
    pokemon.push(json.chain.species.name);
    
    let noMoreEvolution = false;
    
    let array = json.chain.evolves_to;

    while(!noMoreEvolution) {
        if(array.length == 0) {
            noMoreEvolution = true;
        } else {
            pokemon.push(array[0].species.name);
            array = array[0].evolves_to;
        }
    }

    return pokemon;
}
