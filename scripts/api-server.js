const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { error } = require('console');

const app = express();
const port = 3000;

const rootDir = path.join(__dirname, '..');
const catalogsFile = path.join(rootDir, '/scripts/assets/catalogs.json');
const questionsDir = path.join(rootDir, '/scripts/assets/questions');

app.use(cors());
app.use(express.json());

// Beim Serverstart catalogs.json neu erzeugen
execFileSync('node', ['scripts/generate-catalogs.js'], {
  cwd: rootDir,
  stdio: 'inherit',
});

app.get('/api/catalogs', (req, res) => {
  const catalogs = JSON.parse(fs.readFileSync(catalogsFile, 'utf8'));
  res.json(catalogs);
});

app.get('/api/questions/:examId/:topicId', (req, res) => {
  const { examId, topicId } = req.params;
  const questionFile = path.join(questionsDir, examId, `${topicId}.json`);

  if (!fs.existsSync(questionFile)) {
    return res.status(404).json({
      error: 'Question catalog not found',
      examId,
      topicId,
    });
  }

  const questions = JSON.parse(fs.readFileSync(questionFile, 'utf8'));
  res.json(questions);
});

app.get('/api/questions/:examId', (req, res) => {
  const { examId } = req.params;
  const examDir = path.join(questionsDir, examId);
  if(!fs.existsSync(examDir)) {
    return res.status(404).json({ error: 'Exam not found', examId});
  }

  let allQuestions = [];
  const files = fs.readdirSync(examDir);

  files.forEach(file => {
    if(file.endsWith('.json')) {
      const filePath = path.join(examDir, file);
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      allQuestions = allQuestions.concat(questions);
    }
  });

  res.json(allQuestions);
});

app.listen(port, () => {
  console.log(`API läuft auf http://localhost:${port}`);
});
