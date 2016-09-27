var alexa = require('alexa-utils');
const PORT = process.env.PORT || 8080;

var app = alexa.app("Parrot")
	.onLaunch(function(req, res) {
		res.prompt("<speak>Transforming into a parrot. <p>squawk squawk</p> I am now a parrot. What would you like me to say?</speak>")
			.reprompt("What would you like your pet parrot to do?")
			.endSession(false)
			.send();
	})
	.onIntent("RepeatPhrase", function(req, res) {
		var phrase = req.intent.slot("phrase");

		if (phrase) {
			res.prompt("<speak>" + phrase + " <p>What else do you want to say?</p></speak>")
				.endSession(false)
				.send();
		} else {
			res.prompt("I didn't quite hear what you wanted me to say or repeat. Could you repeat your command again?")
				.endSession(false)
				.send();
		}
	})
	.onIntent("ExitSession", function (req, res) {
		res.prompt("<speak>Transforming back into an Echo. <p>squawk squawk</p> Goodbye!</speak>")
			.endSession(true)
			.send();
	})
	.onIntent("AMAZON.StopIntent", function(req, res) {
		res.prompt("All right, goodbye!").endSession(true).send();
	})
	.onIntent("AMAZON.CancelIntent", function(req, res) {
		res.prompt("All right, goodbye!").endSession(true).send();
	})
	.onIntent("AMAZON.HelpIntent", function(req, res) {
		var prompt = "You can ask me to repeat or say a phrase followed by the phrase you provide. You can also say stop or cancel if you are done.";
		res.prompt(prompt).endSession(false).send();
	})
	.onSessionEnd(function(req, res) {
		res.prompt("<speak>Transforming back into an Echo. <p>squawk squawk</p> Goodbye!</speak>")
			.endSession(true)
			.send();
	})
	.host("/parrot", PORT, false);

console.log("Server started on port " + PORT);