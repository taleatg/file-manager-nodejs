import fs, { access, constants } from 'fs';
import { dirname, extname, join } from 'path';


export const rename = async (args) => {
  const [path, newName] = [...args];

  if (!path || !newName) {
    process.stdout.write('\nOperation failed\n');
    return;
  }

  const __dirname = dirname(path);
  let fileRename = '';

  if (!extname(path)) {
    process.stdout.write('\nOperation failed: you didn\'t enter a file extension\n');
    return;
  } else {
    const extName = !extname(newName) ? extname(path) : extname(newName);
    fileRename = join(__dirname, newName + extName);
  }

  access(path, constants.F_OK, (err) => {
    err
      ? process.stdout.write('\nOperation failed\n')
      : access(fileRename, constants.F_OK, (err) => {
        err
          ? fs.rename(path, fileRename, (err) => {
            if (err) {
              process.stdout.write('\nOperation failed\n');
            }
          })
          : process.stdout.write('\nOperation failed: file already exists\n');
      });
  });
}
