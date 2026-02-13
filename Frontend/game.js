// Game state
let state = {
  memory: 0,
  chocolate: false,
  doughnut: false,
  ring: false,
  cider: false,
  chip: false,
  reflect:false,
  visited: {
    gardens: false,
    berties: false,
    kitchen: false
  }
};

function resetState() {
  state.memory = 0;
  state.chocolate = false;
  state.doughnut = false;
  state.ring = false;
  state.cider = false;
  state.chip = false;
  state.reflect = false;
  state.visited = {
    gardens: false,
    berties: false,
    kitchen: false
  };
}

// DOM elements
const storyDiv = document.getElementById('story');
const choicesDiv = document.getElementById('choices');
const inventoryDiv = document.getElementById('inventory');
const memoryDiv = document.getElementById('memory');
let lastInventoryText = "";
let lastMemoryValue = null;


// Update inventory
function updateInventory() {
  let items = [];
  if(state.chocolate) items.push("Chocolate");
  if(state.doughnut) items.push("Doughnut clue");
  if(state.ring) items.push("Engagement ring");
  if(state.cider) items.push("Cider");
  if(state.chip) items.push("Metallic chip");

  const newText = "Inventory: " + (items.length ? items.join(", ") : "Nothing yet");

  inventoryDiv.textContent = newText;

  // Only glow if inventory actually changed
  if (newText !== lastInventoryText) {
    inventoryDiv.classList.remove("updated");
    void inventoryDiv.offsetWidth; // force reflow
    inventoryDiv.classList.add("updated");
    lastInventoryText = newText;
  }
}




function memoryCount() {
  const newMemoryValue = state.memory;

  memoryDiv.innerHTML = "Memories Recalled: <span class='memory-value'>" + newMemoryValue + "</span>";

  const memorySpan = memoryDiv.querySelector(".memory-value");

  if (newMemoryValue !== lastMemoryValue && memorySpan) {
    memorySpan.classList.remove("updated");
    void memorySpan.offsetWidth; // trigger reflow
    memorySpan.classList.add("updated");
    lastMemoryValue = newMemoryValue;
  }
}

function typeWriter(text, element, speed = 30, callback) {
  element.innerHTML = "";

// element.classList.add("typing"); // add typing class for animation

  const container = document.createElement("div");
  container.innerHTML = text;

  const nodes = Array.from(container.childNodes);
  let nodeIndex = 0;

  function processNextNode() {
    if (nodeIndex >= nodes.length) {
      //  element.classList.remove("typing");  // remove typing class when done
      if (callback) callback();
      return;
    }

    const node = nodes[nodeIndex];

    // If it's a header, show instantly
    if (node.nodeType === 1 && /^H[1-6]$/.test(node.tagName)) {
      element.appendChild(node.cloneNode(true));
      nodeIndex++;
      processNextNode();
      return;
    }

    // If it's a paragraph or text, type it
    if (node.nodeType === 1 || node.nodeType === 3) {
      typeNode(node, () => {
        nodeIndex++;
        processNextNode();
      });
    } else {
      nodeIndex++;
      processNextNode();
    }
  }

  function typeNode(node, done) {
    let textContent = node.textContent || "";
    let i = 0;

    const p = document.createElement("p");
  const span = document.createElement("span");
  p.classList.add("typing");
  p.appendChild(span);
  element.appendChild(p);

  // ✅ Add typing class to this span so cursor is inside
  span.classList.add("typing");

    function typing() {
      if (i < textContent.length) {
        p.textContent += textContent.charAt(i);

        // Natural punctuation pause
        let delay = speed;
        if (/[.,!?]/.test(textContent.charAt(i))) {
          delay = speed * 6;
        }

        i++;
        setTimeout(typing, delay);
      } else {
        span.classList.remove("typing"); // Remove typing class when done
        done();
      }
    }

    typing();
  }

  processNextNode();
}


