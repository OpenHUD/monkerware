import fs from 'fs';
import path from 'path';


const importRng = rng => {
  // AA
  // 0.0;-1000.0000000000964
  // A2s
  // 0.0;-1000.0000000000285
  // A2o
  // 0.0;-1000.000000000044
  // ...
  // last line is empty
  const lines = rng.split('\n');

  const numHands = (lines.length - 1) / 2;

  const map = new Map();
  for (let i = 0; i < numHands; ++i) {
    const hand = lines[2*i];
    const data = lines[2*i + 1];
    const [p, ev1000] = data.split(';');

    map.set(hand, { p: parseFloat(p), ev: ev1000/1000 });
  }
  return map;
};

const importFile = ({ file }) => {
  const rng = fs.readFileSync(file, 'utf8');
  return importRng(rng);
};

const importDirectory = ({ directory }) => {
  const files = fs.readdirSync(directory, 'utf8');

  const map = new Map();
  files.forEach(file => {
    const branchName = path.parse(file).name;
    const range = importFile({ file: path.resolve(directory, file) });
    map.set(branchName, range);
  })

  return map;
};

export { importFile, importDirectory };