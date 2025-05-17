import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useCategoryAPI } from "@/composables/api/category";

const { getAll } = useCategoryAPI();
const useQueryCategory = () => {
  function getAllCategories() {
    const { data, isFetched } = useQuery({
      queryKey: ["categories"],
      queryFn: () => getAll(),
      placeholderData: keepPreviousData,
    });
    return { data, isFetched };
  }

  return {
    getAllCategories,
  };
};

export { useQueryCategory };
