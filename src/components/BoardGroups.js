import { useBoard } from "../contexts";
import { BoardGroup } from "./BoardGroup";

const BoardGroups = () => {
  const { board } = useBoard();

  return (
    <>
      {board.map((group) => (
        <BoardGroup key={group.groupId} group={group} />
      ))}
    </>
  );
};

export { BoardGroups };
