import readline from 'readline';

const runFileManager = async () => {
  let username = process.argv[2];

  if (username.includes('--username=')) {
    username = username.split('=')[1];
    console.log(`Welcome to the File Manager, ${username}!`);
  } else {
    console.log('Run the program as follows - "npm run start -- --username=your_user_name"')
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    switch (input) {
      case '.exit':
        console.log(`Thank you for using File Manager, ${username}!`);
        rl.close();
    }
  });

  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}!`);
  });
}

runFileManager();
