import React from "react";
import { ProductProvider } from "../../contextStore/productsContext";
import NewProductForm from "./AddNewProduct";
import ProductList from "./products_list";

const ProductWhole = () => {
  return (
    <ProductProvider>
      <NewProductForm />
      <ProductList />
    </ProductProvider>
  );
};

export default ProductWhole;
