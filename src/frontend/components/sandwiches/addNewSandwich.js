import { useContext } from "react";
import ComponentsInSandwiches from "./ComponentsInsandwiches";
import { SandwichCtx } from "../../contextStore/SandwichContext";
import { ConstituentProvider } from "../../contextStore/constituentContext";

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
            className={` form-control input`}
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
            className={` form-control input`}
            type="number"
            name="selling_price"
            value={formState.selling_price.value}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </label>
        <label className="label">التكلفة{cost}</label>
        <ConstituentProvider>
          <ComponentsInSandwiches />
        </ConstituentProvider>

        <p>اظهار محتويات الساندوتش</p>
        <ul>
          {componentsList.map((comp) => (
            <li>
              {comp.name} and {comp.mapping_value}
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
