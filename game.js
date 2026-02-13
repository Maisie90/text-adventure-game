// Game state
let state = {
  memory: 0,
  chocolate: false,
  doughnut: false,
  ring: false,
  guinness: false,
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
  state.guinness = false;
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
const sceneImage = document.getElementById("scene-image");
let lastInventoryText = "";
let lastMemoryValue = null;


// Update inventory
function updateInventory() {
  let items = [];
  if(state.chocolate) items.push("Chocolate");
  if(state.doughnut) items.push("Doughnut Note");
  if(state.ring) items.push("Engagement ring");
  if(state.guinness) items.push("Guinness");
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

I hadn’t slept. My mind felt like a projector screen flickering with missing frames—jittery, fragmented, and curling at the edges like smoke. Sections of my life were offline, moments replaying in shards of light I couldn't piece together.

Across from me stood my assistant. He was small, serious, and possessed a level of perception that would make a seasoned cop nervous. He was currently busy lining up a fleet of toy cars across my mahogany desk. Each one was in perfect formation, a silent, plastic army preparing for a battle I wasn't equipped to fight yet.

“This case is big, Detective,” he muttered, punctuating the sentence with a low, rumbling engine noise. His eyes glinted with the mischief of a man who held all the cards but preferred to let you sweat.

I rubbed my temples.  I had a sinking feeling that this case would change everything.`,

image:"assets/window.png",
    choices: [
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
      { text: "Ask about the Case", action: () => goTo('investigationSetup') },
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') }
    ]
  },
  examineFiles: {
    text: `<h3> Your Files </h3>
The files on my desk were organized according to a filing system known only to toddler-savants and high-level double agents. 

**The Missing Ring** was tucked into a manila folder, its gravity undermined slightly by the smears of raspberries and dinosaur stickers guarding the bottom corner. A T-Rex looked at me with predatory judgment.

**The Doughnut Dispute** sat nearby, its edges marked by sticky, incriminating fingerprints. 

Beneath it all, buried under the weight of the world, was **The Vanishing of the Chocolate Milk**. It was marked in red crayon: “Priority: High.”`,
image:"assets/desk.png",    
choices: [
      { text: "Ask about the Case", action: () => goTo('investigationSetup') },
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') }
    ]
  },
  askAssistant: {
    text: `<h3> Your Assistant </h3>
Killian rolled his eyes, a gesture of pure, unfiltered expertise. He looked at me as if I’d just asked if the sun was hot.

“My name is Killian,” he said, adjusting his invisible tie. “But on the streets... they call me Kili." 
    
He leaned in, his voice dropping to a confidential whisper. "I have three passions, Detective: vehicles of all kinds, high-percentage chocolate, and the number 8. Chocolate muffins, biscuits, sandwiches... if it’s cocoa-based, I’m the man for the job.”`,
image:"assets/killian.png",
    choices: [
      { text: "Ask about the Case", action: () => goTo('investigationSetup') },
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
    ]
  },
  investigationSetup: {
    text: `<h3> The Briefing </h3>
Once I’d poked through the dinosaur-guarded files long enough, Killian cleared his throat. It was a sound that demanded a chocolate milk, neat, though he settled for a deep breath.

“Here’s the deal, Detective. We had a visitor. The most beautiful broad I ever saw. And her ring is missing.”

“Just the ring?” I asked, leaning back. In a city this cold, people usually take anything that isn't bolted down.

Killian sighed, a heavy, world-weary sound usually reserved for when it’s time to brush his teeth. “She walked in here devastated. That ring was her North Star—given to her by the love of her life. Right now, it’s the only ghost of him she has left. But it’s not the only thing missing...”

He trailed off, his gaze drifting to the window. I tried to push. “So… what else are we looking for?”

“It’s… complicated. My hands are tied.” 

Killian slid a file across the desk with practiced precision, despite his fingers being slightly tacky from a recent snack. Inside was a map of locations—a trail leading straight into the heart of my own hazy memory.`,
image:"assets/ringfile.png",
choices: [
      { text: "Ask about your Assistant", action: () => goTo('askAssistant') },
      { text: "Examine the Desk", action: () => goTo('examineFiles') },
      { text: "Look at the Map of Locations", action: () => goTo('locations') }
    ]
  },

locations:{
    text: `<h3> The Map </h3>
The map laid it all out. Three marks on a grid of secrets:
- The Hill Garden and Pergola
- Bertie’s Bar
- A Kitchen that felt like a place I’d seen in a dream I couldn't quite wake up from.

“Follow the trail, Detective,” Killian said, his tiny face masked in absolute seriousness. “Solve the case. Remember who you are.”

He paused, the gravity of the moment hanging between us like smoke. 

“Also… there’s a high probability that chocolate will be required for further intelligence.”`,

image:"assets/map.png",
    choices: [
      { text: "Go to The Hill Garden and Pergola", action: () => goTo('gardens') },
      { text: "Go to Bertie’s Bar", action: () => goTo('berties') },
      { text: "Investigate the Kitchen", action: () => goTo('kitchen') }
    ]
  },

  gardens: {
    text: () => {
      state.visited.gardens = true;
      let txt = `<h2> The Hill Gardens and Pergola </h2>
      
The rain had retreated to a polite, persistent drizzle by the time we reached the Pergola. Massive wooden arches loomed overhead like the skeletal remains of a forgotten cathedral, vines twisting around them like they were whispering secrets about everyone who passed beneath.

Something about the air here felt... heavy. Not with crime, but with history. The kind of familiarity that doesn't come from a mugshot, but from a dream you've had a thousand times.

Killian zoomed his toy spitfire through the damp air, the plastic engine whining against the silence. 

“This is where it happened, Detective,” he said, his eyes scanning the horizon. “Not a heist. Not a hit. Something much more dangerous.”`
;
      if(state.memory > 1) txt += "\nKillian whispers: 'Detective, you've been here before, but the memory's clearer now.'";
      return txt;
    },
     image:"assets/thehill.png",
    choices: [
      { text: "Search the bushes", action: () =>  goTo('gardenBushes') },
      { text: "Reflect quietly", action: () =>  {state.reflect = true; goTo('gardenReflect') }},
      { text: "Ask Killian what’s important", action: () => goTo('gardenAsk') }
    ]},
  gardenBushes: { 
    text: `<h3> Shrubbery Surveillance </h3>
I parted the damp leaves, expecting a discarded weapon or a hidden wire. Instead, I found... a puddle of chocolate. It was tucked away in a corner of the greenery where no candy had any business being.

Killian appeared behind me, nodding solemnly. 

“Detective, you found the contraband! Is it a clue? Is it a snack? In this town, sometimes they’re one and the same. Either way, it’s part of the file now.”`,
image:"assets/thehill.png",
choices: [
  { text: "Keep the chocolate and take a moment to reflect", action: () => { state.reflect = true; state.chocolate = true; goTo('gardenReflect'); } },
  { text: "Ignore the chocolate clue", action: () => goTo('investigationContinue') }
]
  },
gardenReflect: {
  text: `<h3> The Bench of Memories </h3>
I took a seat on a weather-beaten bench, letting the rain mist over my face. The scent of wet earth and blooming flowers filled my lungs, sharper than any cheap office coffee.

I closed my eyes, and the world shifted. The rain felt warmer. 

A memory clawed its way to the surface: a sound of laughter, the warmth of a hand in mine, and the distant, unmistakable sparkle of... something precious. Something I’d sworn to protect.`,
image:"assets/thehill.png",  
choices: [
    { text: "Hold onto the memory", action: () => { state.reflect = true; state.memory++; goTo('gardenMemory'); } },
    { text: "Push the memory away", action: () => { state.reflect = true; goTo('investigationContinue')} }
  ]
},
gardenMemory: {
  text: `<h3> A Shard of the Past </h3>
The memory was a hazy film strip, flickering in the dark. I could see a figure standing in the rain. Someone was kneeling—a silhouette of a man offering up something small, shiny, and full of promises.

The figure looked up, and for a split second, the sea-green eyes pierced through the gloom. I heard laughter on the wind, light and musical. 

Then the film snapped. The vision was replaced by the taste of chocolate and a single, haunting whisper that seemed to come from the trees themselves: “Remember.”`,
image:"assets/proposal.png",
  choices: [  
    { text: "Ask Killian what’s important", action: () => goTo('gardenAsk') },
    { text: "Move on", action: () => goTo('investigationContinue') }
  ]
},
 gardenAsk: {
  text: `<h3> Asking Killian about the Gardens </h3>
I turned to Killian, hoping for a hint about what’s so important about the gardens.

Killian sighs dramatically, flicking a cheerio across the ground with his toy train.

“I can’t tell you, Detective. It’s too important. You have to find it yourself.”`,
image:"assets/thehill.png",
choices: [
  { text: "Press Killian for more information", action: () => goTo('moreInformation') }, 
  { text: "Accept the mystery and keep investigating", action: () => goTo('investigationContinue') }
]
 },
moreInformation: {
  text: `<h3> Pressure Tactics </h3>
Killian looked at me, a flash of frustration crossing his face, followed by a fleeting, mischievous amusement.

“Fine,” he snapped, crossing his arms over his chest. “The gardens are where the world changed. It’s not just a stop on the map. It’s personal. It’s the origin story. But that’s the end of the line for me. The rest is in your head.”`,
image:"assets/thehill.png",
choices: () => {
    let options = [
      { text: "Accept the vague information and keep investigating", action: () => goTo('investigationContinue') }
    ];

    if (!state.reflect) {
      options.push({ 
        text: "Reflect quietly", 
        action: () => { state.reflect = true; goTo('gardenReflect'); } 
      });
    }

    return options;
  }
},
  berties: {
    text: () => {
      state.visited.berties = true;
      let txt = `<h2> Bertie’s Bar </h2>
Bertie’s was a dimly lit cavern that smelled of old secrets, stale cigarette smoke, and the ghostly caramel scent of Kraken Rum. It was the kind of place where people went to lose themselves—or find things they’d spent years trying to forget.

In the corner, a jukebox hummed with a low, electric frequency, playing a melody that tugged at a thread in the back of my mind.

As I approached a specific table in the shadows, a dull throb began behind my eyes. My pulse quickened. This wasn't just a bar; it was a map of a night I couldn't quite put into words.`;
      if(state.memory > 1) txt += "\nKillian smirks: 'Detective, déjà vu? Or just clever planning?'";
      return txt;
    },
    image:"assets/berties.png",
    choices: [
      { text: "Inspect the table", action: () => { goTo('bertiesTable'); } },
      { text: "Ask bartender for clues", action: () => { goTo('bertiesBartender'); } }
    ]
  },
  bertiesTable: {
    text: `<h3> Inspecting the Table </h3>
The tabletop was a graveyard of a Friday night: a half-finished Guinness, a sweating Diet Coke, and a Nando’s receipt balled up like a discarded confession. 

On the floor, a handful of Cheerios were scattered across the scuffed wood—some crushed into dust, others whole and defiant. My eyes caught a glint of something sharp—a metallic chip wedged deep between the floorboards.

A cold shiver of Déjà Vu crawled up my spine. I knew this mess. I’d seen this arrangement before. 

“Have I been here before?” I whispered to the empty air.`,
image:"assets/table.png",
    choices: [
      { text: "Take a photo and leave", action: () => { state.memory++; goTo('investigationContinue'); } },
      {text: "Inspect further", action: () => goTo('metallicChip') },  
      { text: "Finish the Guinness and head over to the bartender", action: () => goTo('bertiesBartender') }
    ]
  },

metallicChip: { 
text: `<h3> A Sharp Discovery </h3>
I knelt down, the floorboards groaning under my weight. I reached for the small, jagged chip wedged in the wood, but the shadows played tricks on me. My finger caught a sharp edge, leaving a thin red line across my skin.

Killian watched me from the shadows, his expression uncharacteristically grave. 

“Some things are better left alone, Detective,” he warned, his voice sounding far older than his two-and-a-half years. “Not every treasure wants to be found. Some edges still cut.”`,
image:"assets/tablechip.png",
choices: [{ text: "Keep the chip and continue investigating", action: () => { state.chip = true; state.memory++; goTo('endingTwo'); } }, 
  { text: "Discard the chip and continue investigating", action: () => goTo('bertiesBartender') } ] },


  bertiesBartender: {
    text: `<h3> The Man Behind the Wood </h3>
The bartender wiped down a glass with a rag that had seen better decades. He looked at me with a cocktail of sympathy and suspicion.

“You look like you’ve seen a ghost,” he rumbled. “Or maybe you just finally caught up with a memory that’s been chasing you.

You’re not the first one to walk through those doors looking for something they left behind in the dark.”`,
image:"assets/berties.png",
    choices: [
      { text: "Order a Guinness & enquire further", action: () => {state.guinness = true; state.memory++; goTo('bartenderMemory')} },  
      { text: "Wander over to the Jukebox", action: () =>  goTo('jukebox')  },
      { text: "Leave and continue on elsewhere", action: () => goTo('investigationContinue') }
    ]
  },
  bartenderMemory: {    
    text: `<h3> Liquid Intelligence </h3>
The bartender leaned over the mahogany, lowering his voice until it was just a rough whisper over the clink of glasses.

“People come in here for two reasons: to forget or to find. They say they’ve lost something vital, something connected to the very air in this room. 

They feel the pull of the place, even if the details are gone. Usually,” he nodded toward the corner, “I find that listening to the music helps the pieces fall into place. The rhythm knows things the mind forgets.”`,
    image:"assets/berties.png",
choices: [
      { text: "Wander over to the Jukebox", action: () => { goTo('jukebox'); }  },  
      { text: "Leave and continue on elsewhere", action: () => goTo('investigationContinue') }
    ] 
  },  
  jukebox: {
    text: `<h3> The Jukebox </h3>
The jukebox glowed with an amber light, humming like a living thing. 

As I scrolled through the dusty selection, two tracks seemed to vibrate with a strange energy, as if they were highlighted by fate.`,
image:"assets/jukebox.png",    
choices: [
      { text: "Play 'La Vie En Rose' ", action: () => { goTo('jukeboxRose'); } },
      { text: "Play 'Girl from Ipanema'", action: () => goTo('jukeboxIpanema') }
    ]
  },
  jukeboxRose: {
    text: `<h3> Playing 'La Vie En Rose' </h3>
As the first velvet notes of 'La Vie En Rose' filled the room, the bar seemed to melt away. 

Suddenly, I wasn't in a dive bar. I was by the sea. I was dancing in a kitchen. I was looking at a ring that caught the light like a fallen star. 

"I love this song," I whispered, the scent of salt air and chocolate momentarily masking the smell of the bar. 

Then, a voice, soft as a secret, breathed into my ear: “I love you, Myles.”

Killian looked up from his toy train with a knowing, gentle smile. “Music is the key to the vault, Detective. Sometimes it’s the only way to crack the case of the heart.”`,
image:"assets/jukebox.png",
    choices: [
      { text: "Hold onto the memory", action: () => { state.memory++; goTo('investigationContinue'); } },
      { text: "Let the memory fade and keep investigating", action: () => goTo('investigationContinue') }
    ]
  },
  jukeboxIpanema: {
    text: `<h3> Playing Girl from Ipanema </h3>
The smooth, breezy rhythm of 'Girl from Ipanema' began to sway through the room. A startled, involuntary laugh escaped me. 

“Why is this funny?” I asked the shadows. 

A flash of sea-green eyes flickered in my mind, rolling with affectionate derision. The memory was sharp, bright, and gone before I could grab it. 

“Whose eyes are those… and why can’t I stop smiling?”

Killian gave a tiny, nonchalant shrug. “Not every song unlocks a door, Detective. Sometimes they just remind you that life isn't always a tragedy. Sometimes, it’s a comedy.”`,
image:"assets/jukebox.png",
    choices: [
      { text: "Try to hold onto the memory", action: () => goTo('investigationContinue') },
      { text: "Let the memory fade and keep investigating", action: () => goTo('investigationContinue') }
    ]
  },  

  kitchen: {
    text: () => {
      state.visited.kitchen = true;
      let txt = `<h2> The Kitchen </h2>
The kitchen looked like it had been hit by a culinary cyclone. The air was thick with the scent of simmering tomatoes and the heavy, sweet fog of high-grade cocoa.

Pots groaned on the stove, bubbling with a crimson sauce that looked like a crime scene in progress. 

Mountains of spaghetti stood tall, and chocolate bars lay scattered like fallen soldiers. Doughnuts... casualties of a conflict that clearly had no survivors.`;

      if(state.chocolate) txt += "\nKillian laughs: 'Detective, you really know how to handle a mess.'";
      return txt;
    },
    image:"assets/kitchen.png",
    choices: [
      { text: "Eat spaghetti", action: () => goTo('eatSpaghetti') },
      { text: "Inspect doughnut remains", action: () => { goTo('doughnutClue'); } },
      { text: "Check chocolate stash", action: () => goTo('chocolateStash') }
    ]
  },
  eatSpaghetti: {
    text: `<h3> The Noodle Investigation </h3>
I twirled the carbs around my fork like I was interrogating a suspect. The taste was rich, comforting, and carried the unmistakable tang of home. But beneath the sauce, something felt... shadowed.

Killian watched me chew, his expression a mix of professional amusement and mild concern. 

“Careful, Detective,” he murmured, leaning against the fridge. “Are you sure you want to dig that deep? Sometimes the things we swallow are harder to digest than a simple mystery.”`,
image:"assets/kitchen.png",
choices: [
  { text: "Keep eating the spaghetti and see if it triggers any memories", action: () => goTo('investigationContinue') },
  { text: "Stop eating and inspect the kitchen further", action: () => goTo('kitchen') }
]
  },
  chocolateStash: {
    text: `<h3> The Chocolate Stash </h3>
I found the motherlode tucked away in the back of a cupboard. A stash of chocolate bars, their wrappers crinkled and sticky, as if they’d been handled by someone in a hurry—or someone with very small, very determined hands.

I frowned. This city was covered in chocolate. Who was the ghost leaving these sugary breadcrumbs everywhere?

Killian appeared at my elbow, looking at the stash with unmasked admiration. “Detective, you have a nose for the sweet stuff. A real knack for finding the treasures. Think you could... share the intel? Strictly for research, of course.”`,
image:"assets/kitchen.png",    
choices: [
      { text: "Take the chocolate and keep investigating", action: () => { state.chocolate = true; state.memory++; goTo('investigationContinue') } },
      { text: "Leave the chocolate and keep investigating", action: () =>  goTo('investigationContinue')}
    ]
  },  
  doughnutClue: {
    text: `<h3> Exhibit D: The Doughnut </h3>
It was a half-eaten glazed doughnut, a jagged bite taken out of the side like a shark attack. Tucked into the cardboard box was a scrap of paper with a handwritten confession:

“Mmm, this doughnut is the perfect breakfast food.”

I stared at the note. It was a bold move. A breakfast rebel was on the loose.`,
image:"assets/doughnote.png",
    choices: [
      { text: "Keep the note and the doughnut", action: () => { state.memory++; state.doughnut = true; goTo('investigationContinue'); } },
      { text: "Discard the note", action: () => goTo('kitchen') }
    ]
  },
  investigationContinue: {
    text: () => {
      let text = `The fog in my head was finally starting to lift. The pieces of the puzzle were slowly clicking into place like a tumbler in a lock.

The truth was surfacing, and it looked a lot like a memory I should have never let go of.

Do I keep digging, or am I ready to see the whole picture?`;

      if(state.memory > 3) text += `\n\nKillian grinned, a flash of pure mischief. “You’re right on the edge, Detective. Can you feel it? The moment it all comes back?”`;;
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
 revealSetup: { 
  text: () => {
    let text = `The time for shadow-boxing was over. I turned to Killian. I needed the truth, even if it meant the end of the mystery.`;
    let image = "assets/corkboard.png";
    let choices = [];

    if (state.memory > 3 && state.chocolate && state.doughnut && state.guinness) {
      text += `\n\nThe evidence was overwhelming. The stickers, the snacks, the whispered memories... it all pointed to one person. 
      
      I was ready to crack this case wide open and confront my small associate with the cold, hard facts.`;

      choices = [
        { text: "Confront Killian with the evidence", action: () => { state.ring = true;  document.body.classList.add('confetti-mode'); goTo('endingOne'); } }
      ];
    } else if (state.memory > 1 || state.chocolate || state.doughnut || state.guinness) {
           text += `\n\nI didn't have the full picture yet, but I had enough. The feeling in my gut was louder than the rain outside. 
           
           Killian was holding out on me, and I was going to get something out of him.`;

      choices = [
        { text: "Confront Killian", action: () => { state.ring = true; goTo('endingFour'); } }
      ];
    } else {
           text += `\n\nI was flying blind, but I couldn't shake the suspicion. Killian was the key to everything. 
           
           I decided to play my hand, even if it was a weak one.`;

      choices = [
        { text: "Confront Killian", action: () => goTo('endingThree') }
      ];
    }

    return { text, choices, image };
  }
},

    endingOne: {
text: `<h2> The Final Exhibit </h2>
The office felt different this time. The shadows were longer, but the air was electric. I walked back to my desk, my mind a kaleidoscope of cider, gardens, and sea-green eyes.

And then I saw it. A small, defiant tower of Cheerios standing on my mahogany desk—a tiny monument to a conspiracy that spanned the whole city.

He’d been everywhere. My assistant wasn't just following me; he was the architect of my journey. 

I laid out the evidence like a winning poker hand: the chocolate, the doughnut manifesto, the shards of memory, and those blasted Cheerios. Killian looked at me, a glimmer of genuine professional admiration in his eyes.

“I guess you’ve cracked the vault, Detective.” he said softly. 

With the dramatic flair of a seasoned informant, he slowly removed his tiny sock. Tucked inside, gleaming like a promise, was the ring.

He pressed a toy button. *Click.*

Confetti cannons detonated, filling the air with paper rain. A banner unfurled from the ceiling in a flurry of color: “HAPPY ANNIVERSARY!”

The door burst open. Maisie — the woman from the memories, the eyes from my dreams — came charging in. She crashed into my arms, her kiss effectively ending my career as a lonely detective.

The fog cleared. The "amnesia" vanished. 

“You took my memories… to lead me back to our places? To surprise me?” I asked, breathless.

Maisie laughed, a sound better than any jukebox melody. 

“Yep! I couldn't exactly give you amnesia in real life, so I built you this game instead!”

She pulled me closer. <emphasis>“Happy Anniversary, babe. I’m so glad we made it.”</emphasis>`,
image:"assets/anniversary.png",
choices: [
  { text: "Play Again", action: () => {document.body.classList.remove('confetti-mode');resetState(); goTo('start')} } ] 
}, 

endingTwo: { 
  text: `<h2> The Glitch in the Case </h2>
The world suddenly shattered. Bright, clinical lights pulsed against my retinas, and a sharp, metallic pain lanced through my skull.

The office began to liquefy. The walls shifted into cold, sterile panels, and the rain turned into the rhythmic hum of high-end machinery. The smell of stale coffee was replaced by the biting scent of antiseptic.

I blinked, and a bug-like silhouette hovered over me, its eyes glowing with the cold light of a thousand dying stars. When it spoke, it wasn't a voice—it was a data stream.

"Patient 4792 accidentally broke through memory barriers. Reinitiate memory suppression protocol. Rebooting sequence... Please wait."

The world dissolved into static. I felt myself slipping into a deep, synthetic sleep. When I finally opened my eyes, I was back at my desk, the files scattered, the rain tapping on the glass. 

The truth had been right there, but the machine won. I’m left with nothing but a phantom itch in my brain and the feeling that I almost woke up.`, 

image:"assets/alien.png",  
choices: [ 
    { text: "Reboot Sequence (Play Again)", action: () => {resetState(); goTo('start')} }, 
    ] 
  }, 

endingThree: { 

  text: `<h2> A Cold Goodbye </h2>
I sat across from Killian, my mind a mess of half-formed suspicions and zero proof. I tried to corner him, to demand the truth, but I was playing a game without any cards.

Killian leaned back, a cold, mocking laugh escaping him. “You’re really something, Detective. You think you can accuse a man of my standing without a shred of evidence? You’re out of your depth.”

He stood up, looking down at me with pity. “It's time to go back to sleep.”

Before I could move, he cupped his hand and blew a fine, sweet-smelling dust into my face. My vision blurred. The office spun. The floor rose up to meet me like an old friend.

When I woke up, the desk was empty. No ring. No Killian. Just the rain and the lingering, hollow feeling that I had the answer in my hand and let it slip through my fingers.`, 
image:"assets/office.png",
choices: [ 
  { text: "Begin again", action: () => {resetState(); goTo('start')} }, ]
    },

endingFour: {
  text: `<h2> Close, But No Cigar </h2>
I confronted him with everything I had, but without the full trail of clues, Killian just looked at me with a weary sort of disappointment.

“You’re grasping at straws, Detective. You have the heart for the job, but not the eyes.”

Frustrated, I shoved my hands into my pockets, searching for a piece of chocolate to steady my nerves. 

My fingers brushed something cold. 

I pulled it out—a crumpled note. As it unfolded, the ring tumbled out, clinking against the floorboards.

Killian froze. For a split second, the mask slipped, and I saw a flicker of genuine shock. But then, the professional returned. He laughed it off—a hollow, practiced sound.

“I guess this should go back to its rightful owner, huh?” he said, snatching the ring before I could react. 

“Killian, wait!” I shouted as he turned for the door. “I know you’re hiding the 'Why.' Why the clues? Why the trail?”

He paused at the threshold, his silhouette dark against the hallway light. 

“Because you didn't find them all, Myles. And without the 'all,' you'll never understand the 'Why.' Maybe next time you'll be faster. For now... let’s just forget this happened.”

He vanished into the corridor, taking the ring and the truth with him. I’m left in the silence of an empty office, wondering what I missed.`, 

 image:"assets/despair.png",
 choices: [ { text: "Try to Remember (Play Again)", action: () => {resetState(); goTo('start')} }, ] },
};

function goTo(pass) {
  const passage = passages[pass];
  const sceneImageContainer = document.getElementById("scene-image-container");

  // 1. Determine text, choices, and image
  let content = {
    text: "",
    choices: [],
    image: passage.image
  };

  if (typeof passage.text === 'function') {
    const result = passage.text();
    if (typeof result === 'string') {
      content.text = result;
      content.choices = typeof passage.choices === 'function' ? passage.choices() : passage.choices;
    } else {
      content = result; // overwrite text & choices
      // Ensure the image carries over even if the function returns an object
      if (!content.image) content.image = passage.image; 
    }
  } else {
    content.text = passage.text;
    content.choices = typeof passage.choices === 'function' ? passage.choices() : passage.choices;
    content.image = passage.image;
  }

  // 2. Clear previous choices
  choicesDiv.innerHTML = '';

  // 3. Handle the Image and Paperclip Visibility
  if (content.image) {
    // Show the container (brings back the paperclip)
    sceneImageContainer.style.display = "flex"; 
    sceneImage.src = content.image;
    sceneImage.style.opacity = 0;
    sceneImage.classList.remove("fade-in");

    sceneImage.onload = () => {
      sceneImage.style.opacity = 1;
      sceneImage.classList.add("fade-in");
    };
  } else {
    // Hide the entire container (removes the paperclip)
    sceneImageContainer.style.display = "none";
    sceneImage.src = ""; 
  }

  // 4. Animate story text
  typeWriter(content.text, storyDiv, 5, () => {
    // Add choices AFTER text finishes typing
    if (content.choices) {
      content.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.textContent = choice.text;
        btn.onclick = choice.action;
        choicesDiv.appendChild(btn);
      });
    }

    // Update inventory and memory UI
    updateInventory();
    memoryCount();
  });

  // 5. Reset the text container's fade animation
  storyDiv.classList.remove("fade-in");
  void storyDiv.offsetWidth; // Force reflow
  storyDiv.classList.add("fade-in");
}


// // Start game
// goTo('start');

document.getElementById('start-button').addEventListener('click', () => {
    const splash = document.getElementById('splash-screen');
    splash.classList.add('hidden'); // Fades out the folder
    
    // Start the game after a tiny delay so the fade feels smooth
    setTimeout(() => {
        goTo('start');
    }, 500);
});
