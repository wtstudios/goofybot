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
    " increased my goofy power by a factor of " + (Math.round(Math.random * 10))
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
    ". END OF PART "
  ]
];

let usersTyping = [];

let timer = 0;

let sendStoryTimer = setInterval(function() {
  timer++;
  if (timer > 6) {
    client.channels.cache.get('1186413724588855451').send(newGoofyStory());
    timer = 0;
  }
}, 10000);

function newGoofyStory() {

  console.log("Goofy story has been shared with the world.");

  /*if (ciqlJson.open("stats.json").data.goofystoriestold + 1 > 10000) {
    return "Hi everyone, the goofy story writing association is taking a little break before season 2, so stay hyped! Shoutout to mrlilgoofy and wet takis!";
  } else if (ciqlJson.open("stats.json").data.goofystoriestold + 1 == 10000) {
    ciqlJson.open("stats.json")
      .set("goofystoriestold", ciqlJson.open("stats.json").data.goofystoriestold + 1)
      .save();
    return "10000th GOOFY STORY SPECIAL: so i was on my way to the goofy ice cream parlour when my goofy goober uncle drove into me with his goofy 16 wheel automobile so i threw a goofy pickle at the windshield but then a goofy little hampster tried to bite me so i went to the SHADOW GOVERNMENT HEADQUARTERS and ordered the immediate arrests of 150 goofy journalists. goofy senators and lawmakers are plotting the economic downfall of goofy america. fight back. fight back. goofy. fight back. fight back against the goofy undermining of a healthy and stable economy. modern ingsoc. I LOVE FAT MEN. END OF PART 10000 OF THE GOOFY STORIES. TO BE CONTINUED?..?.";
  } else {*/
  let sentence = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i][Math.floor(Math.random() * words[i].length)];
    sentence = sentence.concat(word);
  }
  ciqlJson.open("stats.json")
    .set("goofystoriestold", ciqlJson.open("stats.json").data.goofystoriestold + 1)
    .save();
  sentence = sentence.concat(ciqlJson.open("stats.json").data.goofystoriestold + " OF THE GOOFY STORIES. TO BE CONTINUED?..?.");
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
    .get("1163086461415993354")
    .commands.set(cmds);
});


// Bot Login
console.log(process.env['DISCORD_BOT_SECRET']);
client.login(process.env['DISCORD_BOT_SECRET']);
keepAlive();