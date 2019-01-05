//Importing Pokedex-promise-v2
let Pokedex = require('pokedex-promise-v2');
let P = new Pokedex();

//Returning Name, Id, Sprite
exports.findPokemonNameIdSprite = function(pokemonNameID) {
    let promise = P.getPokemonByName(pokemonNameID).then(response => { return response });
    return promise; 
}
  
  //Returning Description and Color
exports.findPokemonDescriptionColor = function(pokemonNameID) {
    let promise = P.getPokemonSpeciesByName(pokemonNameID).then(response => { return response });
    return promise;
}
  
  //Parsing all the data
  exports.parsePokemonName = function(json) {
    let name = json[0].name;
    return name;
  }
  
  exports.parsePokemonId = function(json) {
    let id = json[0].id;
    return id;
  }
  
  exports.parsePokemonSprites = function(json) {
    let spriteURL = json[0].sprites.front_default;
    return spriteURL;
  }

  exports.parsePokemonType = function(json) {
      let types = json[0].types
      let typesArray = [];
      for (let i = 0; i < types.length; i++) {
          typesArray.push(types[i].type.name);
      }

      for (let j = 0; j < typesArray.length; j++) {
        switch (typesArray[j]) {
          case 'bug':
              typesArray[j] = '🐛BUG🐛'
              break;
          case 'dark':
              typesArray[j] = '☁DARK☁'
              break;
          case 'dragon':
              typesArray[j] = '🐉DRAGON🐉'
              break;          
          case 'electric':
              typesArray[j] = '⚡ELECTRIC⚡'
              break;
          case 'fairy':
              typesArray[j] = '🧚FAIRY🧚'
              break;
          case 'fighting':
              typesArray[j] = '🥊FIGHTING🥊'
              break;
          case 'fire':
              typesArray[j] = '🔥FIRE🔥'
              break;
          case 'flying':
              typesArray[j] = '🐦FLYING🐦'
              break;
          case 'ghost':
              typesArray[j] = '👻GHOST👻'
              break;
              case 'grass':
              typesArray[j] = '🌿GRASS🌿'
              break;
          case 'ground':
              typesArray[j] = '🐿️GROUND🐿️'
              break;
          case 'ice':
              typesArray[j] = '🍨ICE🍨'
              break;
          case 'normal':
              typesArray[j] = '😐NORMAL😐'
              break;
          case 'poison':
              typesArray[j] = '🤢POISON🤢'
              break;
          case 'psychic':
              typesArray[j] = '😕PSYCHIC😕'
              break;
          case 'rock':
              typesArray[j] = '🗿ROCK🗿'
              break;
          case 'steel':
              typesArray[j] = '🔩STEEL🔩'
              break;
          case 'water':
              typesArray[j] = '🌊WATER🌊'
              break;    
        }
      }
      return typesArray;
  }
  
  exports.parsePokemonColor = function(json) {
    color = json[1].color.name;
    return color;
  }
  
  exports.parsePokemonDescription = function(json) {
    let descriptions = json[1].flavor_text_entries
    for (let i = 0; i < descriptions.length; i++) {
      let language = descriptions[i].language.name;
      if(language == 'en') {
        let description = descriptions[i].flavor_text;
        description.replace('\n', ' ');
        return description;
      }
    }
  }
  
  exports.parsePokemonStats = function(json) {
    let statMap = new Map();
    
    let speed = json[0].stats[0].base_stat;
    let specialDefense = json[0].stats[1].base_stat;
    let specialAttack = json[0].stats[2].base_stat;
    let defense = json[0].stats[3].base_stat;
    let attack = json[0].stats[4].base_stat;
    let hP = json[0].stats[5].base_stat;
  
    statMap.set('SPD', speed);
    statMap.set('SD', specialDefense);
    statMap.set('SA', specialAttack);
    statMap.set('D', defense);
    statMap.set('A', attack);
    statMap.set('HP', hP);
  
    return statMap;
  }