module.exports = {
	name: 'test',
	description: 'Ping!',
  args: false,
  usage: '',
  guildOnly: true,
  adminOnly: false,
	execute(message, args) {
		message.channel.send(`There are currently blank users in the server!`);
	},
};
