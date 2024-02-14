import { Request, Response } from 'express';

import { ThirdPartyApp } from '../object-values/third-party.app';
import ProblemService from '../services/problem.service';
import ThirdPartyAppService from '../services/third-party-app.service';

export const createTicketController = (req: Request, res: Response) => {
  const {
    params: { thirdPartyApp, problemId },
  } = req;
  const { body: args } = req;
  const thirdPartyAppService = ThirdPartyAppService.getInstance();
  if (!thirdPartyAppService.isValidThirdPartyApps(thirdPartyApp)) {
    res.status(400).send({ message: 'Invalid third party app' });
    return;
  }
  const createTicketDto = {
    appName: thirdPartyApp,
    reference: thirdPartyApp === ThirdPartyApp.APP_ONE ? args.problemId : args.problemRef,
    count: thirdPartyApp === ThirdPartyApp.APP_ONE ? args.count : args.issuesCount,
  };
  try {
    const problemService = ProblemService.getInstance();
    const problem = problemService.getProblemById(problemId);
    const createdTicket = thirdPartyAppService.createTicket(createTicketDto, problem);
    res.status(201).send(createdTicket);
  } catch (error: any) {
    res.status(400).send({ message: error?.message });
  }
};
