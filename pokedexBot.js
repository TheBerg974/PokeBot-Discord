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
      let statMap = parsePokemonStats(response);

      const embed = new RichEmbed()
      .setTitle(name.toUpperCase())
      .setColor(0xFF0000) //TODO find a way to convert color name
      .addField('SPEED: ', statMap.get('SPD'), true)
      .addField('SPECIAL DEFENSE: ', statMap.get('SD'), true)
      .addField('SPECIAL ATTACK: ', statMap.get('SA'), true)
      .addField('DEFENSE: ', statMap.get('D'), true)
      .addField('ATTACK: ', statMap.get('A'), true)
      .addField('HEALTH POINTS: ', statMap.get('HP') + '\n', true)
      .addField('DESCRIPTION', description)
      .setThumbnail(spriteURL);
    message.channel.send(embed);
   })
  }
});

//Bot login in
bot.login('SECRET_CLIENT_ID');

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
  for (let i = 0; i < descriptions.length; i++) {
    let language = descriptions[i].language.name;
    if(language == 'en') {
      let description = descriptions[i].flavor_text;
      description.replace('\n', ' ');
      return description;
    }
  }
}

function parsePokemonStats(json) {
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

