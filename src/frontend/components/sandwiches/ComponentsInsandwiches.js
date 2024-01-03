import { useContext } from "react";
import { SandwichCtx } from "../../contextStore/SandwichContext";

const ComponentsInSandwiches = () => {
  const sandwichCtx = useContext(SandwichCtx);
  return (
    <>
      <form>
        <label className="label">
          اختر مكون
          {/* instead of this static list, we will have a dynamic one fetched from the constituents in thedatabase */}
          <select
            className={` form-control input`}
            onChange={(event) => {
              sandwichCtx.ChangeName(event.target.value);
            }}
            value={sandwichCtx.compName}
          >
            <option key={1} value={"فول"}>
              فول
            </option>
            <option key={2} value={"طعمية"}>
              طعمية
            </option>
            <option key={3} value={"سلطة"}>
              سلطة
            </option>
          </select>
        </label>
        <label className="label">
          {" "}
          عدد الساندوتشات للوحدة
          <input
            className={` form-control input`}
            type="number"
            value={sandwichCtx.compMapping}
            onChange={(event) => {
              sandwichCtx.Changemapping(event.target.value);
            }}
          />
        </label>

        <br />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            sandwichCtx.modifyComponets();
          }}
        >
          اضافة المكون
        </button>
      </form>
    </>
  );
};
export default ComponentsInSandwiches;
