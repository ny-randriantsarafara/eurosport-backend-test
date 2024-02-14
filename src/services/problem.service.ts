import Issue from '../entities/issue.entity';
import Problem from '../entities/problem.entity';

export default class ProblemService {
  private static instance: ProblemService;
  private problems: Problem[];

  private constructor() {
    this.problems = [];
  }

  static getInstance() {
    if (!ProblemService.instance) {
      ProblemService.instance = new ProblemService();
    }
    return ProblemService.instance;
  }

  createProblems(issues: Issue[]): Problem[] {
    const groupedIssues = this.groupIssues(issues);
    const createdProblems = Object.values(groupedIssues).map((issues: Issue[]) => Problem.new(issues));
    this.problems = [...createdProblems];
    return createdProblems;
  }

  private groupIssues(issues: Issue[]): Record<string, Issue[]> {
    return issues.reduce((acc: Record<string, Issue[]>, issue) => {
      const key = `${issue.video}-${issue.category}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(issue);
      return acc;
    }, {});
  }
}
