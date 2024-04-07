import React, { useState } from "react";
import serverport from "../../backendconfiguration";
const FilterLots = () => {
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [filteredlots, setfilteredlots] = useState([]);

  let lotscost = 0;
  for (let i = 0; i < filteredlots.length; i++) {
    lotscost += filteredlots[i].cost;
  }

  //actions on submitting the date limits
  const submithandler = (event) => {
    event.preventDefault();
    const limits = { startdate, enddate };
    fetch(`http://localhost:${serverport}/lots/filterdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(limits),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setfilteredlots(data);
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
        // Handle error
      });
    // Reset form fields
    setenddate("");
    setstartdate("");
  };

  return (
    <div className="container" dir="rtl">
      <div className="row">
        <div className="col-md-8">
          <h1 className="tableTitlefont">اظهار المشتريات في فترة معينة</h1>
          <form onSubmit={submithandler}>
            <label htmlFor="start" style={{ fontFamily: "Tajawal" }}>
              بداية الفترة
            </label>
            <input
              type="date"
              id="start"
              value={startdate}
              onChange={(event) => setstartdate(event.target.value)}
              className="form-control"
            />
            <br />
            <label htmlFor="end" style={{ fontFamily: "Tajawal" }}>
              نهاية الفترة
            </label>
            <input
              type="date"
              id="end"
              value={enddate}
              onChange={(event) => setenddate(event.target.value)}
              className="form-control"
            />
            <br />
            <button type="submit" className="btn btn-primary">
              تطبيق
            </button>
          </form>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2 tableHeadfont">اسم المنتج</th>
            <th className="col-md-2 tableHeadfont">السعر</th>
            <th className="col-md-2 tableHeadfont">تاريخ الشراء</th>
            <th className="col-md-2 tableHeadfont">التكلفة</th>
          </tr>
        </thead>
        <tbody>
          {filteredlots.map((lot) => (
            <tr>
              <td className="col-md-2">{lot.prodname}</td>
              <td className="col-md-2">{lot.quantity}</td>
              <td className="col-md-2">{lot.received_date}</td>
              <td className="col-md-2">{lot.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>اجمالي التكلفة للمشتريات المختارة {lotscost}</p>
    </div>
  );
};
export default FilterLots;
