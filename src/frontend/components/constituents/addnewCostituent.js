const AddNewConstituent = () => {
  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading">اضافة مكون جديد</h5>
      <form>
        <label className="label">
          الاسم
          <input className={` form-control input`} type="text" />
        </label>
        <label className="label">
          {" "}
          سعؤ الشراء للوحدة
          <input className={` form-control input`} type="number" />
        </label>
        <label className="label">
          الكمية
          <input className={` form-control input`} type="number" />
        </label>
        <br />
        <button className="btn btn-primary" type="submit">
          اضافة المكون
        </button>
      </form>
    </div>
  );
};

export default AddNewConstituent;
