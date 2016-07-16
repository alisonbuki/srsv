var gamePrompt = require('game-prompt');
var colors = require('colors');

//global vars

var playerName;
var playerInventory = [];
var vehicleName;
var fuelLevel;
var planets = [
	{
		name:'(E)arth', 
		distance:10,
		travel: travelToEarth
	},
	{	
		name:'(M)esnides', 
		distance: 20,
		travel: travelToMesnides
	},
	{	name: '(L)aplides',
		distance: 50,
		travel: travelToLaplides
	},
	{	name: '(K)iyturn',
		distance: 120,
		travel: travelToKiyturn
	},
	{
		name: '(A)enides',
		distance: 25,
		travel: travelToAenides
	},
	{
		name: '(C)ramuthea',
		distance: 200,
		travel: travelToCramuthea
	},
	{
		name: '(S)meon T9Q',
		distance: 400,
		travel: travelToSmeon
	},
 	{
 		name: '(G)leshan 7Z9',
 		distance: 85,
 		travel: travelToGleshan
 	}
];


//Add item to inventory

function addItemToInventory (item) {
	if (playerInventory.indexOf(item) < 0) {
    playerInventory.push(item);
  }
}

//Start game

function startGame() {
	gamePrompt('S.R.S.V. Press ENTER to start', intro);

}

function intro() {
	gamePrompt('You are the captain of a Solo Research Space Vehicle (S.R.S.V.)' +
		' on an expedition to explore foreign planets. Your mission is' + 
		' to make contact with three alien life forms, acquire an artifact' + 
		' representative of their culture, and bring back your findings' + ' to Earth.', collectInfo);
}

function collectInfo(){
	gamePrompt([
		'A voice comes on over the intercom',
		'"Please state your name for identity verification"',
		], collectName);
}

function collectName(name) {
	playerName = name;

	gamePrompt([
		'"Thank you Captain ' + playerName + '."',
		'"Please state your vehicle name for identity verification"'
		], collectVehicleName);
}

function collectVehicleName (name) {
	vehicleName = name;
	fuelLevel = 1000;

	gamePrompt([
		'"Thank you."',
		'' + vehicleName + ' has 1000 gallons of fuel.',
		], whereTo);

}

//navigate

function whereTo () {
	var planetList = '';

	planets.forEach(function(planet){
		planetList+= planet.name + ' ' + '(' + planet.distance + ' lightyears)\n';
	});

	gamePrompt(['You have ' +fuelLevel+ ' gallons of fuel left', '"Where to, Captain ' + playerName + '?"',
		'List: \n' + planetList
		], goToNextPlanet);
}

function goToNextPlanet (destination) {
		var nextPlanet;
		planets.forEach(function(d){
			if (destination.toUpperCase() === d.name.charAt(1)) {
				nextPlanet = d;
			}
		});

		if (!nextPlanet) {
			gamePrompt('sorry, I do not recognize that destination', whereTo);
		}
		else {
			fuelLevel -= nextPlanet.distance;
			if (fuelLevel <= 0) {
				youLose();
			}
		 
		else {
			gamePrompt(['Flying to ' +nextPlanet.name+ ' using ' +nextPlanet.distance+ ' gallons of fuel',
			'you now have ' +fuelLevel+ ' gallons of fuel remaining'], nextPlanet.travel);
		}
	}
}

//Planet functions

function travelToEarth() {
	if (playerInventory.length === 3) {
		gamePrompt('you have collected 3 artifacts', youWin);
	}
	else {
		fuelLevel+=10;
		gamePrompt(['+10 fuel home planet bonus! \n'  
			+ vehicleName + ' has ' +fuelLevel + ' gallons of fuel.',
			'you have not collected enough artifacts'
			], whereTo);
	}

}

//Mesnides
	
function travelToMesnides() {
	gamePrompt([
    'You\'ve arrived at Mesnides. As you land, a representative of the Mesnidian people is there to greet you.',
    '"Welcome, traveler, to Mesnides."',
  	], askMesnides);
}

function askMesnides() {
	 gamePrompt('"How can we assist you?"\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', 
	 	answerMesnides);
}

function answerMesnides(nav) {
	if (nav.toUpperCase() === 'A') {
		addItemToInventory('Myoin Horn');
		gamePrompt([
      '"Here, take this Myoin Horn, an ancient Mesnidian instrument."',
      'Myoin Horn added to your inventory.',
      'You now have ' + playerInventory.length + ' artifact' + (playerInventory.length > 1 ? 's.' : '.')
    ], askMesnides);

	} else if (nav.toUpperCase()=== 'P') {
		gamePrompt('"Well, Laplides suffered from atomic war and has been uninhabited ' +
    'for centuries. You would do well to avoid it on your journey."', askMesnides);

	} else if (nav.toUpperCase() === "L") {
		whereTo();
	}
	else {
		gamePrompt('I\'m sorry traveler, but I don\'t understand your question', askMesnides);
	}
}

//Laplides

