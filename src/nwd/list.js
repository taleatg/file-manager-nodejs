import { readdir } from 'fs/promises';
import path from 'path';

export const list = async (currentDirectory) => {
  const pathFromFile = currentDirectory;
  const result = [];
  const list = [];

  try {
    const files = await readdir(pathFromFile);

    for (const fileName of files) {
      result.push(fileName);
    }

    if (result.length) {
      let type = '';

      result.map(async (name) => {
        list.push({
          type: !!path.extname(`${pathFromFile}/${name}`) ? 'file' : 'directory',
          name: name});
      });

    } else {
      process.stdout.write('Nothing found\n');
    }

  } catch {
    process.stdout.write('Operation not permitted\n');
  }

  console.table(list);
}
