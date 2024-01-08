import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";

import React, { useState, useEffect, useContext } from "react";
import serverport from "../../backendconfiguration";

const FilterProdBYCat = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });
  const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState({
  //   id: "",
  //   name: "",
  //   sellingprice: "",
  //   buying_priceperitem: "",
  // });

  const orderItemCtx = useContext(OrderItemContext);

  // Fetch all categories existing
  useEffect(() => {
    fetch(`http://localhost:${serverport}/categories/view`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  //fetch products of selected category
  const fetchProdOfSelectedCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:${serverport}/products/filtercategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("here is hte products data", data);
      setProducts(data);
    } catch (err) {
      console.log("failed to fetch products of certain category", err);
    }
  };

  //fetch sandwiches of category sandwich
  const fetchSandwiches = async () => {
    try {
      const response = await fetch(
        `http://localhost:${serverport}/products/filtercategory`
      );
      const data = await response.json();
      console.log("here is the sandwiches data", data);
    } catch (err) {
      console.log("failed to fetch sandwiches", err);
    }
  };

  // Change products on changing category
  useEffect(() => {
    if (category.id !== "") {
      console.log(category);
      console.log(
        `category id is not null and i will fetch products of that category`
      );
      const requestBody = { catid: category.id };
      if (category.name === "sandwiches") {
        fetch();
      }
      fetch(`http://localhost:${serverport}/products/filtercategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
        })
        .catch((error) => {
          console.error("Failed to filter products:", error);
        });
    }
  }, [category]);

  const catChangeHandler = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find((cat) => {
      return cat.id === selectedCategoryId;
    });

    setCategory({ id: selectedCategoryId, name: selectedCategory?.name });
    console.log(selectedCategory);
    console.log(category);

    orderItemCtx.handleInputChange(event);
    orderItemCtx.validateField(
      event.target.name,
      "dropdown",
      event.target.value
    );
    // lotCtx.handleInputChange(event);
    // lotCtx.validateField(event.target.name, "dropdown", event.target.value);
  };

  const ProdChangeHandler = (event) => {
    orderItemCtx.handleInputChange(event);
    orderItemCtx.validateField(
      event.target.name,
      "dropdown",
      event.target.value
    );

    // lotCtx.handleInputChange(event);
    // lotCtx.validateField(event.target.name, "dropdown", event.target.value);
  };

  return (
    <React.Fragment>
      <div className="col">
        <label>
          التصنيف
          <select
            name="cat"
            className={`form-control input ${
              !orderItemCtx.formState.cat.valid && "is-invalid"
            }`}
            value={orderItemCtx.formState.cat.value}
            onChange={catChangeHandler}
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
                {cat.id}
              </option>
            ))}
          </select>
        </label>
        {!orderItemCtx.formState.cat.valid && (
          <p className="text-danger">{orderItemCtx.getErrorMsg("cat")}</p>
        )}
      </div>

      <div className="col">
        <label>
          المنتج
          <select
            name="prod"
            className={`form-control input ${
              !orderItemCtx.formState.prod.valid && "is-invalid"
            }`}
            value={orderItemCtx.formState.prod.value}
            onChange={ProdChangeHandler}
          >
            <option value="">اختر اسم المنتج</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>
        </label>
        {!orderItemCtx.formState.cat.valid && (
          <p className="text-danger">{orderItemCtx.getErrorMsg("prod")}</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default FilterProdBYCat;
