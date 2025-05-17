import type { DailyLog, MonthlyLog, WeeklyLog } from "@/types/log";
import { fetcher } from "@/utils/fetcher";

const useLogsAPI = () => {
  async function getDailyLogs(startDate: string, endDate: string) {
    const searchParams = new URLSearchParams({
      startDate,
      endDate,
    });
    const res = await fetcher(`/logs/daily?${searchParams.toString()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch daily logs");
    }
    return res.json<DailyLog[]>();
  }

  async function getWeeklyLogs(startDate: string, endDate: string) {
    const searchParams = new URLSearchParams({
      startDate,
      endDate,
    });
    const res = await fetcher(`/logs/weekly?${searchParams.toString()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch weekly logs");
    }
    return res.json<WeeklyLog[]>();
  }

  async function getMonthlyLogs(startDate: string, endDate: string) {
    const searchParams = new URLSearchParams({
      startDate,
      endDate,
    });
    const res = await fetcher(`/logs/monthly?${searchParams.toString()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch monthly logs");
    }
    return res.json<MonthlyLog[]>();
  }

  return { getDailyLogs, getWeeklyLogs, getMonthlyLogs };
};

export { useLogsAPI };
