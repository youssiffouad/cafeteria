import { useContext } from "react";
import ComponentsInSandwiches from "./ComponentsInsandwiches";
import { SandwichCtx } from "../../contextStore/SandwichContext";
import { ConstituentProvider } from "../../contextStore/constituentContext";
import { createPortal } from "react-dom";
import { formatNo } from "../../Hooks/formatno";

const SandwichForm = () => {
  const {
    componentsList,
    cost,
    addSandwich,
    handleInputChange,
    formState,
    Msgcomponent,
  } = useContext(SandwichCtx);
  return (
    <div className="container mb-5 add-container" dir="rtl">
      {createPortal(<Msgcomponent />, document.getElementById("popup-portal"))}
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
        <label className="label">التكلفة{formatNo(cost)}</label>
        <ConstituentProvider>
          <ComponentsInSandwiches />
        </ConstituentProvider>

        <p>اظهار محتويات الساندوتش</p>
        <ul>
          {componentsList.map((comp) => (
            <li>
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
