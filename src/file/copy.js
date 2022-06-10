import fs, { access, constants } from 'fs';
import { join, basename } from 'path';

//TODO: fix path to directory

export const copy = async (args) => {
  const [pathRead, pathWrite] = [...args];

  if (!pathRead || !pathWrite) {
    process.stdout.write('\nOperation failed\n');
    return;
  }

  const fileName = basename(pathRead);

  try {
    await fs.promises.access(pathWrite);

    access(pathRead, constants.F_OK, (err) => {
      err
        ? process.stdout.write('\nOperation failed: file not found\n')
        : access(join(pathWrite, fileName), constants.F_OK, async (err) => {

          if (err) {
            const readStream = fs.createReadStream(pathRead);
            const writeStream = fs.createWriteStream(join(pathWrite, fileName));

            await readStream.pipe(writeStream);
          }
        });
    });

  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
