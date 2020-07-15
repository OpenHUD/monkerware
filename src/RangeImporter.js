import fs from 'fs';
import Path from 'path';


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
    const hand = lines[2*i].replace(/\r/g, '');
    const data = lines[2*i + 1].replace(/\r/g, '');
    const [p, ev1000] = data.split(';');

    map.set(hand, { p: parseFloat(p), ev: ev1000/1000 });
  }
  return map;
};

const importFile = ({ path }) => {
  const rng = fs.readFileSync(path, 'utf8');
  return importRng(rng);
};

const importDirectory = ({ path }) => {
  const files = fs.readdirSync(path, 'utf8');

  const map = new Map();
  files.forEach(file => {
    const branchName = Path.parse(file).name;
    const range = importFile({ path: Path.resolve(path, file) });
    map.set(branchName, range);
  })

  return map;
};

export { importFile, importDirectory };