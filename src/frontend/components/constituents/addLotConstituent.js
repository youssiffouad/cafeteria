const AddLotConstituent = () => {
  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading">شراء مكون جديد</h5>
      <form>
        <label className="label">
          الاسم
          <select className="form-control input">
            <option>opt1</option>
            <option>opt2</option>
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
