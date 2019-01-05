//Importing discord.js
const { Client, RichEmbed } = require('discord.js');
const bot = new Client();

//Importing 
let pokemon = require('./pokedexPokemon');

//Bot is ready
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
  if (message.content.startsWith('!pokemon ')) {
    const pokemonName = message.content.replace('!pokemon ', '');
    //Creating the pokemon Info Embed
    let pokemonInfo = Promise.all([pokemon.findPokemonNameIdSprite(pokemonName), pokemon.findPokemonDescriptionColor(pokemonName)])
    pokemonInfo.then(function(response) {
      let name = pokemon.parsePokemonName(response)
      let id = pokemon.parsePokemonId(response)
      let spriteURL = pokemon.parsePokemonSprites(response)
      let color = pokemon.parsePokemonColor(response);
      let description = pokemon.parsePokemonDescription(response);
      let statMap = pokemon.parsePokemonStats(response);
      let typesArray = pokemon.parsePokemonType(response);

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
      .addField('TYPE(S)', typesArray.toString())
      .setThumbnail(spriteURL);
    message.channel.send(embed);
   })
  }
});

//Bot login in
bot.login('SECRET_CLIENT_ID');


