import fs from 'fs';

export const read = async (path) => {
  try {
    const stream = fs.createReadStream(path, {encoding: 'utf8'});
    await stream.pipe(process.stdout);
  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
