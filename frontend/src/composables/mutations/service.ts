import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useServiceAPI } from "../api/service";
import type { OfferedService, Service } from "@/types/service";

const { create, edit, remove, createShortlist, removeShortlist } = useServiceAPI();
const useMutateService = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createService } = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      queryClient.setQueriesData(
        { queryKey: ["services"] },
        (oldData: OfferedService[] | undefined) => (oldData ? [...oldData, data] : [data]),
      );
    },
  });

  const { mutateAsync: editService } = useMutation({
    mutationFn: edit,
    onSuccess: (data) => {
      queryClient.setQueriesData(
        { queryKey: ["services"] },
        (oldData: OfferedService[] | undefined) =>
          oldData ? oldData.map((s) => (s.serviceID === data.serviceID ? data : s)) : oldData,
      );
    },
  });

  const { mutateAsync: deleteService } = useMutation({
    mutationFn: remove,
    onSuccess: (data) => {
      queryClient.setQueriesData(
        { queryKey: ["services"] },
        (oldData: OfferedService[] | undefined) =>
          oldData ? oldData.filter((s) => s.serviceID !== data) : oldData,
      );
    },
  });

  const { mutateAsync: createServiceShortlist } = useMutation({
    mutationFn: createShortlist,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["shortlisted"] }, (oldData: Service[] | undefined) =>
        oldData ? [...oldData, data] : [data],
      );
    },
  });

  const { mutateAsync: removeServiceShortlist } = useMutation({
    mutationFn: removeShortlist,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["shortlisted"] }, (oldData: Service[] | undefined) =>
        oldData ? oldData.filter((s) => s.serviceID !== data) : oldData,
      );
    },
  });

  return {
    createService,
    editService,
    deleteService,
    createServiceShortlist,
    removeServiceShortlist,
  };
};

export { useMutateService };
