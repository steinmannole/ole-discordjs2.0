const Discord = require("discord.js");
const client = new Discord.Client({intents: 32767});
const { DiscordTogether } = require('discord-together');
const { TokenDev, TokenLive } = require("./config.json");

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

// Discord Together Addon
client.discordTogether = new DiscordTogether(client);

// Register a new main channel
tempChannels.registerChannel("963002885388521523", {
    childCategory: "941394793412567080",
    childAutoDeleteIfEmpty: true,
    childFormat: (member, count) => `⌛ | ${member.displayName}`
});

// Discord Together Addon - Watch2Gether Plugin
client.on('messageCreate', async message => {
  if (message.content === 'poker') {
      if(message.member.voice.channel) {
        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
          return message.channel.send(`${invite.code}`);
        });
      };
  };
});

// Ready Messages
client.on('ready', () => {
        client.user.setActivity(
      `${client.guilds.cache
        .map((guild) => guild.memberCount)
        .reduce((p, c) => p + c)} Mitgliedern`,
      { type: "LISTENING" }
    );
    
    console.info(`Logged in as ${client.user.tag} - SUCCESS ✓`);
    console.info(`Discord Together - SUCCESS ✓`);
    console.info(`Temp Channel - SUCCESS ✓`);
    console.warn(`Running ...`);
  })

// !!! Use only One !!! //
// DEV Login
//client.login(TokenDev);

// LIVE Login
client.login(TokenLive);