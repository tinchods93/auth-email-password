import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import userRouter from './routes/routers/userRouter/userRouter';
import Database from '../resources/database/Database';
import requestLogger from './routes/middlewares/requestLogger';
import adminRouter from './routes/routers/adminRouter/adminRouter';

dotenv.config();
const app = express();
const { PORT, SESSION_SECRET_KEY, DB_NAME, USER_TABLE_NAME } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SESSION_SECRET_KEY ?? '',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(requestLogger);

app.use('/users', userRouter);
app.use('/admin', adminRouter);

app.get('/', (request, response) => {
  response.status(200).send('INICIO');
});

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    const database = Database(DB_NAME ?? '');
    database.addTable(USER_TABLE_NAME ?? '');
  })
  .on('error', (error) => {
    console.log('Error starting server:', error);
  });
