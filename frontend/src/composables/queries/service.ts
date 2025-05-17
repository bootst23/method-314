import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useServiceAPI } from "@/composables/api/service";

const { get, getAll, getAllByCleanerId, getAllByHomeOwnerId } = useServiceAPI();
const useQueryService = () => {
  function getService(id: number) {
    const { data, isFetched } = useQuery({
      queryKey: ["service", id],
      queryFn: () => get(id),
      placeholderData: keepPreviousData,
    });
    return { data, isFetched };
  }

  function getAllServicesByHomeOwnerId(id: number) {
    const { data, isFetched } = useQuery({
      queryKey: ["shortlisted"],
      queryFn: () => getAllByHomeOwnerId(id),
      placeholderData: keepPreviousData,
    });
    return { data, isFetched };
  }

  function getAllServices() {
    const { data, isFetched } = useQuery({
      queryKey: ["services"],
      queryFn: () => getAll(),
      placeholderData: keepPreviousData,
    });
    return { data, isFetched };
  }

  function getAllServicesByCleanerId(cleanerId: number) {
    const { data, isFetched } = useQuery({
      queryKey: ["services", cleanerId],
      queryFn: () => getAllByCleanerId(cleanerId),
      placeholderData: keepPreviousData,
    });
    return { data, isFetched };
  }

  return {
    getService,
    getAllServices,
    getAllServicesByCleanerId,
    getAllServicesByHomeOwnerId,
  };
};

export { useQueryService };
