export interface DailyLog {
  log_date: string;
  cleaner_count: number;
  homeowner_count: number;
}

export interface WeeklyLog {
  week_start: string;
  week_end: string;
  cleaner_count: number;
  homeowner_count: number;
}

export interface MonthlyLog {
  year: number;
  month: number;
  cleaner_count: number;
  homeowner_count: number;
}
