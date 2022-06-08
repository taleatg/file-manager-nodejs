import crypto from 'crypto';
import { readFile } from 'fs/promises';
import { extname } from 'path';

export const calculateHash = async (path) => {
  if (extname(path).length === 0) {
    process.stdout.write('\nOperation failed: you need to enter path to file\n');
    return;
  }

  await readFile(path, 'utf8')
    .then((data) => {
      const hash = crypto.createHash('sha256');
      const hex = hash.update(data).digest('hex');
      process.stdout.write(`\nHash: ${hex}\n`);
  })
    .catch((err) => {
      process.stdout.write('\nOperation failed\n');
  });
};
