import React from "react";
import AddCategory from "./addcategory";
import CategoryList from "./viewCategories";
import { CategoriesProvider } from "../../contextStore/categoriesContext";
const CategoryWhole = () => {
  return (
    <CategoriesProvider>
      <AddCategory />
      <CategoryList />
    </CategoriesProvider>
  );
};
export default CategoryWhole;
