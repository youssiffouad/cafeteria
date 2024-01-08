import { useContext } from "react";
import { createPortal } from "react-dom";
import { ConstituentContext } from "../../contextStore/constituentContext";
import { ConstituentLotContext } from "../../contextStore/constituentLotContext";

const AddLotConstituent = () => {
  const { constituentsList } = useContext(ConstituentContext);
  const LotConstitiuentCtx = useContext(ConstituentLotContext);

  const submitAddingNewConstituentLot = (formdata) => {
    const { noOfUnits, received_date, constituentId } = formdata;
    const v1 = LotConstitiuentCtx.validateField(
      "noOfUnits",
      "number",
      noOfUnits
    );
    const v2 = LotConstitiuentCtx.validateField(
      "received_date",
      "date",
      received_date
    );
    const v3 = LotConstitiuentCtx.validateField(
      "constituentId",
      "number",
      constituentId
    );
    if (v1 && v2 && v3) LotConstitiuentCtx.submissionHandler();
  };
  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading">شراء مكون جديد</h5>
      {createPortal(
        <LotConstitiuentCtx.Msgcomponent />,
        document.getElementById("popup-portal")
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formdata = {
            noOfUnits: LotConstitiuentCtx.formState.noOfUnits.value,

            received_date: LotConstitiuentCtx.formState.received_date.value,

            constituentId: LotConstitiuentCtx.formState.constituentId.value,
          };
          console.log("i started submitting");
          submitAddingNewConstituentLot(formdata);
        }}
      >
        <div className="row">
          <div className="col">
            <label className="label">
              الاسم
              <select
                name="constituentId"
                value={LotConstitiuentCtx.formState.constituentId.value}
                className={`form-control input ${
                  !LotConstitiuentCtx.formState.constituentId.valid &&
                  "is-invalid"
                }`}
                onChange={(event) => {
                  LotConstitiuentCtx.handleInputChange(event);
                  LotConstitiuentCtx.validateField(
                    event.target.name,
                    "dropdown",
                    event.target.value
                  );
                  const ppu =
                    event.target.options[
                      event.target.selectedIndex
                    ].getAttribute("ppu");
                  LotConstitiuentCtx.getPricePerUnit(ppu);
                }}
              >
                <option value="">اختر المكون</option>
                {constituentsList.map((c) => (
                  <option key={c.id} value={c.id} ppu={c.price_per_unit}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            {!LotConstitiuentCtx.formState.constituentId.valid && (
              <p className="text-danger">
                {LotConstitiuentCtx.getErrorMsg("constituentId")}
              </p>
            )}
          </div>
          <div className="col">
            <label className="label">
              {" "}
              عدد الوحدات
              <input
                className={`form-control input ${
                  !LotConstitiuentCtx.formState.noOfUnits.valid && "is-invalid"
                }`}
                type="number"
                name="noOfUnits"
                value={LotConstitiuentCtx.formState.noOfUnits.value}
                onChange={(e) => {
                  LotConstitiuentCtx.handleInputChange(e);
                  LotConstitiuentCtx.validateField(
                    e.target.name,
                    "number",
                    e.target.value
                  );
                }}
              />
            </label>
            {!LotConstitiuentCtx.formState.noOfUnits.valid && (
              <p className="text-danger">
                {LotConstitiuentCtx.getErrorMsg("noOfUnits")}
              </p>
            )}
            <label className="label">التكلفة</label>
            {LotConstitiuentCtx.cost}
          </div>
          <div className="col">
            <label className="label">
              التاريخ
              <input
                name="received_date"
                className={`form-control input ${
                  !LotConstitiuentCtx.formState.received_date.valid &&
                  "is-invalid"
                }`}
                type="date"
                value={LotConstitiuentCtx.formState.received_date.value}
                onChange={(event) => {
                  LotConstitiuentCtx.handleInputChange(event);
                  LotConstitiuentCtx.validateField(
                    event.target.name,
                    "date",
                    event.target.value
                  );
                }}
              />
            </label>
            {!LotConstitiuentCtx.formState.received_date.valid && (
              <p className="text-danger">
                {LotConstitiuentCtx.getErrorMsg("received_date")}
              </p>
            )}
          </div>
        </div>

        <br />
        <button className="btn btn-primary" type="submit">
          اضافة المكون
        </button>
      </form>
    </div>
  );
};
export default AddLotConstituent;
