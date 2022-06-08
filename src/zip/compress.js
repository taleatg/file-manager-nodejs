import fs from 'fs';
import zlib from 'zlib';

export const compress = async (path) => {
  //TODO: add directory compression
  console.log(path)

  try {
    await fs.promises.access(path);
    const readStream = fs.createReadStream(path);
    const writeStream = fs.createWriteStream(`${path}.br`);
    const brotli = zlib.createBrotliCompress();

    readStream.pipe(brotli).pipe(writeStream);
  } catch (err) {
    process.stdout.write('\nOperation failed\n');
  }
}
