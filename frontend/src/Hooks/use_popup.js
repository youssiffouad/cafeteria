import { useState } from "react";

const usePopUp = (btnText) => {
  const [display, setdisplay] = useState(false);
  const [msgContent, setmsgContent] = useState("");
  const [formJSX, setformJSX] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);

  const controlDisplay = (arg) => {
    setdisplay(arg);
  };
  const controlDisplayForm = (arg) => {
    setDisplayForm(arg);
  };
  const controlMsgContent = (msg) => {
    setmsgContent(msg);
  };
  const controlFormJSX = (arg) => {
    console.log("here is the form i received", arg);
    setformJSX(arg);
  };
  const Msgcomponent = () => (
    <>
      {display && (
        <div className="overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <h1
                  style={{
                    fontFamily: "Tajawal",
                    fontWeight: "600",
                    color: "rgb(51, 55, 71)",
                  }}
                >
                  {msgContent}
                </h1>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setdisplay(false);
                  }}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  const FormContent = () => <>{displayForm && formJSX}</>;

  /*
   *** this is the button which will control the display of the popupForm
   */
  const ControllerBtn = () => <button>{btnText}</button>;
  return {
    Msgcomponent,
    FormContent,
    controlDisplay,
    controlDisplayForm,
    controlMsgContent,
    controlFormJSX,
    ControllerBtn,
  };
};
export default usePopUp;
