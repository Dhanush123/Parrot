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
		res.prompt(req.intent.slot("phrase")).send();
	})
	.onIntent("AMAZON.StopIntent", function(req, res) {
		res.endSession(true).send();
	})
	.onIntent("AMAZON.CancelIntent", function(req, res) {
		res.endSession(true).send();
	})
	.onIntent("AMAZON.HelpIntent", function(req, res) {
		var prompt = "You can ask me to repeat or say a phrase followed by the phrase you provided. You can also say stop or cancel if you are done.";
		res.prompt(prompt).endSession(false).send();
	})
	.onSessionEnd(function(req, res) {
		res.prompt("<speak>Transforming back into an Echo. <p>kwauqs kwauqs</p> Goodbye!</speak>").send();
	})
	.host("/parrot", PORT, false);

console.log("Server started on port " + PORT);