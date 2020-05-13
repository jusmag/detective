module.exports = {
  name: 'args-info',
  description: 'Info about arguments',
  args: true,
  usage: '<args>',
  guildOnly: true,
  adminOnly: false,
  execute(message, args) {
    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  }
}
