import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useLogsAPI } from "../api/logs";
import type { ComputedRef } from "vue";

const { getDailyLogs, getWeeklyLogs, getMonthlyLogs } = useLogsAPI();
const useQueryLog = () => {
  function getDaily(startDate: string, endDate: string, enabled: ComputedRef<boolean>) {
    const { data, isFetched } = useQuery({
      queryKey: ["dailyLogs"],
      queryFn: () => getDailyLogs(startDate, endDate),
      placeholderData: keepPreviousData,
      enabled: enabled,
    });
    return { data, isFetched };
  }

  function getWeekly(startDate: string, endDate: string, enabled: ComputedRef<boolean>) {
    const { data, isFetched } = useQuery({
      queryKey: ["weeklyLogs"],
      queryFn: () => getWeeklyLogs(startDate, endDate),
      placeholderData: keepPreviousData,
      enabled: enabled,
    });
    return { data, isFetched };
  }

  function getMonthly(startDate: string, endDate: string, enabled: ComputedRef<boolean>) {
    const { data, isFetched } = useQuery({
      queryKey: ["monthlyLogs"],
      queryFn: () => getMonthlyLogs(startDate, endDate),
      placeholderData: keepPreviousData,
      enabled: enabled,
    });
    return { data, isFetched };
  }

  return {
    getDaily,
    getWeekly,
    getMonthly,
  };
};

export { useQueryLog };
