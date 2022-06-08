import { join, extname } from 'path';
import fs from 'fs';

export const navigation = async (path, currentDirectory) => {
  let newPath = join(currentDirectory, path);

  if (!!extname(newPath)) {
    process.stdout.write('\nInvalid input: you can only navigate to a directory\n');
    return currentDirectory;
  }

  try {
    await fs.promises.access(newPath);
    return newPath;
  } catch (error) {
    process.stdout.write('\nOperation failed\n');
    return currentDirectory;
  }
}
