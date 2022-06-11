import fs from 'fs';

export const remove = async (path) => {
  try {
    await fs.promises.access(path);
    await fs.unlink(path, (err) => {
      if (err) {
        process.stdout.write('\nOperation failed');
      }
    });
  } catch {
    process.stdout.write('\nOperation failed\n');
  }
}
