import fs, { access, constants } from 'fs';

export const add = (path) => {
  try {
    access(path, constants.F_OK, (err) => {
      err
        ? fs.createWriteStream(path, {encoding: 'utf8'})
        : process.stdout.write('\nOperation failed: file already exists\n');
    });
  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
