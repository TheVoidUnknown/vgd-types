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