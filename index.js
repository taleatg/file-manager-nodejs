import readline from 'readline';
import os from 'os';
import { pathCheck, pathChekWithOtherParam, pathChekWithFileName } from './src/pathCheck.js';
import { getUsername } from './src/getUsername.js';
import { navigation } from './src/nwd/navigation.js';
import { list } from './src/nwd/list.js';
import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';
import { calculateHash } from './src/hash/calcHash.js';
import { getInfoAboutCpus } from './src/os/cpus.js';
import { getUserInfo } from './src/os/userInfo.js';
import { read } from './src/file/read.js';
import { add } from './src/file/add.js';
import { rename } from './src/file/rename.js';
import { copy } from './src/file/copy.js';
import { move } from './src/file/move.js';
import { remove } from './src/file/remove.js';

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
        currentDirectory = await navigation(pathCheck(input, currentDirectory), currentDirectory);
        break;
      case input === 'up':
        currentDirectory = await navigation(pathCheck('..', currentDirectory));
        break;
      case input === 'ls':
        await list(currentDirectory);
        break;

      case input.startsWith('cat '):
        await read(pathCheck(input, currentDirectory));
        break;
      case input.startsWith('add '):
        add(pathCheck(input, currentDirectory));
        break;
      case input.startsWith('rn '):
        await rename(pathChekWithOtherParam(input, currentDirectory));
        break;
      case input.startsWith('cp '):
        await copy(pathChekWithFileName(input, currentDirectory));
        break;
      case input.startsWith('mv '):
        await move(pathChekWithFileName(input, currentDirectory));
        break;
      case input.startsWith('rm '):
        await remove(pathCheck(input, currentDirectory));
        break;

      case input === 'os --EOL':
        process.stdout.write('\n' + JSON.stringify(os.EOL));
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
        process.stdout.write(`\nCPU architecture for which Node.js binary has compiled is "${os.arch()}"\n`);
        break;

      case input.startsWith('hash '):
        await calculateHash(pathCheck(input, currentDirectory));
        break;

      case input.startsWith('compress '):
        await compress(pathChekWithFileName(input, currentDirectory));
        break;
      case input.startsWith('decompress '):
        await decompress(pathChekWithFileName(input, currentDirectory));
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
