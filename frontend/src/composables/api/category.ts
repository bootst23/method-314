import type { Category, CategoryResponse } from "@/types/category";
import { fetcher } from "@/utils/fetcher";

const useCategoryAPI = () => {
  async function getAll() {
    const res = await fetcher("/categories");
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return res.json<Category[]>();
  }

  async function create(category: string) {
    const res = await fetcher("/categories", {
      method: "POST",
      json: { category },
    });
    if (!res.ok) {
      throw new Error("Failed to create category");
    }
    const resData = await res.json<CategoryResponse>();
    return resData.category;
  }

  async function edit(category: Category) {
    const res = await fetcher(`/categories/${category.categoryID}`, {
      method: "PUT",
      json: { ...category },
    });
    if (!res.ok) {
      throw new Error("Failed to edit category");
    }
    const resData = await res.json<CategoryResponse>();
    return resData.category;
  }

  async function remove(categoryID: number) {
    const res = await fetcher(`/categories/${categoryID}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete category");
    }
  }

  return { getAll, create, edit, remove };
};

export { useCategoryAPI };
