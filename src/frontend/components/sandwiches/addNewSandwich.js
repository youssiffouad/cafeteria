import { useContext } from "react";
import ComponentsInSandwiches from "./ComponentsInsandwiches";
import { SandwichCtx } from "../../contextStore/SandwichContext";

const SandwichForm = () => {
  const { componentsList, cost } = useContext(SandwichCtx);
  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading"> اضافة ساندوتش جديد</h5>
      <form>
        <label className="label">
          الاسم
          <input className={` form-control input`} type="text" />
        </label>
        <br />
        <label className="label">{cost}التكلفة</label>
      </form>
      <ComponentsInSandwiches />
      <p>اظهار محتويات الساندوتش</p>
      <ul>
        {componentsList.map((comp) => (
          <li>
            {comp.name} and {comp.mapping}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SandwichForm;
