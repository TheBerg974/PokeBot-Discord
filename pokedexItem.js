//Importing Pokedex-promise-v2
let Pokedex = require('pokedex-promise-v2');
let P = new Pokedex();

//Returning Name, id, description, spriteURL
exports.findItem = function(itemName) {
    let promise = P.getItemByName(itemName).then(response => { return response });
    return promise;
}

//Parsing item data
exports.parseItemName = function(json) {
    let name = json.name;
    return name;
}

exports.parseItemId = function(json) {
    let id = json.id;
    return id;
}

exports.parseItemDescription = function(json) {
    let descriptions = json.flavor_text_entries
    for (let i = 0; i < descriptions.length; i++) {
      let language = descriptions[i].language.name;
      if(language == 'en') {
        let description = descriptions[i].text;
        description.replace('\n', ' ');
        return description;
      }
    }
}

exports.parseItemEffect = function(json) {
    let effect = json.effect_entries[0].effect;
    return effect;
}

exports.parseItemSpriteURL = function(json) {
    let spriteURL = json.sprites.default;
    return spriteURL;
}




