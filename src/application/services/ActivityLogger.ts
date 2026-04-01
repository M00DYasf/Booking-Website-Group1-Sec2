import { ActivityLogRepository } from "../../domain/repo/ActivityLogRepository";
import { ActivityLog } from "../../domain/entities/Activitylog";

export class ActivityLogger {
  constructor(private repo: ActivityLogRepository) {}

  async log(action: string, userId: string | null, resource: string, details: string) {
    const log = new ActivityLog(
      crypto.randomUUID(),
      action,
      userId,
      resource,
      details,
      new Date()
    );

    await this.repo.create(log);
  }
}