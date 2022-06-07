import fs from 'fs';
import { readdir } from 'fs/promises';

export const list = async (currentDirectory) => {
  const pathFromFile = currentDirectory;
  const result = [];

  try {
    const files = await readdir(pathFromFile);

    for (const fileName of files) {
      result.push(fileName);
    }

    if (result.length) {
      result.forEach(name => {
        fs.stat(`${pathFromFile}/${name}`, (err, stats) => {
          if (err) {
            return process.stdout.write('Operation failed\n');
          }

          stats.isDirectory()
            ? process.stdout.write(`folder: ${name}\n`)
            : process.stdout.write(`file: ${name}\n`);
        });
      })
    } else {
      process.stdout.write('Nothing found');
    }
  } catch {
    process.stdout.write('Operation not permitted\n');
  }

}
