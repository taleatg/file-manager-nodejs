import fs from 'fs';

export const add = (path) => {
  try {
    fs.createWriteStream(path, {encoding: 'utf8'})
  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
