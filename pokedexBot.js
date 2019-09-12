//Importing discord.js
const { Client, RichEmbed } = require('discord.js');
const bot = new Client();

//Importing functions
let pokemon = require('./pokedexPokemon');
let pokemonItem = require('./pokedexItem.js');
let pokemonEvolution = require('./pokedexEvolution.js');

//Bot is ready
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
  if(message.content.startsWith('!pokemon ')) {
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
      .setTitle(name.toUpperCase() + ' (#' + id + ')')
      .setColor(0xFF0000) //TODO find a way to convert color name
      .addField('SPEED: ', statMap.get('SPD'), true)
      .addField('SPECIAL DEFENSE: ', statMap.get('SD'), true)
      .addField('SPECIAL ATTACK: ', statMap.get('SA'), true)
      .addField('DEFENSE: ', statMap.get('D'), true)
      .addField('ATTACK: ', statMap.get('A'), true)
      .addField('HEALTH POINTS: ', statMap.get('HP') + '\n', true)
      .addField('DESCRIPTION: ', description)
      .addField('TYPE(S): ', typesArray.toString())
      .setThumbnail(spriteURL);

      message.channel.send(embed);

    }).catch(function(error) {
      message.reply('Sorry, but the command you entered is invalid');
    });

  }else if(message.content.startsWith('!item ')) {
    const itemName = message.content.replace('!item ', '');

    let itemInfo = pokemonItem.findItem(itemName);
    itemInfo.then(function(response) {
      let name = pokemonItem.parseItemName(response);
      let id = pokemonItem.parseItemId(response);
      let spriteURL = pokemonItem.parseItemSpriteURL(response);
      let description = pokemonItem.parseItemDescription(response);
      let effect = pokemonItem.parseItemEffect(response);

      const embed = new RichEmbed()
      .setTitle(name.toUpperCase() + ' (#' + id + ')')
      .setColor(0x0000FF)
      .addField('EFFECT: ', effect)
      .addField('DESCRIPTION: ', description)
      .setThumbnail(spriteURL);
      
      message.channel.send(embed);
    })
  }else if(message.content.startsWith('!evolution')) {
    const evolutionId = message.content.replace('!evolution ', '');

    let evolutionInfo = pokemonEvolution.findEvolution(evolutionId);
    evolutionInfo.then(function(response) {
      console.log(pokemonEvolution.parseEvolution(response));
      
    }).catch(function(error) {
      message.reply('Sorry, but the command you entered is invalid');
    });
  }
});

//Bot login in
bot.login('NDU4MDkwNTE0NjI1ODU1NDk5.XXhjEA.7QOBrvvJWOqNbRDqCUw64XzDO-E');


