const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
console.log(client);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`There are currently ${client.users.cache.size} users in the server!`);
});

client.on('message', message => {
  //keeps a log of all messages sent from running of program
  console.log(message.content);
  console.log('- ' + message.author.username);
  //if message does not have the prefix or the bot sent the messages
  //do not respond
  if(!message.content.startsWith(prefix) || message.author.bot) return;



  //splits command into cmd and args depending on prefix in config file
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  //if there is no command with that name
  if (!client.commands.has(commandName)) return;

  //finds command
  const command = client.commands.get(commandName);

  //checks if can be used in DMs
  if (command.guildOnly && message.channel.type !== 'text') {
	return message.reply('I can\'t execute that command inside DMs!');
  }

  //checks if command requires arguments
  if (command.args && !args.length) {
    let reply = `You didn't reply any arguments`;
    if(command.usage) {
      reply += `\nThe proper usage would be: ${prefix}${command.name} ${command.usage}\nError Code: 004`;
    }

    return message.channel.send(reply);
  }

  if(command.adminOnly && (message.author.id != "365909852343500840")) {
    return message.channel.send("Nice try. Admin command only.\nError Code: 003");
  }

  //executes command unless error occurs
  try {
    command.execute(message, args);
  } catch (error) {
  console.error(error);
    message.channel.send('there was an error trying to execute that command!');
    message.channel.send('Error Code: 002')
  }
});

client.login(token);
