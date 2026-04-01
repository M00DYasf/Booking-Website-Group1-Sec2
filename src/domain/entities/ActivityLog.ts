export class ActivityLog {
  constructor(
    public id: string,
    public action: string,         // something like "CREATE_BOOKING" or "ACCEPTED_BOOKING"
    public userId: string | null,  // null = guest
    public resource: string,       // what the booking was for
    public details: string,        // other misc details with the booking like location or handle requirements
    public timestamp: Date         // time of change
  ) {}
}