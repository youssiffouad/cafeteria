import { useContext } from "react";
import { ConstituentContext } from "../../contextStore/constituentContext";
import { ConstituentLotContext } from "../../contextStore/constituentLotContext";

const AddLotConstituent = () => {
  const { constituentsList } = useContext(ConstituentContext);
  const LotConstitiuentCtx = useContext(ConstituentLotContext);
  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading">شراء مكون جديد</h5>
      <form>
        <label className="label">
          الاسم
          <select
            className="form-control input"
            onChange={(event) => {
              LotConstitiuentCtx.handleInputChange(event);
              const selectedConstituent =
                event.target.options[event.target.selectedIndex];
              console.log(selectedConstituent);
            }}
            value={selectedConstituent.getAttribute("name")}
          >
            <option value="">اختر المكون</option>
            {constituentsList.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="label">
          {" "}
          عدد الوحدات
          <input className={` form-control input`} type="number" />
        </label>
        <label className="label">التكلفة</label>
        <br />
        <button className="btn btn-primary" type="submit">
          اضافة المكون
        </button>
      </form>
    </div>
  );
};
export default AddLotConstituent;
