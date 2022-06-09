import fs from 'fs';

export const read = (path) => {
  try {
    const stream = fs.createReadStream(path, {encoding: 'utf8'});
    stream.pipe(process.stdout);
  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
