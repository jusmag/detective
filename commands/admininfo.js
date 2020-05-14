let fs = require('fs');
let path = require('path');
module.exports = {
	name: 'admininfo',
	description: 'Get info (possibly more than you could ever need...)',
	args: true,
	usage: '<firstname> <lastname>',
	guildOnly: false,
	adminOnly: true,
	execute(message, args) {
		let data = "";
		var firstNames, middleNames, lastNames;

		firstNames = (fs.readFileSync(path.resolve(__dirname, './data/firstnames.txt'), 'utf-8')).split(",");
		middleNames = (fs.readFileSync(path.resolve(__dirname, './data/middlenames.txt'), 'utf-8')).split(",");
		lastNames = (fs.readFileSync(path.resolve(__dirname, './data/lastnames.txt'), 'utf-8')).split(",");

		let cont = -1;

		for(let i = 0; i < firstNames.length; i++) {
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

		var numbers, grades, schools, ages, months, years, elems;

		numbers = (fs.readFileSync(path.resolve(__dirname, './data/numbers.txt'), 'utf-8')).split(",");
		grades = (fs.readFileSync(path.resolve(__dirname, './data/grades.txt'), 'utf-8')).split(",");
		schools = (fs.readFileSync(path.resolve(__dirname, './data/schools.txt'), 'utf-8')).split(",");
		ages = (fs.readFileSync(path.resolve(__dirname, './data/ages.txt'), 'utf-8')).split(",");
		months = (fs.readFileSync(path.resolve(__dirname, './data/birthmonths.txt'), 'utf-8')).split(",");
		years = (fs.readFileSync(path.resolve(__dirname, './data/birthyears.txt'), 'utf-8')).split(",");
		elems = (fs.readFileSync(path.resolve(__dirname, './data/elems.txt'), 'utf-8')).split(",");

		if(cont > -1) {
		  data = "";
		  data += ("```Number: " + numbers[cont]);
		  data += ("\nGrade: " + grades[cont]);
		  data += ("\nHigh School: " + schools[cont]);
		  data += ("\nAge: " + ages[cont]);
		  data += ("\nBirth Month: " + months[cont]);
		  data += (" " + years[cont]);
		  data += ("\nElementary School: " + elems[cont]);
		  data += ("```");
		  data += "\nIf any details here are inaccurate, please contact the admin.";
		  message.channel.send(data);
		} else {
		  message.channel.send("No such person exists in our database. If you believe this is an error, contact the admin.");
		}

	},
};
