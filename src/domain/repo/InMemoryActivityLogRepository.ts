import { ActivityLog } from "../entities/Activitylog";
import { ActivityLogRepository } from "../repo/ActivityLogRepository";

export class InMemoryActivityLogRepository implements ActivityLogRepository {
  private logs: ActivityLog[] = [];

  async create(log: ActivityLog): Promise<void> {
    this.logs.push(log);
  }

  async findAll(): Promise<ActivityLog[]> {
    return this.logs;
  }
}