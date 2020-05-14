module.exports = {
	name: 'say',
	description: 'Admin only; Will repeat what ever message is fed in',
  args: true,
  usage: '<insert commands>',
  guildOnly: true,
  adminOnly: true,
	execute(message, args) {
		var data = "";
		for(var i = 0; i < args.length; i++) {
			data += args[i];
			data += " ";
		}
		message.channel.send(data);
	},
};
