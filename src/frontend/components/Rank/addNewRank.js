import React, { useContext, useState } from "react";

import { RankContext } from "../../contextStore/ranksContext";

const NewRankForm = () => {
  const RankCtx = useContext(RankContext);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleAddRank = () => {
    if (RankCtx.name.trim().length <= 0) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      RankCtx.updateranklist();
    }
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>Add New Rank</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleAddRank();
            }}
          >
            <label>
              Rank Name:
              <input
                type="text"
                value={RankCtx.name}
                className="form-control"
                onChange={(event) => {
                  RankCtx.updatename(event.target.value);
                }}
              />
            </label>
            <br />
            {!isFormValid && (
              <p className="text-danger">
                Please fill in all the required fields.
              </p>
            )}
            <button type="submit" className="btn btn-primary mt-2">
              Add Rank
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRankForm;
