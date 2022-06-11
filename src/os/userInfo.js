import os from 'os';

export const getUserInfo = (type) => {
  try {
    type === 'username'
    ? process.stdout.write(`\nUsername: ${os.userInfo().username}\n`)
    : process.stdout.write(`\nHomedir: ${os.userInfo().homedir}\n`);
  } catch {
    process.stdout.write('Operation not permitted\n');
  }
}
