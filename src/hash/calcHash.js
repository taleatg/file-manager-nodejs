import fs from 'fs';
import crypto from 'crypto';
import { extname } from 'path';

export const calculateHash = async (path) => {
  if (!extname(path)) {
    process.stdout.write('\nOperation failed: you need to enter path to file\n');
    return;
  }

  try {
    await fs.promises.access(path);
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(path);
    hash.setEncoding('hex');

    return new Promise((resolve) => {
      stream.on('end', () => {
        hash.end();
        resolve(process.stdout.write(`\nHash: ${hash.read()}\n`));
      });
      stream.pipe(hash)
    });
  } catch (err) {
    process.stdout.write(`\nOperation failed: "${err}"\n`);
  };
};
