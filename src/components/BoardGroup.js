import React from "react";
import { useBoard } from "../contexts";
import { AddTask } from "./AddTask";
import { BoardCard } from "./BoardCard";

const BoardGroup = ({ group }) => {
  const { setBoard, handleDragEnter } = useBoard();
  const { groupId, groupName, groupTasks } = group;

  const handleGroupDelete = () => {
    setBoard((prevBoard) =>
      prevBoard.filter((group) => group.groupId !== groupId)
    );
  };

  return (
    <div
      onDragEnter={
        groupTasks.length === 0 ? (e) => handleDragEnter(e, groupId) : null
      }
      className="w-48 min-w-[12rem] self-start"
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-sm">{groupName}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 p-1 text-gray-400 cursor-pointer rounded-full hover:bg-gray-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={handleGroupDelete}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
      <div className="mt-1 flex flex-col gap-2">
        {groupTasks.map((task) => (
          <BoardCard key={task.taskId} task={task} groupId={groupId} />
        ))}
        <AddTask groupId={groupId} />
      </div>
    </div>
  );
};

export { BoardGroup };
