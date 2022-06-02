import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../contexts/board-context";

const BoardCard = ({ task, groupId }) => {
  const { dragTask, handleDragStart, handleDragEnter, handleDragEnd } =
    useBoard();

  const { taskId, taskTitle } = task;
  const [dragging, setDragging] = useState(
    !dragTask &&
      dragTask.current.groupId === groupId &&
      dragTask.current.task.taskId === taskId
      ? true
      : false
  );

  const navigate = useNavigate();

  return (
    <div
      className={
        dragging
          ? "shadow rounded p-2 bg-gray-100"
          : "cursor-pointer shadow rounded p-2 hover:bg-gray-50"
      }
      draggable
      onDragStart={(e) => {
        setTimeout(() => {
          setDragging(true);
        }, 0);
        handleDragStart(e, groupId, task);
      }}
      onDragEnter={(e) => handleDragEnter(e, groupId, task)}
      onDragEnd={() => {
        setDragging(false);
        handleDragEnd();
      }}
      onClick={dragging ? null : () => navigate(`/${groupId}/${taskId}`)}
    >
      <p className={dragging ? "font-medium text-gray-100" : "font-medium"}>
        {taskTitle}
      </p>
    </div>
  );
};

export { BoardCard };
