import { createContext, useContext, useEffect, useRef, useState } from "react";

const BoardContext = createContext();

const initialBoardState = localStorage.getItem("board")
  ? JSON.parse(localStorage.getItem("board"))
  : [];

const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(initialBoardState);
  const dragTask = useRef(null);
  const dragTaskNode = useRef(null);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  const handleDragStart = (e, groupId, task) => {
    dragTask.current = { groupId, task };
    dragTaskNode.current = e.target;
  };

  const handleDragEnter = (e, groupId, task) => {
    const currentTask = dragTask.current;
    if (
      dragTaskNode.current !== e.target &&
      !dragTaskNode.current.contains(e.target)
    ) {
      setBoard((prevBoardData) => {
        const newBoardData = JSON.parse(JSON.stringify(prevBoardData));
        const newGroupIndex = newBoardData.findIndex(
          (group) => group.groupId === groupId
        );
        const oldGroupIndex = newBoardData.findIndex(
          (group) => group.groupId === currentTask.groupId
        );
        const newTaskIndex = newBoardData[newGroupIndex].groupTasks.findIndex(
          (groupTask) => groupTask.taskId === task.taskId
        );
        const oldTaskIndex = newBoardData[oldGroupIndex].groupTasks.findIndex(
          (task) => task.taskId === currentTask.task.taskId
        );
        newBoardData[newGroupIndex].groupTasks.splice(
          newTaskIndex === -1 ? 0 : newTaskIndex,
          0,
          newBoardData[oldGroupIndex].groupTasks.splice(oldTaskIndex, 1)[0]
        );
        dragTask.current = { ...currentTask, groupId };
        return newBoardData;
      });
    }
  };

  const handleDragEnd = () => {
    dragTask.current = null;
    dragTaskNode.current = null;
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        dragTask,
        dragTaskNode,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

const useBoard = () => {
  const context = useContext(BoardContext);

  if (context === undefined) {
    throw new Error("useBoard must be within a AuthProvider");
  }

  return context;
};

export { BoardProvider, useBoard };
