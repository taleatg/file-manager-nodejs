import readline from 'readline';
import { getUsername } from './src/getUsername.js';
import { list } from './src/file/ls.js';

const runFileManager = async () => {
  const username = getUsername();
  const currentDirectory = process.env.HOME || process.env.USERPROFILE;;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    switch (input) {
      case '.exit':
        rl.close();
        break;
      case 'ls':
        list(currentDirectory);
        break;
      default:
        process.stdout.write('Invalid input\n');
    }
  });

  process.on('exit', () => {
    process.stdout.write(`Thank you for using File Manager, ${username}!\n`);
  });
}

runFileManager();
