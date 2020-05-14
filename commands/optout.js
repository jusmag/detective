module.exports = {
	name: 'optout',
	description: 'Admin only: put the name of the person and then if you are opting out or back in',
  args: true,
  usage: '<firstname> <lastname> <in/out>',
  guildOnly: true,
  adminOnly: true,
	execute(message, args) {
    fs.writeFile(path.resolve(__dirname, './data/ignore.txt'), 'Hello World!');
	},
};
