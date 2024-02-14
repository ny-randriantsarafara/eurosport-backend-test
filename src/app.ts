import express from 'express';
import { createIssuesController } from './controllers/issue.controller';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/issues', createIssuesController);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
