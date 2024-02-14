import { ThirdPartyApp } from '../object-values/third-party.app';
import Problem from '../entities/problem.entity';
import { ProblemStatus } from '../object-values/problem.status';
import ThirdPartyTicket from '../entities/third-party-ticket';
import CreateTicketDto from '../dtos/create-ticket.dto';
import AppOneTicket from '../entities/app-one-ticket.entity';
import AppTwoTicket from '../entities/app-two-ticket.entity';

export default class ThirdPartyAppService {
  private static instance: ThirdPartyAppService;
  appOneTickets: ThirdPartyTicket[];
  appTwoTickets: ThirdPartyTicket[];

  constructor() {
    this.appOneTickets = [];
    this.appTwoTickets = [];
  }

  static getInstance() {
    if (!ThirdPartyAppService.instance) {
      ThirdPartyAppService.instance = new ThirdPartyAppService();
    }

    return ThirdPartyAppService.instance;
  }

  isValidThirdPartyApps(appName: any): appName is ThirdPartyApp {
    return Object.values(ThirdPartyApp).includes(appName);
  }

  createTicket(createTicketDto: CreateTicketDto, problem: Problem): ThirdPartyTicket {
    if (problem.status !== ProblemStatus.READY) {
      throw new Error('Problem should have status READY to create a ticket');
    }
    if (createTicketDto.appName === ThirdPartyApp.APP_ONE) {
      const createdTicket = AppOneTicket.new({
        reference: createTicketDto.reference,
        count: createTicketDto.count,
      });
      this.appOneTickets.push(createdTicket);
      return createdTicket;
    }
    const createdTicket = AppTwoTicket.new({
      problemRef: createTicketDto.reference,
      issuesCount: createTicketDto.count,
    });
    this.appTwoTickets.push(createdTicket);
    return createdTicket;
  }
}
