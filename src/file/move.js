import fs, { access, constants } from 'fs';
import { join, basename } from 'path';

export const move = async (args) => {
  const [pathRead, pathWrite] = [...args];

  if (!pathRead || !pathWrite) {
    process.stdout.write('\nOperation failed\n');
    return;
  }

  const fileName = basename(pathRead);

  try {
    access(join(pathWrite, fileName), constants.F_OK, (err) => {
      err
        ? access(pathRead, constants.F_OK, (err) => {
          err
            ? process.stdout.write('\nOperation failed: file not found\n')
            : access(join(pathWrite, fileName), constants.F_OK, async (err) => {

              if (err) {
                const readStream = fs.createReadStream(pathRead);
                const writeStream = fs.createWriteStream(join(pathWrite, fileName));

                await readStream.pipe(writeStream);

                readStream.on('end', () => {
                  fs.unlink(pathRead, (err) => {
                    if (err) {
                      process.stdout.write('\nOperation failed');
                    }
                  });
                });

              } else {
                process.stdout.write('\nOperation failed: file already exists\n');
              }

            });
        })
        : process.stdout.write('\nOperation failed: file already exists\n');
    });

  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
