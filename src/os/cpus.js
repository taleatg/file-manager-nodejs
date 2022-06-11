import os from 'os';

export const getInfoAboutCpus = () => {
  const cpus = os.cpus();
  const list = [];

  cpus.map(item => {
    list.push({
      model: item.model,
      'speed (GHz)': item.speed / 1000,
    });
  })

  process.stdout.write(`\nOverall amount of CPUS: ${cpus.length}\n`);
  console.table(list);
}
