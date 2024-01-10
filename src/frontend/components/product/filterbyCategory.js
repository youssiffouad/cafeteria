import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";

import React, { useState, useEffect, useContext } from "react";
import serverport from "../../backendconfiguration";
import { SandwichCtx } from "../../contextStore/SandwichContext";

const FilterProdBYCat = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });
  const [products, setProducts] = useState([]);

  const orderItemCtx = useContext(OrderItemContext);
  const {
    handleSellingPriceOfsandwich,
    formStateFilterByCat,
    VFFilterByCat,
    HIGFilterByCat,
  } = useContext(SandwichCtx);

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
      const requestBody = { catid: category.id };
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
        `http://localhost:${serverport}/sandwiches/viewSandwiches`
      );
      const data = await response.json();
      console.log("here is the sandwiches data", data);
      setProducts(data);
      console.log("here is the data of sandwiches", data);
    } catch (err) {
      console.log("failed to fetch sandwiches", err);
    }
  };

  // Change products or fetch sandwiches on changing category
  useEffect(() => {
    try {
      if (category.id !== "") {
        console.log(category);
        console.log(
          `category id is not null and i will fetch products of that category`
        );

        if (category.name === "sandwiches") {
          fetchSandwiches();
        } else {
          fetchProdOfSelectedCategory();
        }
      }
    } catch (err) {
      console.error("Failed to filter products:", err);
    }
  }, [category]);

  const catChangeHandler = (event) => {
    const selectedCategoryId = event.target.value;
    console.log("here is the event target value", selectedCategoryId);
    const selectedCategory = categories.find((cat) => {
      return cat.id == selectedCategoryId;
    });
    console.log("here are al  the categories", categories);

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
  const DecisionChangeHandler = (event) => {
    console.log("here is the sandwich", formStateFilterByCat);
    console.log("here is the product", orderItemCtx.formState);
    if (category.id == 1) {
      SandwichChangeHandler(event);
    } else {
      ProdChangeHandler(event);
    }
  };

  const ProdChangeHandler = (event) => {
    console.log("i callled the prod change jandler");
    orderItemCtx.handleInputChange(event);
    orderItemCtx.validateField(
      event.target.name,
      "dropdown",
      event.target.value
    );

    // lotCtx.handleInputChange(event);
    // lotCtx.validateField(event.target.name, "dropdown", event.target.value);
  };
  //function to handle change of selected sandwich if catid=1
  const SandwichChangeHandler = (event) => {
    console.log("i called the sandwich change handler", event.target);
    HIGFilterByCat(event);
    VFFilterByCat(event.target.name, "dropdown", event.target.value);
    const selected_selling_price =
      event.target.options[event.target.selectedIndex].getAttribute(
        "sellingPrice"
      );
    handleSellingPriceOfsandwich(selected_selling_price);
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
      {category.id == 1 ? (
        <div className="col">
          <label>
            الساندوتش
            <select
              name="sandwichId"
              className={`form-control input ${
                !formStateFilterByCat.sandwichId.valid && "is-invalid"
              }`}
              value={formStateFilterByCat.sandwichId.value}
              onChange={SandwichChangeHandler}
            >
              <option value="">اختر اسم الساندوتش</option>
              {products.map((prod) => {
                return (
                  <option
                    key={prod.sandwich_id}
                    value={prod.sandwich_id}
                    sellingPrice={prod.sandwich_selling_price}
                  >
                    {prod.sandwich_name}
                  </option>
                );
              })}
            </select>
          </label>
          {!formStateFilterByCat.sandwichIdزvalid && (
            <p className="text-danger">
              {orderItemCtx.getErrorMsg("sandwichId")}
            </p>
          )}
        </div>
      ) : (
        <div className="col">
          <label>
            المنتج
            <select
              name={category.id == 1 ? "sandwichId" : "prod"}
              className={`form-control input ${
                !orderItemCtx.formState.prod.valid && "is-invalid"
              }`}
              value={orderItemCtx.formState.prod.value}
              onChange={ProdChangeHandler}
            >
              <option value="">اختر اسم المنتج</option>
              {products.map((prod) => {
                return (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                );
              })}
            </select>
          </label>
          {!orderItemCtx.formState.cat.valid && (
            <p className="text-danger">{orderItemCtx.getErrorMsg("prod")}</p>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default FilterProdBYCat;
