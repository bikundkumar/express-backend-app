const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

const USERS = [];

const QUESTIONS = [{
  title: "Two states",
  description: "Given an array, return the maximum of the array?",
  testCases: [{
    input: "[1,2,3,4,5]",
    output: "5"
  }]
}];

const SUBMISSIONS = [];

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

// Signup
app.post('/signup', function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const existingUser = USERS.find(user => user.email === email);
  if (!existingUser) {
    USERS.push({ email, password });
    return res.status(200).send('User created');
  } else {
    return res.status(409).send('User already exists');
  }
});

// Login
app.post('/login', function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const user = USERS.find(user => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).send('Invalid email or password');
  }

  const token = Math.random().toString(36).substring(7);
  res.status(200).send({ token });
});

// Get all questions
app.get('/questions', function (req, res) {
  res.status(200).send(QUESTIONS);
});

// Get submissions
app.get("/submissions", function (req, res) {
  res.status(200).send(SUBMISSIONS);
});

// Submit a solution
app.post("/submissions", function (req, res) {
  const { userId, questionId, solution } = req.body;
  if (!userId || !questionId || !solution) {
    return res.status(400).send('Missing required fields');
  }

  const submission = {
    userId,
    questionId,
    solution,
    status: Math.random() < 0.5 ? 'Accepted' : 'Rejected',
    timestamp: new Date().toISOString()
  };

  SUBMISSIONS.push(submission);
  res.status(200).send(submission);
});

// Admin-only: Add a new question
app.post('/questions', function (req, res) {
  const token = req.headers.authorization;

  if (token !== ADMIN_TOKEN) {
    return res.status(403).send('Not authorized');
  }

  const { title, description, testCases } = req.body;
  if (!title || !description || !testCases) {
    return res.status(400).send('Missing required fields');
  }

  const question = { title, description, testCases };
  QUESTIONS.push(question);
  res.status(200).send(question);
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
