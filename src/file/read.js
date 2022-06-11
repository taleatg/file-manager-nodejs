import fs from 'fs';

export const read = async (path) => {
  try {
    await fs.promises.access(path);
    const stream = await fs.createReadStream(path, {encoding: 'utf8'});
    await stream.pipe(process.stdout);
  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
