import React from "react";
import { RankProvider } from "../../contextStore/ranksContext";

import NewRankForm from "./addNewRank";
import RankList from "./RankList";
const RankWhole = () => {
  return (
    <RankProvider>
      <NewRankForm />
      <RankList />
    </RankProvider>
  );
};
export default RankWhole;
