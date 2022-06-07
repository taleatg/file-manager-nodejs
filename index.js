import readline from 'readline';
import { getUsername } from './src/getUsername.js';
import { navigation } from './src/file/navigation.js';
import { list } from './src/file/list.js';

const runFileManager = async () => {
  const username = getUsername();
  let currentDirectory = process.env.HOME || process.env.USERPROFILE;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    switch (true) {
      case input === '.exit':
        rl.close();
        break;
      case input.startsWith('cd '):
        currentDirectory = navigation(input.slice(3), currentDirectory);
        // process.stdout.write(`\nYou are currently in ${currentDirectory}\n`);
        break;
      case input === 'up':
        currentDirectory = navigation('..', currentDirectory);
        // process.stdout.write(`\nYou are currently in ${currentDirectory}\n`);
        break;
      case input === 'ls':
        list(currentDirectory);
        break;
      default:
        process.stdout.write('\nInvalid input\n');
        break;
    }

    process.stdout.write(`\nYou are currently in ${currentDirectory}\n`);
  });

  process.on('exit', () => {
    process.stdout.write(`\nThank you for using File Manager, ${username}!\n`);
  });
}

runFileManager();
