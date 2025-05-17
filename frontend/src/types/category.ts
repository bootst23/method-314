export interface Category extends CreateCategory {
  categoryID: number;
}

export interface CreateCategory {
  category: string;
}

export interface CategoryResponse {
  category: Category;
}
