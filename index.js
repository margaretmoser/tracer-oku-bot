
var express = require('express'),
	mustacheExpress = require('mustache-express'),
	_ = require('underscore');


const PORT=3000;
var app = express();
	app.engine('html', mustacheExpress());
	app.set('view engine', 'html');
	app.set('views', __dirname + '/html');
	app.use(express.static(__dirname + '/public'));




var tracery = require('tracery-grammar');



grammar = tracery.createGrammar({

	"subjectOption": ["foreign policy", "the economy", "society", "process"],
	// "setSubject": ["[subject:#subjectOption#]"],
	"setSubject": ["[statement:#foreignPolicyStatement#]",
					["statement:#processStatement#"],
					["statement:#societyStatement#"],
					["statement:#economyStatement#"]
				],


	"foreignPolicyStatement": [
		"we have to get rid of ISIS, okay, just so — we have to get rid of ISIS",
		"I will be so good at the military, your head will spin",
		"I say the global warming that we have to be careful of is the nuclear global warming",
		"the Mexican government is forcing their most unwanted people into the United States",
		"I think I will get along with Putin, and I will get along with others, and we will have a much more stable world",
		"the career diplomats who got us into many foreign policy messes say I have no experience in foreign policy." +
			" They think that successful diplomacy requires years of experience and an understanding of all the nuances " +
			"that have been carefully considered before reaching a conclusion",
		"why are we always the one that’s leading, potentially the third world war, okay, with Russia?",
		"why are we always at the forefront of everything?",
		"look, I see NATO as a good thing to have",
		"now I would go in and I would structure a much different deal with them, and it would be a much better deal",
		"I always say we have to be unpredictable. We’re totally predictable.  And predictable is bad",
		"I know China very well, because I deal with China all the time",
		"I don’t like to tell you what I’d do, because I don’t want to…"
	],

	"processStatement" : [
		"and these protesters are honestly, they’re very bad people. In many cases, they’re professionals. Highly trained professionals",
		"I have used the bankruptcy laws a few times to make deals better",
		"we don’t condone violence at all but it’s very, very unfair reporting and we, you know…",
		"the final key to the way I promote is bravado. I play to people's fantasies"
	],

	"societyStatement": [
		"I condone strong law and order",
		"there’s a racial division that’s incredible actually in the country"
	],

	"economyStatement": [
		"I will be the greatest jobs president that God ever created",
		"I’d create incentives for companies to move in",
		"I will bring jobs back from China. I will bring jobs back from Japan. I will bring jobs back from Mexico. I will bring jobs back from Vietnam",
		"they want our money, but they don’t want us",
		"we have lost millions and millions of jobs to China and other countries",
		"there are no jobs. There are none",
	],

	"badState": ["North Koreans", "Iran", "Japan"],
	"badThing": ["Department of Environmental", "treaties", "racial division"],

	"badThingConjugate": ["bad deal", "raw deal"],

	"goodThing": ["better deal"],
	"goodAdj": ["tremendous"],
	"badAdj": ["terrible", "horrible"],
	"adverb": ["tremendously", "really", "just"],
	"interjectionPhrase": ["I think", "and by the way", "I should tell you", "I",
												 "I also think","it's incredible","you know",
												 "look","I mean", "because frankly, what I’m saying is",
												 "and", "you have to say", "what I would do, what I would do is I’d –",
												 "based on, based on everything I’ve seen and watched and everything else",
												 "what I am referring to is", "again"],

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
								"#assertionStart# #assertionVerbPos# the #goodThing#",
								"but at the same time it can be solved to a large extent with jobs",
								"but if we can create jobs, it will solve so many problems",
								"I‘ve been, you know, I’ve been doing things for a long time",
								"I see it all the time",
								"I see it so often",
								"this is something I know a lot about, #subject#",
								"I know a lot about #subject#",
								"and I’ve been very good on this stuff",
								"my prognostications, my predictions have become, have been very accurate, if you look",
								"I have a very good brain and I've said a lot of things"
								],

	"description": ["it's #adverb#, #adverb# #badAdj#","it's a #badThingConjugate#"],
	"complaint": [				"I've been treated very, very badly",
								"the world is a horrible place",
								"you have to protect yourself in life",
								"people try to kill you mentally, especially if you're on top",
								"it is a very sad situation",
								"I’ve had stories written about me",
								"I had a nice life until I did this, you know. This is a very difficult thing to do",
								"as far as the individual players, of course I don't know them",
								"we will have so much winning if I get elected that you may get bored with winning",
								"I mean, I do a good job. I have thousands of employees. I work hard",
								"I’m a very rational person, I’m a very sane person"
								],

	"phrase": [				"#assertion#",
							 "#criticism#",
							 "#assertion#",
							 "#criticism#",
							 "#description#, #interjection#, #assertion#",
							 "#description#",
							 "#interjection#, #phrase#",
							 "#interjection#, #interjection# #phrase#",
							 "#complaint#",
							 "#interjection# there's tremendous unemployment, tremendous"],
	"sentence": ["#phrase.capitalize#.  "],

	"closingRemark": [
		"she kills me, this one – that’s okay, nice woman",
		"I really hope I answered your question, beautiful."
	]

});

grammar.addModifiers(tracery.baseEngModifiers);


app.get('/', function(request, response) {

	var speech = {};
	speech.paras = [];
	// speech.paras.push(
	// 	{   "content" : "Okay, "+grammar.flatten('#[#setSubject#]subject#'+". ")  }
	// );

	grammar.flatten('#[#setSubject#]subject#'+". ");

	var content;

	for (var i=0; i<10; i++) {
		content = "";

		for (var j=0; j<5; j++) {
			content += grammar.flatten('#sentence#');
		}
		speech.paras.push(
			{   "content" :  content  }
		);

	}

	speech.paras.push(
		{	"content":  grammar.flatten('#closingRemark#')  }
	);

    response.render('index', {
    		speech: speech
    });
});

app.listen(PORT || 3000, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});



