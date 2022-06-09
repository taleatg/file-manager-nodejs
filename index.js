import readline from 'readline';
import os from 'os';
import { join, isAbsolute } from 'path';
import { getUsername } from './src/getUsername.js';
import { navigation } from './src/nwd/navigation.js';
import { list } from './src/nwd/list.js';
import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';
import { calculateHash } from './src/hash/calcHash.js';
import { getInfoAboutCpus } from './src/os/cpus.js';
import { getUserInfo } from './src/os/userInfo.js';

const runFileManager = async () => {
  const username = getUsername();
  let currentDirectory = process.env.HOME || process.env.USERPROFILE;

  const checkPath = (path) => {
    const url = path?.split(' ')[1] || path; //TODO: fix for folder with space
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
      case input === 'os --EOL':
        process.stdout.write(os.EOL.replace('\n', '\\n'));
        process.stdout.write(' is default system End-Of-Line\n');
        break;
      case input === 'os --cpus':
        getInfoAboutCpus();
        break;
      case input === 'os --homedir':
        getUserInfo('homedir');
        break;
      case input === 'os --username':
        getUserInfo('username');
        break;
      case input === 'os --architecture':
        process.stdout.write(`\nCPU architecture for which Node.js binary has compiled is ${os.arch()}\n`);
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