// Game passages
const passages = {
  start: {
    text: `<h1> The Case of the Missing Ring </h1>
The rain tapped the windows like it had a vendetta against everything soft and sentimental. The kind of rain that makes the city feel smaller, the streets slick and silent, and your thoughts louder than they should be.

Your office smells of stale decaf coffee, chocolate wrappers, and something faintly like… victory? Or maybe defeat. I couldn’t tell.

You haven’t been sleeping much lately. Your eyes feel heavy, your mind jittery. Too many late nights. Too many thoughts you never say out loud, curling in corners of your brain like smoke.

Sometimes it feels like parts of you are… offline. Sections of memory missing, moments replaying in fragments, like a film you can’t quite follow.

The rain streaks down the windowpane in slow rivers, and every drop seems to whisper a secret you’re not ready to hear. The streets beyond are empty, save for the occasional taxi splashing through puddles, its headlights cutting through the grey drizzle.

Across from me, my assistant — small, serious, suspiciously perceptive — was lining up toy cars across the desk. Each one in perfect formation, as if they were strategizing for a battle I didn’t understand yet.

“This case is big, Detective,” he said, making engine noises, his eyes glinting with the sort of mischief only someone who knows more than they let on can pull off.

I rubbed my temples. Something felt… off. Memories, clues, moments lost and hidden—they were all tangled together, and I had a sinking feeling that the next step could change everything.
`,
image:"assets/office.png",
    choices: [
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
      { text: "Ask about the Case", action: () => goTo('investigationSetup') },
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') }
    ]
  },
  examineFiles: {
    text: `<h3> Your Desk </h3>
The files are organized in a way that makes sense only to a toddler—or a criminal mastermind pretending to be one.

The Missing Ring is in a manila folder, with dinosaur stickers covering the bottom corner.

The Doughnut Dispute has sticky fingerprints.

The Vanishing of the Chocolate Milk is under “Priority: High.”`,
    choices: [
      { text: "Ask about the Case", action: () => goTo('investigationSetup') },
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') }
    ]
  },
//   askCase: {
//     text: `Killian leans forward.

// “Someone took something precious,” he says. “Rings. Memories. Chocolate. Mostly the ring.”

// “Who?” you ask.

// Killian shrugs. “Could be anyone.”`,
//     choices: [
//       { text: "Start the investigation", action: () => goTo('investigationSetup') },
//       { text: "Examine the Desk", action: () => goTo('examineFiles') },
//       { text: "Ask about your Assistant", action: () => goTo('askAssistant') }
//     ]
//   },
  askAssistant: {
    text: `<h3> Your Assistant </h3>
Killian rolls his eyes at the question, as if it’s the most obvious thing in the world.

“My name is Killian,” he says. “But you can call me Kili.
    
I love vehicles of all kinds, and chocolate. Chocolate muffins, chocolate biscuits, chocolate sandwiches...also, 8.”`,
    choices: [
      { text: "Ask about the Case", action: () => goTo('investigationSetup') },
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
    ]
  },
  investigationSetup: {
    text: `<h3> Investigation Setup </h3>
Once you’ve poked at your desk enough, Killian clears his throat:

“Here’s the deal. Someone has taken the ring.”

“Just the ring?” you ask.

Killian sighs “She walked in here devastated. The ring was given to her by the love of her life and right now, it’s the only thing she has of him. But it’s not the only thing that’s missing…”

Confused, you try to prompt Killian further. “So… what else is missing?”

“It’s… complicated. I can’t really give you any more information than this.” Killian slides a file across the desk. A map of locations...`,
choices: [
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') },
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
      { text: "Look at the Map of Locations", action: () => goTo('locations') }
    ]
  },

locations:{
text:`<h3> The Map of Locations </h3>
- The Hill Garden and Pergola
- Bertie’s Bar
- A familiar looking Kitchen. 

“Follow the trail, Detective,” he says. “Solve the case. Remember.”

He looks at you with tiny seriousness.

“Also… chocolate may be involved.”`,
image:"assets/map.png",
    choices: [
      { text: "Go to The Hill Garden and Pergola", action: () => goTo('gardens') },
      { text: "Go to Bertie’s Bar", action: () => goTo('berties') },
      { text: "Investigate Kitchen", action: () => goTo('kitchen') }
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
      { text: "Search the bushes", action: () =>  goTo('gardenBushes') },
      { text: "Reflect quietly", action: () =>  {state.reflect = true; goTo('gardenReflect') }},
      { text: "Ask Killian what’s important", action: () => goTo('gardenAsk') }
    ]},
  gardenBushes: { 
    text: `<h3> Searching the Bushes </h3>
You part the leaves and find… nothing. Well, except a small puddle of chocolate you didn’t remember hiding there.

Killian: “Detective, you found the chocolate! Maybe it’s a clue? Or maybe it’s just chocolate. But either way, it’s here now.”`, 
choices: [
  { text: "Keep the chocolate and take a moment to reflect", action: () => { state.reflect = true; state.chocolate = true; goTo('gardenReflect'); } },
  { text: "Ignore the chocolate clue", action: () => goTo('investigationContinue') }
]
  },
gardenReflect: {
  text: `<h3> Reflecting in the Gardens </h3>
You sit on a bench, letting the rain wash over you. The scent of wet earth and flowers fills the air.

As you close your eyes, a memory surfaces: laughter, a hand held, the sparkle of...something precious.`,
  choices: [
    { text: "Hold onto the memory", action: () => { state.reflect = true; state.memory++; goTo('gardenMemory'); } },
    { text: "Push the memory away", action: () => { state.reflect = true; goTo('investigationContinue')} }
  ]
},
gardenMemory: {
  text: `<h3> A Memory in the Gardens </h3>
The memory is hazy, but you can make out a figure standing over someone kneeling in the rain, holding something small and shiny. 
  
The figure looks up, and for a moment, you see sea-green eyes and hear laughter on the wind. 
 
But then it’s gone, replaced by a flash of chocolate and a whisper: “Remember.”`,
  choices: [  
    { text: "Ask Killian what’s important", action: () => goTo('gardenAsk') },
    { text: "Move on", action: () => goTo('investigationContinue') }
  ]
},
 gardenAsk: {
  text: `<h3> Asking Killian about the Gardens </h3>
You turn to Killian, hoping for a hint about what’s so important about the gardens.

Killian sighs dramatically, flicking a cheerio across the ground with his toy train.

“I can’t tell you, Detective. It’s too important. You have to find it yourself.”`,
choices: [
  { text: "Press Killian for more information", action: () => goTo('moreInformation') }, 
  { text: "Accept the mystery and keep investigating", action: () => goTo('investigationContinue') }
]
 },
moreInformation: {
  text: `<h3> Pressing Killian for More Information </h3>
Killian looks at you, a mix of frustration and amusement in his eyes.

“Fine,” he says. “The gardens are where something big happened. It’s not just a clue location. It’s… personal.
But that’s all I can say.”`,
  choices: (() => {
    let options = [
      { text: "Accept the vague information and keep investigating", action: () => goTo('investigationContinue') }
    ];

    if (state.reflect === false) {
      options.push({ text: "Reflect quietly", action: () => goTo('gardenReflect') });
    }

    return options;
  })()
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
      { text: "Inspect the table", action: () => { goTo('bertiesTable'); } },
      { text: "Ask bartender for clues", action: () => { goTo('bertiesBartender'); } }
    ]
  },
  bertiesTable: {
    text: `<h3> Inspecting the Table </h3>
You see a half-finished Stowford Press cider, diet coke and Nando’s receipt balled up on the table. 

A handful of cheerios are scattered across the floor, some crushed, some whole. A strange metallic chip is wedged between the floorboards.

An eerie feeling of Deja-Vu creeps over you. 

“Have I been here before?”`,
    choices: [
      { text: "Take a photo and leave", action: () => { state.memory++; goTo('investigationContinue'); } },
      {text: "Inspect further", action: () => goTo('metallicChip') },  
      { text: "Finish the cider and head over to the bartender", action: () => goTo('bertiesBartender') }
    ]
  },

