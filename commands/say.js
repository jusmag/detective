var fs = require('fs');
var path = require('path');

module.exports = {
	name: 'say',
	description: 'Will repeat what ever message is fed in',
  args: true,
  usage: '<insert commands>',
  guildOnly: true,
  adminOnly: false,
	execute(message, args) {
		var data = "";
	 	var blacklist = (fs.readFileSync(path.resolve(__dirname, './data/blacklist.txt'), 'utf-8')).split(",");
		for(var i = 0; i < args.length; i++) {
			for(var j = 0; j < blacklist.length; j++) {
				if(args[i].toLowerCase() == blacklist[j].toLowerCase()) {
					message.channel.send("Nice try. Found a blacklisted word: " + blacklist[j]);
					return;
				}
			}
			data += args[i];
			data += " ";
		}
		message.channel.send(data);
	},
};
