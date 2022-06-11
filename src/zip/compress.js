import fs, { access, constants } from 'fs';
import zlib from 'zlib';
import { extname } from 'path';

export const compress = async (args) => {
  const [pathToFile, pathToDestination] = [...args];

  if (!pathToFile || !pathToDestination) {
    process.stdout.write('\nOperation failed\n');
    return;
  }

  try {
    await fs.promises.access(pathToFile);

    const ext = extname(pathToDestination) ? '' : extname(pathToFile);
    const compressFile = pathToDestination + ext + '.br';

    access(compressFile, constants.F_OK, async (err) => {
      if (err) {
        const readStream = fs.createReadStream(pathToFile);
        const writeStream = fs.createWriteStream(compressFile);
        const brotli = zlib.createBrotliCompress();

        readStream.pipe(brotli).pipe(writeStream);
      } else {
        process.stdout.write('\nOperation failed: file already exists\n');
      }
    });
  } catch (err) {
    process.stdout.write(`\nOperation failed: "${err}"\n`);
  }
}
