import { join, extname } from 'path';
import fs from 'fs';

export const navigation = async (path, currentDirectory) => {

  if (!!extname(path)) {
    process.stdout.write('\nOperation failed: you can only navigate to a directory\n');
    return currentDirectory;
  }

  try {
    await fs.promises.access(path);
    return path;
  } catch (error) {
    process.stdout.write('\nOperation failed\n');
    return currentDirectory;
  }
}
