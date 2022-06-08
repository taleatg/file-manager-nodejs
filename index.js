import readline from 'readline';
import { join } from 'path';
import { getUsername } from './src/getUsername.js';
import { navigation } from './src/nwd/navigation.js';
import { list } from './src/nwd/list.js';
import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';
import {calculateHash} from './src/hash/calcHash.js';

//TODO: add absolute path_to_directory

const runFileManager = async () => {
  const username = getUsername();
  let currentDirectory = process.env.HOME || process.env.USERPROFILE;

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
        currentDirectory = await navigation(input.slice(3), currentDirectory);
        break;
      case input === 'up':
        currentDirectory = await navigation('..', currentDirectory);
        break;
      case input === 'ls':
        list(currentDirectory);
        break;
      case input.startsWith('hash '):
        await calculateHash(join(currentDirectory, input.split(' ')[1]));
        break;
      case input.startsWith('compress '):
        await compress(join(currentDirectory, input.split(' ')[1]));
        break;
      case input.startsWith('decompress '):
        await decompress(join(currentDirectory, input.split(' ')[1]));
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