metallicChip: { 
text: `<h3> A Closer Look </h3>
As you bend down to examine the surrounding area, you try to grab the small chip wedged in the floorboards. 

You cut your finger on the sharp edge.

Killian looks at you "Some things may be better left alone” he says, a hint of warning in his voice.`,
choices: [{ text: "Keep the chip and continue investigating", action: () => { state.chip = true; state.memory++; goTo('endingTwo'); } }, 
  { text: "Discard the chip and continue investigating", action: () => goTo('bertiesBartender') } ] },


  bertiesBartender: {
    text: `<h3> Talking to the Bartender </h3>
The bartender looks at you with a mix of sympathy and suspicion.

“You look like you’ve seen a ghost,” he says. “Or maybe just a memory.

You’re not the first one to come in here looking for something they can’t quite remember.”`,
    choices: [
      { text: "Order a cider & enquire further", action: () => {state.cider = true; state.memory++; goTo('bartenderMemory')} },  
      { text: "Wander over to the Jukebox", action: () =>  goTo('jukebox')  },
      { text: "Leave and continue on elsewhere", action: () => goTo('investigationContinue') }
    ]
  },
  bartenderMemory: {    
    text: ` <h3> A Memory at the Bar </h3>
The bartender leans in, lowering his voice.

“Some people come in here looking for memories. They say they can’t remember something important, but they know it’s connected to this place. 

They say they feel like they’ve been here before, even if they haven’t. I always find listening to music helps me sort things out”`,
    choices: [
      { text: "Wander over to the Jukebox", action: () => { goTo('jukebox'); }  },  
      { text: "Leave and continue on elsewhere", action: () => goTo('investigationContinue') }
    ] 
  },  
  jukebox: {
    text: `<h3> The Jukebox </h3>
You approach the jukebox, and as you scroll through the songs, two in particular catch your eye.`,
    choices: [
      { text: "Play 'La Vie En Rose' ", action: () => { goTo('jukeboxRose'); } },
      { text: "Play 'Girl from Ipanema'", action: () => goTo('jukeboxIpanema') }
    ]
  },
  jukeboxRose: {
    text: `<h3> Playing 'La Vie En Rose' </h3>
As the first notes of 'La Vie En Rose' fill the bar, a wave of nostalgia hits you.

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
    text: `<h3> Playing Girl from Ipanema </h3>
As the smooth bossa nova rhythms of 'Girl from Ipanema' play, A startled laugh bursts from you. 

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
The kitchen looked like a war zone. 
      
Pots simmered with what looked like a tomato sauce, spaghetti piled high, chocolate everywhere, doughnuts… casualties of a previous conflict.`;
      if(state.chocolate) txt += "\nKillian laughs: 'Detective, you really know how to handle a mess.'";
      return txt;
    },
    choices: [
      { text: "Eat spaghetti", action: () => goTo('eatSpaghetti') }, // ADD OPTION HERE
      { text: "Inspect doughnut remains", action: () => { goTo('doughnutClue'); } },
      { text: "Check chocolate stash", action: () => goTo('chocolateStash') }
    ]
  },
  eatSpaghetti: {
    text: `<h3> Eating the Spaghetti </h3>
You twirl the spaghetti around your fork and take a bite. 
    
The taste is rich and comforting, but something about it feels… off.

Killian looks at you with a mix of amusement and concern. “Detective, are you sure you want to eat that? It might not be what it seems.”`,
choices: [
  { text: "Keep eating the spaghetti and see if it triggers any memories", action: () => goTo('investigationContinue') },
  { text: "Stop eating and inspect the kitchen further", action: () => goTo('kitchen') }
]
  },
  chocolateStash: {
    text: `<h3> The Chocolate Stash </h3>
You find a stash of chocolate bars hidden in the cupboard. The wrappers are crumpled and sticky, as if they’ve been handled a lot.

You frown, who keeps leaving chocolate everywhere?

Killian looks at you with a mix of amusement and admiration. “Detective, you have a knack for finding the sweet stuff. Can I try some?”`,
    choices: [
      { text: "Take the chocolate and keep investigating", action: () => { state.chocolate = true; state.memory++; goTo('investigationContinue') } },
      { text: "Leave the chocolate and keep investigating", action: () =>  goTo('investigationContinue')}
    ]
  },  
  doughnutClue: {
    text: `<h3> The Doughnut Clue </h3>
The doughnut was half-eaten, with a bite taken out of the side. A small note was tucked inside the box:

“Mmm, this doughnut is the perfect breakfast food.”`,
    choices: [
      { text: "Keep the note and the doughnut", action: () => { state.memory++; state.doughnut = true; goTo('investigationContinue'); } },
      { text: "Discard the note", action: () => goTo('investigationContinue') }
    ]
  },
  investigationContinue: {
    text: () => {
      let text = `Pieces of the puzzle are starting to come together.

Something is starting to surface.  

Do I continue investigating?`;
      if(state.memory > 3) text += "\nKillian grins. “You’re so close, Detective. Remember yet?”";
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
  // investigationStop: {text: `You’ve investigated all the locations, but something still feels off. 

  //   There’s a nagging feeling in the back of your mind that you’re missing something important. 

  //   Maybe it’s time to confront Killian and get some answers.`, 
  //   choices: [ { text: "Confront Killian", action: () => goTo('revealSetup') } 
  //   ] 
  // },
 revealSetup: { 
  text: () => {
    let text = `You decide to confront Killian. You need to know what’s really going on.`;
    let choices = [];

    if (state.memory > 3 && state.chocolate && state.doughnut) {
      text += `
      You’ve pieced together enough clues to know that Killian is hiding something.

      You’re ready to confront him with the evidence you’ve gathered.`;

      choices = [
        { text: "Confront Killian with the evidence", action: () => { state.ring = true; goTo('endingOne'); } }
      ];
    } else if (state.memory > 1 || state.chocolate || state.doughnut || state.cider) {
      text += `
      You're close, but don’t have all the pieces of the puzzle yet, but you can’t shake the feeling that Killian is hiding something.

      You decide to confront him anyway, hoping to get some answers.`;

      choices = [
        { text: "Confront Killian", action: () => { state.ring = true; goTo('endingFour'); } }
      ];
    } else {
      text += `
      You don’t have much to go on, but you can’t shake the feeling that Killian is hiding something.

      You decide to confront him anyway, hoping to get some answers.`;

      choices = [
        { text: "Confront Killian", action: () => goTo('endingThree') }
      ];
    }

    return { text, choices };
  }
},

    endingOne: {
text: `<h2> Your Office </h2>
You head back to you office with Killian. Your mind reeling with everything you've seen. 

As you enter your office, you notice a small tower of cheerios on your desk. 

Those cheerios. Ah. He's been everywhere before. He’s been leaving clues for you to find.

You lay out all the evidence you’ve gathered: the chocolate, the doughnut note, the memories you’ve pieced together, and those blasted cheerios.

Killian looks at you, admiration in his eyes. “I guess you’ve figured it out, Detective. 

He slowly removes his tiny sock. Inside it… the ring.

He presses a toy button.

Confetti cannons go off.

A banner drops from the ceiling:

“HAPPY ANNIVERSARY, YOU DRAMATIC FOOL.”

Bursting through the door, your fiancée Maisie comes running over and crashes into your arms, kissing you fiercely on the lips.

Everything comes rushing back to you. 

“You took my memories…to take me to our special places…to…surprise me?”

Maisie laughs “Yep!! I obviously couldn’t give you amnesia in real life, so I built you this game instead!”

“Happy Anniversary babe. <strong>I’m so glad we made it.</strong>” 

Fade to black.`,
choices: [
  { text: "Play Again", action: () => {resetState(); goTo('start')} } ] 
}, 

endingTwo: { 
  text: `
 <h2> Unknown Location </h2>
Bright lights flash, and you feel a sharp pain in your head.
  
When the pain subsides, you find yourself in a strange, dreamlike version of your office. The walls are shifting and changing, and you can hear whispers in the air.
  
Strange clicking sounds and voices echo around you. The smell of antiseptic and feel of cold metal surrounds you. 
  
You blink, and bug-like face hovers over you, its eyes glowing with an eerie light.
  
It speaks in a voice that sounds like a thousand whispers all at once.
  
"Patient 4792 accidentally broke through memory barriers. Reinitiate memory suppression protocol. Rebooting memory sequence. Please wait..."
  
The world around you starts to fade, and you feel yourself slipping back into unconsciousness. When you wake up, you’re back in your office, the case files scattered around you. You have no memory of what just happened. 
  
You’re left with a lingering feeling that you were close to something important, but it’s just out of reach.`, 
  choices: [ 
    { text: "Play Again", action: () => {resetState(); goTo('start')} }, 
    ] 
  }, 

endingThree: { 

  text: `
  <h2> Your Office </h2>
You head back to you office with Killian. Your mind frustrated. 
  
You confront Killian, but without any evidence, he just laughs it off.

“You’re really something, Detective. You think you can just waltz in here and accuse me of something without any proof? 

You’re out of your depth.

It's time to go back to sleep."

Quick as a flash, he cups his hand and blows into your face.

You cough, your vision blurs, and everything goes dark. 

When you wake up, you’re back in your office, the case files scattered around you. You have no memory of what just happened.

You’re left with a lingering feeling that you were close to something important, but it’s just out of reach.`, 
choices: [ 
  { text: "Begin again", action: () => {resetState(); goTo('start')} }, ]
    },

endingFour: {text: `<h2> Your Office </h2>
You head back to you office with Killian. Your mind reeling with everything you've seen. 
  
You confront Killian, but without concrete evidence, he denies everything. 

He looks at you with a mix of amusement and pity. “You don’t have anything on me, Detective. 

You’re grasping at straws.”
  
Your head spins with frustration and confusion. You know there’s something there, but you can’t prove it.
  
You shove your hands into your pockets, looking for some chocolate to calm your nerves, but all you find is a crumpled note. 
  
As you unfold, the ring falls out, landing on the floor with a soft clink.
  
Killian’s eyes widen in shock, and for a moment, you see a flicker of fear. But then he quickly recovers, laughing it off as a coincidence.

You stare at him, the weight of the moment sinking in. You know you’ve found the key piece of evidence, but without any other clues, it’s not enough to confront him with.

You’re left with a lingering feeling that you were close to something important, but it’s just out of reach.

Killian takes the ring from you. "I guess this should go back to its rightful owner, huh?" he says. 

He turns to leave the office, but you stop him.

“Killian, wait. I know you’re hiding something. But...I don't know what.

Did you take it? Why did you leave clues for me to find?"

Killian looks at you, a mix of sadness and resignation in his eyes. "But you didn't find them all, so I guess you don't know enough to understand. Maybe one day you will. But for now, I think it's best if we just... forget this ever happened."

He leaves the office, taking the ring with him. 

You’re left standing there, and a sense of loss and confusion washing over you.`, 
 
 choices: [ { text: "Play Again", action: () => {resetState(); goTo('start')} }, ] },
};


