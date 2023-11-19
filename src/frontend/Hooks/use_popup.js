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
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h1>{msgContent}</h1>
              </div>
              <div class="modal-footer">
                <button
                  onClick={() => {
                    setdisplay(false);
                  }}
                  type="button"
                  class="btn btn-secondary"
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
