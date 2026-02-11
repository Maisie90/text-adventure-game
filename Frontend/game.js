// Game state
let state = {
  memory: 0,
  chocolate: false,
  doughnut: false,
  ring: false,
  visited: {
    gardens: false,
    berties: false,
    kitchen: false
  }
};

// DOM elements
const storyDiv = document.getElementById('story');
const choicesDiv = document.getElementById('choices');
const inventoryDiv = document.getElementById('inventory');

// Update inventory
function updateInventory() {
  let items = [];
  if(state.chocolate) items.push("Chocolate");
  if(state.doughnut) items.push("Doughnut clue");
  if(state.ring) items.push("Engagement ring");
  if(state.cider) items.push("Cider");
  inventoryDiv.textContent = "Inventory: " + (items.length ? items.join(", ") : "Nothing yet");
}

// Game passages
const passages = {
  start: {
    text: ` <h1> The Case of the Missing Ring </h1>
    The rain tapped the windows like it had a vendetta against everything soft and sentimental. 
My office smelled of stale decaf coffee, chocolate wrappers, and something faintly like… victory? I couldn’t tell.

Across from me, my assistant—small, serious, suspiciously perceptive—was lining up toy cars across the desk.

“This case is big,” he said, making engine noises.

“I’ll believe it when it pays in chocolate,” I muttered.

He looked at me like I’d just insulted his mother. 

“Detective,” he said, “rings are missing. And some memories might be too.”

This kind of case should be simple: find the missing ring. But something told me it would get complicated.`,
    choices: [
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
      { text: "Ask about the Case", action: () => goTo('askCase') },
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') }
    ]
  },
  examineFiles: {
    text: `The files are organized in a way that makes sense only to a toddler—or a criminal mastermind pretending to be one.

Missing Ring is in a manila folder, with dinosaur stickers covering the bottom corner.

Doughnut Dispute has sticky fingerprints.

The Vanishing of the Chocolate Milk is under “Priority: High.”`,
    choices: [
      { text: "Take the files and start the investigation", action: () => goTo('investigationSetup') },
      { text: "Ask about the Case", action: () => goTo('askCase') },
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') }
    ]
  },
  askCase: {
    text: `Killian leans forward.

“Someone took something precious,” he says. “Rings. Memories. Chocolate. Mostly the ring.”

“Who?” you ask.

Killian shrugs. “Could be anyone.”`,
    choices: [
      { text: "Start the investigation", action: () => goTo('investigationSetup') },
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') }
    ]
  },
  askAssistant: {
    text: `“My name is Killian,” he says. “But you can call me Kili. I love vehicles of all kinds, and chocolate muffins, chocolate biscuits, chocolate sandwiches...also, 8.”`,
    choices: [
      { text: "Start the investigation", action: () => goTo('investigationSetup') },
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
      { text: "Ask about the Case", action: () => goTo('askCase') }
    ]
  },
  investigationSetup: {
    text: `Once you’ve poked at your desk enough, Killian clears his throat:
“Here’s the deal. Someone has taken the ring.”

“Just the ring?” you ask.

Killian sighs “She walked in here devastated. The ring was given to her by the love of her life and right now, it’s the only thing she has of him. But it’s not the only thing that’s missing…”

Confused, you try to prompt Killian further. “So… what else is missing?”

“It’s… complicated. I can’t really give you any more information than this.” Killian slides a file across the desk. A map of locations:

- The Hill Garden and Pergola
- Bertie’s Bar
- A familiar looking Kitchen. 

“Follow the trail, Detective,” he says.
“Solve the case. Remember.”
He looks at you with tiny seriousness.
“Also… chocolate may be involved.”`,
    choices: [
      { text: "Go to The Hill Garden and Pergola", action: () => goTo('gardens') },
      { text: "Go to Bertie’s Bar", action: () => goTo('berties') },
      { text: "Investigate kitchen food clues", action: () => goTo('kitchen') }
    ]
  },
  gardens: {
    text: () => {
      state.visited.gardens = true;
      let txt = `<h2> The Hill Gardens and Pergola </h2>
      
      The rain had slowed to a polite drizzle as you arrived at The Hill Garden and Pergola.

Wooden arches loomed overhead, twisting vines like they were gossiping.

Something about this place felt… familiar. Not crime scene familiar. Memory familiar.

Killian zoomed his toy spitfire in the air.

“This is where something important happened. Not crime. Love. But still dangerous.”`;
      if(state.memory > 1) txt += "\nKillian whispers: 'Detective, you've been here before, but the memory's clearer now.'";
      return txt;
    },
     
    choices: [
      { text: "Search the bushes", action: () => { state.memory++; goTo('gardenBushes'); } },
      { text: "Reflect quietly", action: () => { state.memory++; goTo('gardenReflect'); } },
      { text: "Ask Killian what’s important", action: () => goTo('gardenAsk') }
    ]},
  gardenBushes: { 
    text: `You part the leaves and find… nothing. Well, except a small puddle of chocolate you didn’t remember hiding there.

Killian: “Detective, sometimes clues are metaphorical. Sometimes they’re melted chocolate.”`, 
choices: [
  { text: "Keep the chocolate and take a moment to reflect", action: () => { state.chocolate = true; state.memory++; goTo('gardenReflect'); } },
  { text: "Ignore the chocolate clue", action: () => goTo('investigationContinue') }
]
  },
gardenReflect: {
  text: `You sit on a bench, letting the rain wash over you. The scent of wet earth and flowers fills the air.

As you close your eyes, a memory surfaces: laughter, a hand held, the sparkle of...something precious.`,
  choices: [
    { text: "Hold onto the memory", action: () => { state.memory++; goTo('gardenMemory'); } },
    { text: "Push the memory away", action: () => goTo('investigationContinue') }
  ]
},
gardenMemory: {
  text: `The memory is hazy, but you can make out a figure standing over someone kneeling in the rain, holding something small and shiny. 
  The figure looks up, and for a moment, you see those sea-green eyes and hear laughter on the wind. 
  But then it’s gone, replaced by a flash of chocolate and a whisper: “Remember.”`,
  choices: [  
    { text: "Search the bushes", action: () => { goTo('gardenBushes'); } },
    { text: "Ask Killian what’s important", action: () => goTo('gardenAsk') },
    { text: "Move on", action: () => goTo('investigationContinue') }
  ]
},
 gardenAsk: {
  text: `You turn to Killian, hoping for a hint about what’s so important about the gardens.

  Killian sighs dramatically.

“I can’t tell you, Detective. It’s too important. You have to find it yourself.”`,
choices: [
  { text: "Press Killian for more information", action: () => goTo('moreInformation') }, 
  { text: "Accept the mystery and keep investigating", action: () => goTo('investigationContinue') }
]
 },
 moreInformation: {
  text: `Killian looks at you, a mix of frustration and amusement in his eyes.
“Fine,” he says. “The gardens are where something big happened. It’s not just a clue location. It’s… personal. But that’s all I can say.”`,
choices: [
  { text: "Search the bushes", action: () => { goTo('gardenBushes'); } },,
  { text: "Accept the vague information and keep investigating", action: () => goTo('investigationContinue') }
]
 },
  berties: {
    text: () => {
      state.visited.berties = true;
      let txt = `<h2> Berties Bar </h2>
      Bertie’s bar smelled like cigarette smoke and Kraken Rum memories that seemed familiar.

A jukebox in the corner played music that you remember hearing before.

A table in the corner triggered a feeling in you. Your head starts to pound.`;
      if(state.memory > 1) txt += "\nKillian smirks: 'Detective, déjà vu? Or just clever planning?'";
      return txt;
    },
    choices: [
      { text: "Inspect the table", action: () => { state.memory++; goTo('bertiesTable'); } },
      { text: "Ask bartender for clues", action: () => { state.memory++; goTo('bertiesBartender'); } }
    ]
  },
  bertiesTable: {
    text: `You see a half-finished Stowford Press cider, diet coke and Nando’s receipt balled up on the table. 

An eerie feeling of Deja-Vu creeps over you. 

“Have I been here before?”`,
    choices: [
      { text: "Take a photo", action: () => { state.memory++; goTo('investigationContinue'); } },  
      { text: "Finish the cider and order another from the bartender", action: () => goTo('bertiesBartender') }
    ]
  },
  bertiesBartender: {
    text: `The bartender looks at you with a mix of sympathy and suspicion.
“You look like you’ve seen a ghost,” he says. “Or maybe just a memory. You’re not the first one to come in here looking for something they can’t quite remember.”`,
    choices: [
      { text: "Ask about the memory", action: () => goTo('bartenderMemory') },  
      { text: "Wander over to the Jukebox", action: () => { state.memory++; goTo('jukebox'); } },
      { text: "Leave and continue on elsewhere", action: () => goTo('investigationContinue') }
    ]
  },
  bartenderMemory: {    
    text: `The bartender leans in, lowering his voice.
“Some people come in here looking for memories. They say they can’t remember something important, but they know it’s connected to this place. They say they feel like they’ve been here before, even if they haven’t. I always find listening to music helps me sort things out”`,
    choices: [
      { text: "Order a cider and wander over to the Jukebox", action: () => { state.cider = true; state.memory++; goTo('jukebox'); }  },  
      { text: "Leave and continue on elsewhere", action: () => goTo('investigationContinue') }
    ] 
  },  
  jukebox: {
    text: `You approach the jukebox, and as you scroll through the songs, two in particular catch your eye.`,
    choices: [
      { text: "Play 'La Vie En Rose' ", action: () => { state.memory++; goTo('jukeboxRose'); } },
      { text: "Play 'Girl from Ipanema'", action: () => goTo('jukeboxIpanema') }
    ]
  },
  jukeboxRose: {
    text: `As the first notes of 'La Vie En Rose' fill the bar, a wave of nostalgia hits you.

You remember a moment by the sea, a dance in the kitchen and a ring that sparkled like the stars. 

"I love this song," you whisper, feeling the memory wash over you. The scent of salt air and chocolate fills your senses.

Suddenly, you hear a whisper in your ear <emphasis>"I love you Myles"</emphasis>.

Killian looks at you with a knowing smile. “Music can unlock memories, Detective. Sometimes the ones we need to solve the case.”`,
    choices: [
      { text: "Hold onto the memory", action: () => { state.memory++; goTo('investigationContinue'); } },
      { text: "Let the memory fade and keep investigating", action: () => goTo('investigationContinue') }
    ]
  },
  jukeboxIpanema: {
    text: `As the smooth bossa nova rhythms of 'Girl from Ipanema' play, A startled laugh bursts from you. 

“Why is this funny?” you ask yourself. 

You suddenly see flash of sea-green eyes rolling at you in derision, the memory gone as quickly as it arrived. 

“Who’s eyes are those…and why am I smiling?”

Killian shrugs. “Not every song will unlock the right memory, Detective. But sometimes, it’s worth a listen.”`,
    choices: [
      { text: "Try to hold onto the memory", action: () => goTo('investigationContinue') },
      { text: "Let the memory fade and keep investigating", action: () => goTo('investigationContinue') }
    ]
  },  
  kitchen: {
    text: () => {
      state.visited.kitchen = true;
      let txt = `<h2> The Kitchen </h2>
      The kitchen looked like a war zone. Pots simmered with what looked like a tomato sauce, spaghetti piled high, chocolate everywhere, doughnuts… casualties of a previous conflict.`;
      if(state.chocolate && state.doughnut) txt += "\nKillian laughs: 'Detective, you really know how to handle a mess.'";
      return txt;
    },
    choices: [
      { text: "Eat spaghetti", action: () => goTo('investigationContinue') },
      { text: "Inspect doughnut remains", action: () => { state.memory++; goTo('doughnutClue'); } },
      { text: "Check chocolate stash", action: () => goTo('chocolateStash') }
    ]
  },
  chocolateStash: {
    text: `You find a stash of chocolate bars hidden in the cupboard. The wrappers are crumpled, as if they’ve been handled a lot.
Killian looks at you with a mix of amusement and admiration. “Detective, you have a knack for finding the sweet stuff. Maybe it’s a clue, or maybe it’s just a well-hidden stash. Can I try some?”`,
    choices: [
      { text: "Take the chocolate and keep investigating", action: () => { state.chocolate = true; state.memory++; goTo('investigationContinue') } },
      { text: "Leave the chocolate and keep investigating", action: () =>  goTo('investigationContinue')}
    ]
  },  
  doughnutClue: {
    text: `The doughnut was half-eaten, with a bite taken out of the side. A small note was tucked inside the box:

    “Mmm, this doughnut is the perfect breakfast food.”`,
    choices: [
      { text: "Keep the note and the doughnut", action: () => { state.doughnut = true; goTo('investigationContinue'); } },
      { text: "Discard the note", action: () => goTo('investigationContinue') }
    ]
  },
  investigationContinue: {
    text: () => {
      let text = `Pieces of the puzzle are starting to come together.

Something is starting to surface.  

Do I continue investigating?
.”`;
      if(state.memory > 5) text += "\nKillian grins. “You’re so close, Detective. Remember yet?”";
      return text;
    },
    choices: [
      { text: "Continue investigation", action: () => {
        // Revisit any location with new variables
        let options = [];
        if(!state.visited.gardens) options.push('gardens');
        if(!state.visited.berties) options.push('berties');
        if(!state.visited.kitchen) options.push('kitchen');
        if(options.length > 0) goTo(options[0]);
        else goTo('revealSetup');
      }},
      { text: "Confront Killian about what’s really going on", action: () => goTo('revealSetup') }
    ]
  },
  revealSetup: { /* same as before */ },
  amnesiaExplain: { /* same as before */ },
  ringReveal: { /* same as before */ },
  finalLine: { /* same as before */ }
};

// Go to passage
function goTo(pass) {
  storyDiv.innerHTML = typeof passages[pass].text === 'function' ? passages[pass].text() : passages[pass].text;
  choicesDiv.innerHTML = '';
  updateInventory();
  if(passages[pass].choices){
    passages[pass].choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = choice.action;
      choicesDiv.appendChild(btn);
    });
  }
}

// Start game
goTo('start');