// Go to passage
function goTo(pass) {
  const passage = passages[pass];

  let content = {};
  if (typeof passage.text === 'function') {
    const result = passage.text();
    if (typeof result === 'string') {
      content.text = result;
      content.choices = passage.choices; // fallback to static choices
    } else {
      content = result; // { text, choices }
    }
  } else {
    content.text = passage.text;
    content.choices = passage.choices;
  }

  //  storyDiv.innerHTML = content.text;
typeWriter(content.text, storyDiv, 5, () => {
  if (content.choices) {
    content.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = choice.action;
      choicesDiv.appendChild(btn);
    });
  }
});

const sceneImage = document.getElementById("scene-image");

if (content.image) {
  sceneImage.src = content.image;
  
  // Reset animation
  sceneImage.classList.remove("fade-in");
  void sceneImage.offsetWidth;  // trigger reflow
  
  sceneImage.classList.add("fade-in");  // fade in
  sceneImage.style.display = "block";   // ensure it's visible
} else {
  sceneImage.style.display = "none";    // hide if no image
}
sceneImage.onerror = () => console.log("Image failed to load:", content.image);

  storyDiv.classList.remove("fade-in"); // reset animation
  void storyDiv.offsetWidth; // trigger reflow
  storyDiv.classList.add("fade-in");

  choicesDiv.innerHTML = '';

  updateInventory();
  memoryCount();

  // if (content.choices) {
  //   content.choices.forEach(choice => {
  //     const btn = document.createElement('button');
  //     btn.textContent = choice.text;
  //     btn.onclick = choice.action;
  //     btn.classList.add("fade-in");
  //     choicesDiv.appendChild(btn);
  //   });
  // }
}

// Start game
goTo('start');
