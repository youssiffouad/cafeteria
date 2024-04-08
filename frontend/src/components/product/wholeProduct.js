import React from "react";
import { ProductProvider } from "../../contextStore/productsContext";
import NewProductForm from "./AddNewProduct";
import ProductList from "./products_list";

const ProductWhole = (props) => {
  return (
    <ProductProvider>
      <NewProductForm toggleDisplay={props.toggleDisplay} />
      <ProductList />
    </ProductProvider>
  );
};

export default ProductWhole;
