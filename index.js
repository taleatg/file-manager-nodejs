import readline from 'readline';
import { getUsername } from './src/getUsername.js';
import { navigation } from './src/nwd/navigation.js';
import { list } from './src/nwd/list.js';

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
