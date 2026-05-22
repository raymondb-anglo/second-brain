import express from 'express';
import cors from 'cors';
import notesRouter from './routes/notes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/notes', notesRouter);

app.get('/', (_, res) => {
  res.json({
    status: 'ok',
    service: 'Second Brain API',
  });
});

export default app;