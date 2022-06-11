export const getUsername = () => {
  const homedir = process.env.HOME || process.env.USERPROFILE;
  let username = process.argv[2];

  if (username.includes('--username=')) {
    username = username.split('=')[1];
    process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
    process.stdout.write(`You are currently in ${homedir}\n`);
  } else {
    process.stdout.write('\nRun the program as follows - "npm run start -- --username=your_user_name"\n')
  }

  return username;
}
