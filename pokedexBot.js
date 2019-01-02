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

    P.getPokemonByName(pokemonName) 
    .then(function(response) {
      console.log(response);
      message.channel.send(response.name, {
        file: response.sprites.front_default 
    });
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
  }
});

//Bot login in
bot.login('SECRET_CLIENT_ID');