# Text Adventure Game
## The Case of the Missing Ring

An interactive noir-style detective story built with vanilla HTML, CSS, and JavaScript.

Built as an anniversary gift for my partner, so contains references to our lives. 

Players navigate a branching narrative, uncover clues, manage inventory, and make choices that affect the outcome of the case — all presented with a cinematic typewriter effect and scene-based imagery.

### Tech Stack

- `HTML`
- `CSS`
- `Javascript`


### Structure

```
Anno-Game/
│
└── Frontend/
    │
    ├── index.html
    ├── style.css
    ├── game.js
    │
    └── assets/
        ├── desk.png
        ├── map.png
        └── (other scene images)
```

### How to Run locally

Using VS Code (Recommended)

1. Install Live Server extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### Deployment



### How the Game Works

Each story section is defined as a passage in `game.js`.

Example:

```javascript
office: {
  text: `<h1>The Case Begins</h1>
         The rain tapped the windows...`,
  image: "assets/office.png",
  choices: [
    { text: "Look around", action: () => goTo("search") },
    { text: "Leave the office", action: () => goTo("street") }
  ]
}
```

The `goTo()` function:
- Renders text with a typewriter effect
- Loads scene-specific images
- Displays available choices
- Updates inventory and memory

### Game Mechanics
- Inventory System - Tracks collected items
- Memory Counter - Represents player progress
- Conditional Choices - Some passages depend on game state.

### Endings

There are currently 4 possible endings. 
-True Ending
-Chaos Ending
-Fail Ending
-Nearly-There Ending

### Purpose

This project was purely for personal and educational purposes.
