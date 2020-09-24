const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const resourceRouter = require('./routes/resourceRouter');
const userRouter = require('./routes/userRouter');
const techRouter = require('./routes/techRouter');
const PORT = 3000;


// Parse request body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up routers
app.use('/resource', resourceRouter);
app.use('/user', userRouter);
app.use('/tech', techRouter);

app.use('/', express.static(path.resolve(__dirname, '../../build')));
// Send main app
// app.get('/', (req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.resolve(__dirname, './client/index.html'));
// });

// Catch-all route handler
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

// Global error handler
app.use((err, req, res, next) => {
  console.log('invoking global error handler');
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
