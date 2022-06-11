import fs from 'fs';
import { extname } from 'path';

export const read = async (path) => {
  if (!extname(path)) {
    process.stdout.write('\nOperation failed: you can read only file\n');
    return;
  }

  try {
    await fs.promises.access(path);
    const stream = await fs.createReadStream(path, {encoding: 'utf8'});
    await stream.pipe(process.stdout);
  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
