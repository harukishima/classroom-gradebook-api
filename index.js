import express from 'express';
import cors from 'cors';
import authRouter from './routers/auth.route.js';
import userRouter from './routers/user.route.js';
import classRouter from './routers/class.route.js';
import { connectMongoDb } from './db.js';
import config from './config/index.js';
const { port, mongourl } = config;

connectMongoDb(mongourl);

const app = express();

const corsConfig = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRouter);

app.use('/user', userRouter);

app.use('/class', classRouter);

//Not found handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
