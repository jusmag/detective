var fs = require('fs');
var path = require('path');
module.exports = {
	name: 'info',
	description: 'Get info on person',
  args: true,
  usage: '<firstname> <lastname>',
  guildOnly: false,
  adminOnly: false,
	execute(message, args) {
		let data = "";
		let firstNames = (fs.readFileSync(path.resolve(__dirname, './data/firstnames.txt'), 'utf-8')).split(",");
		let lastNames = (fs.readFileSync(path.resolve(__dirname, './data/lastnames.txt'), 'utf-8')).split(",");
		let middleNames = (fs.readFileSync(path.resolve(__dirname, './data/middlenames.txt'), 'utf-8')).split(",");
		let cont = -1;
		let optout = (fs.readFileSync(path.resolve(__dirname, './data/optout.txt'), 'utf-8')).split(",");
		for(let i = 0; i < firstNames.length; i++) {
			if(optout[i] == "out") {
				break;
			}
			// console.log(firstNames[i]);
			// console.log(args[0]);
			// console.log(lastNames[i]);
			// console.log(args[1]);
		  if(args[0].toLowerCase() == firstNames[i].toLowerCase()) {
				if(args[1].toLowerCase() == lastNames[i].toLowerCase()) {
				  data += firstNames[i];
				  data += " ";
				  data += middleNames[i];
				  data += " ";
				  data += lastNames[i];
				  message.channel.send(data);
				  cont = i;
					break;
				} else {
					message.channel.send("Maybe you meant " + firstNames[i] + " " + lastNames[i] + "?");
				}
		  }
			if(args[1].toLowerCase() == lastNames[i].toLowerCase()) {
				if(args[0].toLowerCase() == firstNames[i].toLowerCase()) {
				  data += firstNames[i];
				  data += " ";
				  data += middleNames[i];
				  data += " ";
				  data += lastNames[i];
				  message.channel.send(data);
				  cont = i;
					break;
				} else {
					message.channel.send("Maybe you meant " + firstNames[i] + " " + lastNames[i] + "?");
				}
		  }
		}
		let numbers = (fs.readFileSync(path.resolve(__dirname, './data/numbers.txt'), 'utf-8')).split(",");
		let grades = (fs.readFileSync(path.resolve(__dirname, './data/grades.txt'), 'utf-8')).split(",");
		let schools = (fs.readFileSync(path.resolve(__dirname, './data/schools.txt'), 'utf-8')).split(",");
		if(cont > -1) {
		  data = "";
		  data += ("```Number: " + numbers[cont]);
		  data += ("\nGrade: " + grades[cont]);
		  data += ("\nHigh School: " + schools[cont]);
		  data += ("```");
		  data += "\nIf any details here are inaccurate, please contact the admin.";
		  message.channel.send(data);
		} else {
		  message.channel.send("No such person exists in our database. If you believe this is an error, contact the admin.");
		}
  },
};
