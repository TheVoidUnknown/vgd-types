# Quickstart
1. `git clone https://github.com/TheVoidUnknown/vgd-types`
2. `cd ./vgd-types`
3. `npm i`
4. `npm run build`

```ts
import { promises as fs } from 'fs';

// Import everything
import * as vgd from 'vgd-types';

// Or import functions directly
import { deserializeLevelDataSync } from 'vgd-types';

async function main(): void {
  const raw: unknown = fs.readFile('./level.vgd');
  const level = vgd.deserializeLevelDataSync(raw);
  console.log(level);
}

main();
```

## Example
```ts
import * as fs from 'fs';

// Import the stuff we'll need
import { 
  ObjectType, 
  Keyframe, 
  EaseType, 
  getShape, 
  RandomType, 
  MoveKeyframe 
} from 'vgd-types';

// Let's assume you already have a level
// You can read one from your drive with fs.readFileSync and then parse it
const raw: string = fs.readFileSync('./level.vgd').toString();

// We need to parse the raw level data as JSON, and then convert it to a readable format
let level = deserializeLevelDataSync( // We *DE*serialize because it's being converted from a file (serial data) into usable data
  JSON.parse(raw)
); 

// First we'll make our keyframes
let movement: MoveKeyframe[] = [
  { x: 0, y: 0 }, // Default keyframe

  { 
    timestamp: 0.1, // At 1.1 seconds (relative to spawn time)
    x: -100, // Go to -100, 0
    y: 0,
    easing: EaseType.InOutSine // Using InOutSine
  },

  { 
    timestamp: 10, // At 11 seconds (relative to spawn time)
    x: 100, // Go to 100, 0
    y: 0,
    easing: EaseType.Linear // Using Linear
  }
]

// Now to make our object
let newObject: LevelObject = {
  id: "123456890abcdef", // This ID can be anything
  name: "Cool Bullet",

  renderDepth: 30, // same as the editor
  spawnTime: 1,
  origin: { x: 0, y: 0 },

  shape: "CircleFilled",
  objectType: ObjectType.Hit,

  keyframes: {
    move: movement , // Our keyframes from earlier

    // Examples of the values keyframes can have
    scale: [{
      x: 1,
      y: 1,
      randomX: 5,
      randomY: 5,
      randomInterval: 0,
      random: RandomType.Linear
    }],

    rotation: [{ 
      rotation: 45,
      useAbsoluteRotation: true
    }],

    color: [{ 
      color: 6,
      opacity: 80
    }]
  }
}

let objects = level.objects; // This is where the timeline objects live
objects.push(newObject); // Add our new object

// And down here you would write it back to your drive to use in PA
//const newLevel = serializeLevelDataSync(level);
//fs.writeFileSync('./tests/level_edited.vgd', JSON.stringify(newLevel));
```

### TODO
- More documentation for IntelliSense