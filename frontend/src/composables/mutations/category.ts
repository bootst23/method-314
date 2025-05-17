import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useCategoryAPI } from "../api/category";
import type { Category } from "@/types/category";

const { create, edit, remove } = useCategoryAPI();

const useMutateCategory = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createCategory } = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["categories"] }, (oldData: Category[] | undefined) =>
        oldData ? [...oldData, data] : [data],
      );
    },
  });

  const { mutateAsync: editCategory } = useMutation({
    mutationFn: edit,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["categories"] }, (oldData: Category[] | undefined) =>
        oldData ? oldData.map((s) => (s.categoryID === data.categoryID ? data : s)) : [data],
      );
    },
  });

  const { mutateAsync: deleteCategory } = useMutation({
    mutationFn: remove,
    onSuccess: (data, variables) => {
      queryClient.setQueriesData({ queryKey: ["categories"] }, (oldData: Category[] | undefined) =>
        oldData ? oldData.filter((s) => s.categoryID !== variables) : [],
      );
    },
  });

  return {
    createCategory,
    editCategory,
    deleteCategory,
  };
};

export { useMutateCategory };
