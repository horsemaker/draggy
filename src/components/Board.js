import React from "react";
import { AddGroup } from "./AddGroup";
import { BoardGroups } from "./BoardGroups";
import { BoardTitle } from "./BoardTitle";

const Board = () => {
  return (
    <div>
      <BoardTitle text="Task Board" />
      <div className="m-2 px-1 pb-8 flex flex-row gap-4 overflow-x-auto">
        <BoardGroups />
        <AddGroup />
      </div>
    </div>
  );
};

export { Board };
