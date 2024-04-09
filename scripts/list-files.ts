import fs from 'fs';
import path from 'path';

const userIconsDir = './public/assets/avatars';

const userIconAssets: { name: string; path: string }[] = [];

fs.readdirSync(userIconsDir).forEach(file => {
  userIconAssets.push({ name: file, path: path.join(userIconsDir, file) });
});

console.log(userIconAssets);