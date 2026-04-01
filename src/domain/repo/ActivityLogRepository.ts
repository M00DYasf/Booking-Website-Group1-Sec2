import { ActivityLog } from "../entities/Activitylog";

export interface ActivityLogRepository {
  create(log: ActivityLog): Promise<void>;
  findAll(): Promise<ActivityLog[]>;
}