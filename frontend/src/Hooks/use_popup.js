import { useState } from "react";

const usePopUp = () => {
  const [display, setdisplay] = useState(false);
  const [msgContent, setmsgContent] = useState("");
  const controlDisplay = (arg) => {
    setdisplay(arg);
  };
  const controlMsgContent = (msg) => {
    setmsgContent(msg);
  };
  const Msgcomponent = () => (
    <>
      {display && (
        <div className="overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <h1>{msgContent}</h1>
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
  return { Msgcomponent, controlDisplay, controlMsgContent };
};
export default usePopUp;
