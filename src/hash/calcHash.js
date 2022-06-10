import fs from 'fs';
import crypto from 'crypto';
import { extname } from 'path';

export const calculateHash = async (path) => {
  if (!extname(path)) {
    process.stdout.write('\nOperation failed: you need to enter path to file\n');
    return;
  }

  try {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(path);

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const hex = hash.digest('hex');
      process.stdout.write(`\nHash: ${hex}\n`);
    });
  } catch {
    process.stdout.write('\nOperation failed\n');
  }
};
