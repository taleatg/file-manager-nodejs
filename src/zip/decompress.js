import fs from 'fs';
import zlib from 'zlib';

export const decompress = async (path) => {
  //TODO: add directory decompression
  //TODO: fix decompress path_to_file path_to_destination

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
