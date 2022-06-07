import fs from 'fs';
import { readdir } from 'fs/promises';

export const list = async (currentDirectory) => {
  const pathFromFile = currentDirectory;
  const files = await readdir(pathFromFile);
  const result = [];

  for (const fileName of files) {
    result.push(fileName);
  }

  result.forEach(name => {
    fs.stat(`${pathFromFile}/${name}`, (err, stats) => {
      stats.isDirectory()
        ? process.stdout.write(`folder: ${name}\n`)
        : process.stdout.write(`file: ${name}\n`);
    });
  })
}
