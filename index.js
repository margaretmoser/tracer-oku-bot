
var express = require('express');
const PORT=8080;
var app = express();

var tracery = require('tracery-grammar');


// var grammar = tracery.createGrammar({
// 	"name": ["Arjun","Yuuma","Darcy","Mia","Chiaki","Izzi","Azra","Lina"]
// ,	"animal": ["unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten"]
// ,	"occupationBase": ["wizard","witch","detective","ballerina","criminal","pirate","lumberjack","spy","doctor","scientist","captain","priest"]
// ,	"occupationMod": ["occult ","space ","professional ","gentleman ","erotic ","time ","cyber","paleo","techno","super"]
// ,	"strange": ["mysterious","portentous","enchanting","strange","eerie"]
// ,	"tale": ["story","saga","tale","legend"]
// ,	"occupation": ["#occupationMod##occupationBase#"]
// ,	"mood": ["vexed","indignant","impassioned","wistful","astute","courteous"]
// ,	"setPronouns": ["[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"]
// ,	"setSailForAdventure": ["set sail for adventure","left #heroTheir# home","set out for adventure","went to seek #heroTheir# forture"]
// ,	"setCharacter": ["[#setPronouns#][hero:#name#][heroJob:#occupation#]"]
// ,	"openBook": ["An old #occupation# told #hero# a story. 'Listen well' she said to #hero#, 'to this #strange# #tale#. ' #origin#'","#hero# went home.","#hero# found an ancient book and opened it.  As #hero# read, the book told #strange.a# #tale#: #origin#"]
// ,	"story": ["#hero# the #heroJob# #setSailForAdventure#. #openBook#"]
// ,	"origin": ["Once upon a time, #[#setCharacter#]story#"]

// });

grammar = tracery.createGrammar({
	"subjectOption": ["foreign policy", "the economy"],
	"setSubject": ["[subject:#subjectOption#]"],
	"badState": ["North Koreans", "Iran", "Japan"],
	"badThing": ["Department of Environmental", "treaties", "racial division"],

	"badThingConjugate": ["bad deal", "raw deal"],

	"goodThing": ["better deal"],
	"goodAdj": ["tremendous"],
	"badAdj": ["terrible", "horrible"],
	"adverb": ["tremendously", "really", "just"],
	"interjectionPhrase": ["I think", "and by the way", "I should tell you",
												 "I also think","it's incredible","you know",
												 "look","I mean", "because frankly, what I’m saying is",
												 "and", "you have to say"],

	"interjection": ["#interjectionPhrase#"],

	"criticismNegStart": ["we never should have"],
	"criticismPosStart": ["we should have", "we should have gone in and",],


	"criticism": ["#criticismNegStart# #assertionVerbNeg#d the #goodThing#. So I wouldn't have done that",
								"#criticismNegStart# #assertionVerbPos#d the #badThing#. I would not do that",
								"#criticismPosStart# #assertionVerbPos#d the #badThing##criticismPosEnd#"],

	"criticismPosEnd":["","","",". And that has not happened. Just has not happened",". We shouldn’t be allowing that to happen"],

	"assertionStart": ["I can", "I will", "we need to", "I know how to","you have to"],

	"assertionVerbNeg": ["eliminate","renegotiate"],
	"assertionVerbPos": ["negotiate"],

	"assertion": ["#assertionStart# #assertionVerbNeg# the #badThing#",
								"it's a #badThingConjugate#",
								"there’s a #badThing# that’s incredible actually in the country",
								"#assertionStart# #assertionVerbPos# the #goodThing#",
								"I’d create incentives for companies to move in",
								"but at the same time it can be solved to a large extent with jobs",
								"but if we can create jobs, it will solve so many problems",
								"I‘ve been, you know, I’ve been doing things for a long time",
								"I see it all the time",
								"I see it so often",
								"this is something I know a lot about, #subject#",
								"I know a lot about #subject#"
								],
	"description": ["it's #adverb#, #adverb# #badAdj#","it's a #badThingConjugate#"],
	"complaint": ["I've been treated very, very badly",
								"they want our money, but they don’t want us",
								"we have lost millions and millions of jobs to China and other countries",
								"there are no jobs. There are none",
								"it is a very sad situation"
								],
	"phrase": ["#assertion#",
							 "#criticism#",
							 "#assertion#",
							 "#criticism#",
							 "#description#, #interjection#, #assertion#",
							 "#description#",
							 "#interjection#, #phrase#",
							 "#interjection#, #interjection# #phrase#",
							 "#complaint#",
							 "#interjection# there's tremendous unemployment, tremendous"],
	"sentence": ["#phrase.capitalize#."]

});

grammar.addModifiers(tracery.baseEngModifiers); 

app.get('/', function (request, response){
	var speech = "Okay, "+grammar.flatten('#[#setSubject#]subject#'+".");
	for (var i=0; i<10; i++) {

		speech += grammar.flatten('#sentence#');
	}

    response.send(speech);
})



app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});



