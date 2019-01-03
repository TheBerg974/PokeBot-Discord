//Importing discord.js
const { Client, RichEmbed } = require('discord.js');
const bot = new Client();

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

//Bot is ready
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
  if (message.content.startsWith('!pokemon ')) {
    const pokemonName = message.content.replace('!pokemon ', '');
    
    //Creating the pokemon Info Embed
    let pokemonInfo = Promise.all([findPokemonNameIdSprite(pokemonName), findPokemonDescriptionColor(pokemonName)])
    pokemonInfo.then(function(response) {
      let name = parsePokemonName(response)
      let id = parsePokemonId(response)
      let spriteURL = parsePokemonSprites(response)
      let color = parsePokemonColor(response);
      let description = parsePokemonDescription(response);

      const embed = new RichEmbed()
      .setTitle(name.toUpperCase())
      .setColor(0xFF0000) //TODO find a way to convert color name
      .addField('Description', description)
      .setThumbnail(spriteURL);
    message.channel.send(embed);
   })
  }
});

//Bot login in
bot.login('NDU4MDkwNTE0NjI1ODU1NDk5.DgixUQ.eXig2oeIoDRgsSa9q9QqNvMJkQA');

//Returning Name, Id, Sprite
function findPokemonNameIdSprite(pokemonNameID) {
  let promise = P.getPokemonByName(pokemonNameID).then(response => { return response });
  return promise; 
}

//Returning Description and Color
function findPokemonDescriptionColor(pokemonNameID) {
  let promise = P.getPokemonSpeciesByName(pokemonNameID).then(response => { return response });
  return promise;
}

//Parsing all the data
function parsePokemonName(json) {
  let name = json[0].name;
  return name;
}

function parsePokemonId(json) {
  let id = json[0].id;
  return id;
}

function parsePokemonSprites(json) {
  let spriteURL = json[0].sprites.front_default;
  return spriteURL;
}

function parsePokemonColor(json) {
  color = json[1].color.name;
  return color;
}

function parsePokemonDescription(json) {
  let descriptions = json[1].flavor_text_entries
  for (let index = 0; index < descriptions.length; index++) {
    let language = descriptions[index].language.name;
    if(language == 'en') {
      let description = descriptions[index].flavor_text;
      return description;
    }
  }
}

