import { join } from 'path';
import { access, constants } from 'fs';

export const navigation = (path, currentDirectory) => {
  let newPath = join(currentDirectory, path);

  access(newPath, constants.F_OK, async (err) => {
    if (err) {
      process.stdout.write('\nOperation failed\n');
      newPath = currentDirectory;
    }
  });

  return newPath;
}