function travelToLaplides() {
	gamePrompt([
    'You enter orbit around Laplides. Looking down at the planet, you see ' +
    'signs of atomic war and realize there is no option but to turn around.'
  ], whereTo);

}

//Kiyturn

function travelToKiyturn() {
	gamePrompt(
    'You\'ve arrived at Kiyturn. As you land, a representative of the Kiyturn people is there to greet you.',
    askKiyturn
  );
}

function askKiyturn() {
	 gamePrompt('"Hello, what brings you to Kiyturn? You\'re not here to cause trouble are you?"' +
    '\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', answerKiyturn);
}

function answerKiyturn(nav) {
	if (nav.toUpperCase() === 'A') {
		addItemToInventory('Kiyturn Glass Bowl');
		gamePrompt([
      '"Here, take this Kiyturn Glass Bowl, a symbol of our civilization."',
      'Kiyturn Glass Bowl added to your inventory.',
      'You now have ' + playerInventory.length + ' artifact' + (playerInventory.length > 1 ? 's.' : '.')
    ], askKiyturn);
	} else if (nav.toUpperCase() === 'P') {
		gamePrompt('"I\'m sorry, but we do not leave our planet. The universe, to us, is a beautiful mystery."', askKiyturn);
	} else if (nav.toUpperCase() === 'L') {
		whereTo();
	} else {
    gamePrompt('I\'m sorry traveler, but I don\'t understand your question', askKiyturn);
  }
}


//Cramuthea
function travelToCramuthea() {
	fuelLevel+= 500;

	gamePrompt(
		[
    'You have arrived at Cramuthea.',
    'The planet is abandoned, but it looks like people were here in the not-too-distant past.',
    'You land on the planet and find fuel for your ship. (+500)',
    'You now have ' + fuelLevel + ' gallons of fuel.',
    'You find a beacon signal.',
    'It appears the people that once lived here have migrated to Smeon T9Q.'
  ], whereTo);
}


//Smeon
function travelToSmeon() {
	fuelLevel+=100;

	 gamePrompt([
    'You\'ve arrived at Smeon T9Q. As you land, a representative of the Cramuthean people is there to greet you.',
    '"Welcome to Smeon T9Q."',
    '"The Cramuthean people have lived here since we were forced to leave our home planet 100 years ago."',
    '"The planet was ravaged by droughts, severe weather and foreign invasions."',
    '"We now call Smeon T9Q home."',
    '"You\'ve travelled far, here is some fuel for your journey. (+100)"',
    'You now have ' + fuelLevel + ' gallons of fuel.'
  ], askSmeon);
}

function askSmeon() {
	gamePrompt('"What brings you here?"\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', answerSmeon);
}

function answerSmeon(nav) {
	if (nav.toUpperCase()==='A') {
		addItemToInventory('Cramun Flower');
		gamePrompt([
		'"Here, take this dried Cramun Flower from our home planet."',
      	'Cramun Flower added to your inventory.',
      	'You now have ' + playerInventory.length + ' artifact' + (playerInventory.length > 1 ? 's.' : '.')
    ], askSmeon);
	} else if (nav.toUpperCase()==='P'){
		gamePrompt([
      '"The people of Aenides once tried to take over our home planet by force."',
      '"We fended them off, but they are an aggresive people to be avoided.'
    ], askSmeon);
	} else if (nav.toUpperCase()==='L') {
		whereTo();
	} else {
		gamePrompt('I\'m sorry traveler, but I don\'t understand your question', askSmeon);
	}
}

//Gleshan

function travelToGleshan() {
	gamePrompt([
    'You\'ve arrived at Gleshan 7Z9. As you land, a representative of the Gleshan people is there to greet you.',
    '"Welcome to our humble planet Gleshan 7Z9."',
  ], askGleshan);

}

function askGleshan() {
	gamePrompt('"How can we be of service?"\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', answerGleshan);
}

function answerGleshan(nav) {
	if (nav.toUpperCase()==='A') {
		gamePrompt(
      '"I\'m sorry, but we are a poor planet and it is against our custom to part with our precious artifacts."',
      askGleshan);
	} else if (nav.toUpperCase()==='P') {
		gamePrompt([
      '"We were once friends with the people of Cramuthea, but it has been years since we have heard from them."',
      '"They are a friendly and generous people."'
    ], askGleshan);
	} else if (nav.toUpperCase()==='L') {
		whereTo();
	} else {
		gamePrompt('I\'m sorry traveler, but I don\'t understand your question', askGleshan);
	}
}


//Aenides

function travelToAenides() {
	gamePrompt([
    'You\'ve arrived at Aenides. As you try to land, the people begin firing on your ship.',
    'You narrowly avoid disaster, but are forced to turn around.'
  ], whereTo);

}


// hashtag winning

function youWin() {
	gamePrompt(['Congrats, ' +playerName +' you are a superior interstellar ambassador!', '***YOU WIN***'.blue]);
}

function youLose() {
	gamePrompt('srry try again :('.red);
}


startGame();




