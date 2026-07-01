const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, 'assets/questions');
const outputFile = path.join(__dirname, 'assets/catalogs.json');

const exams = [];

const examFolders = fs.readdirSync(questionsDir, { withFileTypes: true });

for (const exam of examFolders) {
  if (!exam.isDirectory()) continue;

  const examPath = path.join(questionsDir, exam.name);

  const topics = fs
    .readdirSync(examPath)
    .filter((file) => file.endsWith('.json'))
    .map((file) => ({
      id: path.basename(file, '.json'),
      title: path.basename(file, '.json'),
    }));

  exams.push({
    id: exam.name,
    title: exam.name.toUpperCase(),
    topics,
  });
}

fs.writeFileSync(outputFile, JSON.stringify({ exams }, null, 2));

console.log('catalogs.json erfolgreich erstellt.');
