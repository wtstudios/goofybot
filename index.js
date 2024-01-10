// Requirements and Variables
require('dotenv').config();
const keepAlive = require(`./server`);
const { Client } = require('discord.js');
const client = new Client({ intents: 32767 });

const ciqlJson = require("ciql-json");

let objects = [
  " tube of toothpaste",
  " jar of pickles",
  " slice of cheese",
  " banana peel",
  " cockroach",
  " kangaroo",
  " rat",
  " dead squirrel",
  " peanut butter and jelly sandwich",
  " corndog",
  "n eggplant",
  " bus",
  " brick",
  " bush",
  " tree",
  " rock",
  " plastic bag of dirt",
  " broom",
  " dirty sock",
  " bottle of lemon juice",
  " frog",
  " disabled bus driver",
  " glass of orange juice",
  " stack of pancakes",
  " baseball bat",
  " carrot",
  " toothbrush",
  " cucumber",
  " sausage",
  " soft tomato",
  " dinosaur"
];
let words = [
  [
    "so i was",
    "one time i was"
  ],
  [
    " walking",
    " sitting",
    " standing",
    " eating my goofy breakfast",
    " sleeping"
  ],
  [
    " at a supermarket",
    " in the dining room",
    " in a fridge store",
    " inside a package of vegan sausages",
    " in my grandma's bathtub",
    " in your grandma's bathtub",
    " in a pool",
    " in the park",
    " in a tree",
    " in a sewer",
    " on a highway",
    " in a tunnel",
    " in a dumpster",
    " in the forest"
  ],
  [
    " when i"
  ],
  [
    " slipped on a",
    " saw a",
    " ate a",
    " sat on a",
    " tripped on a",
    " started getting packed by a",
    " fell on a"
  ],
  objects,
  [
    " and then a"
  ],
  objects,
  [
    " threw a",
    " jumped on top of a",
    " grabbed a",
    " started packing a",
    " whimsically slapped a"
  ],
  objects,
  [
    " so i"
  ],
  [
    " flew up in the air",
    " killed my grandpa",
    " started to run",
    " microwaved a porcupine",
    " increased my goofy power greatly"
  ],
  [
    " and then a"
  ],
  objects,
  [
    " threw me in the air",
    " flew up in the air",
    " started goofily roasting me"
  ],
  [
    " so then i",
    " but then i",
    " then i"
  ],
  [
    " fucking punched a",
    " packed a",
    " sat on a",
    " spat on a"
  ],
  objects,
  [
    " but then a",
    " and then a"
  ],
  objects,
  [
    " tripped on a",
    " slipped on a",
    " ate a",
    " got eaten by a"
  ],
  objects,
  [
    " so then i",
    " so i",
    " then i",
    " and then i"
  ],
  [
    " got on a",
    " took a"
  ],
  [
    " goofy disabled bus",
    " flying house",
    " goofy flying bus",
    " goofy flying rat",
    " flying rat",
    " goofy unicycle",
    " piggyback ride on a goofy homeless person"
  ],
  [
    " and went to the"
  ],
  [
    " sewers",
    " mall",
    " oven store",
    " highway",
    " pool",
    " underground parking lot"
  ],
  [
    ". END OF THIS GOOFY STORY. WRITTEN BY THE GOOFY BOT STORY WRITING COUNCIL + EXECUTIVE PRODUCER TAKIS. CHAPTER 2"
  ]
];

let usersTyping = [];

let timer = 0;

let sendStoryTimer = setInterval(function() {
  timer++;
  if (timer > 30) {
    client.channels.cache.get('1186413724588855451').send(newGoofyStory());
    timer = 0;
  }
}, 10000);

function newGoofyStory() {
  console.log("Goofy story has been shared with the world.");
  let sentence = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i][Math.floor(Math.random() * words[i].length)];
    sentence = sentence.concat(word);
  }
  return sentence;
  //}
}

// Array of Command objects
const cmds = [{
  name: `goofystory`, // Command name
  description: `Tells you a goofy story.`, // Command description
  async execute(interaction) { // Execute function
    interaction.reply({
      content: newGoofyStory()
    });
  }
}];

// Interaction Create Event
client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    await cmds.forEach(async command => {
      if (interaction.commandName == command.name) {
        try {
          await command.execute(interaction);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
});


// Ready Event
client.on('ready', async () => {
  console.log(`GoofyBot is now online successfully!`);
  client.user.setActivity("Writing Goofy Stories");
  await client.guilds.cache
    .get("1186413724588855448")
    .commands.set(cmds);
});


// Bot Login
client.login(process.env['bot_token']);
keepAlive();
