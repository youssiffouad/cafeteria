import { useContext } from "react";
import ComponentsInSandwiches from "./ComponentsInsandwiches";
import { SandwichCtx } from "../../contextStore/SandwichContext";
import { ConstituentProvider } from "../../contextStore/constituentContext";
import { formatNo } from "../../Hooks/formatno";

const SandwichForm = () => {
  const { componentsList, cost, addSandwich, handleInputChange, formState } =
    useContext(SandwichCtx);
  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading"> اضافة ساندوتش جديد</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSandwich();
        }}
      >
        <label className="label">
          الاسم
          <input
            className={` form-control input inputValue`}
            type="text"
            name="name"
            value={formState.name.value}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </label>
        <br />

        <label className="label">
          سعر البيع
          <input
            className={` form-control input inputValue`}
            type="number"
            name="selling_price"
            value={formState.selling_price.value}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </label>

        <ConstituentProvider>
          <ComponentsInSandwiches />
        </ConstituentProvider>
        <div className="d-flex flex-row mt-1 align-items-center">
          <p>التكلفة</p>
          <p
            className="me-3"
            style={{
              border: "1px solid white",
              borderRadius: "3px",
              padding: "2px 10px",
            }}
          >
            {formatNo(cost)}
          </p>
        </div>

        <p style={{ marginBottom: "0" }}>اظهار محتويات الساندوتش</p>
        <ul>
          {componentsList.map((comp) => (
            <li style={{ color: "white" }}>
              يصنع عدد 1 وحدة من{comp.name} عدد{comp.mapping_value} من
              الساندوتشات
            </li>
          ))}
        </ul>
        <button type="submit" className="btn btn-primary">
          اضافة الساندوتش
        </button>
      </form>
    </div>
  );
};
export default SandwichForm;
