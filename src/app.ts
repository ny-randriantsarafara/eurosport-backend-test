import express from 'express';
import { createIssuesController } from './controllers/issue.controller';
import { changeProblemStatusController } from './controllers/problem.controller';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/issues', createIssuesController);

app.post('/change-status/:status', changeProblemStatusController);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
