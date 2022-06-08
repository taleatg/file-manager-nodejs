import fs from 'fs';
import zlib from 'zlib';

export const decompress = async (path) => {
  //TODO: add directory decompression

  try {
    await fs.promises.access(path);
    const readStream = fs.createReadStream(path);
    const writeStream = fs.createWriteStream(`${path}.txt`);
    const brotli = zlib.createBrotliDecompress();

    readStream.pipe(brotli).pipe(writeStream);
  } catch (err) {
    process.stdout.write('\nOperation failed\n');
  }
}
