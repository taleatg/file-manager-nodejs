import readline from 'readline';
import { join, isAbsolute } from 'path';
import { getUsername } from './src/getUsername.js';
import { navigation } from './src/nwd/navigation.js';
import { list } from './src/nwd/list.js';
import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';
import {calculateHash} from './src/hash/calcHash.js';

const runFileManager = async () => {
  const username = getUsername();
  let currentDirectory = process.env.HOME || process.env.USERPROFILE;

  const checkPath = (path) => {
    const url = path?.split(' ')[1] || path;
    return isAbsolute(url) ? url : join(currentDirectory, url);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', async (input) => {
    switch (true) {
      case input === '.exit':
        rl.close();
        break;
      case input.startsWith('cd '):
        currentDirectory = await navigation(checkPath(input), currentDirectory);
        break;
      case input === 'up':
        currentDirectory = await navigation(checkPath('..'));
        break;
      case input === 'ls':
        list(currentDirectory);
        break;
      case input.startsWith('hash '):
        await calculateHash(checkPath(input));
        break;
      case input.startsWith('compress '):
        await compress(checkPath(input));
        break;
      case input.startsWith('decompress '):
        await decompress(checkPath(input));
        break;
      default:
        process.stdout.write('\nInvalid input\n');
        break;
    }

    return process.stdout.write(`\nYou are currently in ${currentDirectory}\n`);
  });

  process.on('exit', () => {
    process.stdout.write(`\nThank you for using File Manager, ${username}!\n`);
  });
}

runFileManager();
