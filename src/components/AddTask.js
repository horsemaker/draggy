import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useBoard } from "../contexts";
import { useOnClickOutside } from "../hooks";

const AddTask = ({ groupId }) => {
  const { setBoard } = useBoard();

  const [addTask, setAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const inputRef = useRef();

  useOnClickOutside(inputRef, () => {
    if (taskTitle !== "") {
      setBoard((prevBoard) =>
        prevBoard.map((group) => {
          const newGroup = group;
          if (newGroup.groupId === groupId) {
            newGroup.groupTasks = [
              ...newGroup.groupTasks,
              { taskId: uuid(), taskTitle, taskDescription: "" },
            ];
          }
          return newGroup;
        })
      );
      setTaskTitle("");
    }
    setAddTask(false);
  });

  const handleKeyDown = (e) => {
    if (taskTitle !== "") {
      if (e.key === "Enter") {
        setBoard((prevBoard) =>
          prevBoard.map((group) => {
            const newGroup = group;
            if (newGroup.groupId === groupId) {
              newGroup.groupTasks = [
                ...newGroup.groupTasks,
                { taskId: uuid(), taskTitle, taskDescription: "" },
              ];
            }
            return newGroup;
          })
        );
        setAddTask(false);
        setTaskTitle("");
      }
    }
  };

  return (
    <>
      {addTask ? (
        <input
          ref={inputRef}
          className="cursor-pointer shadow rounded p-2 border-0 hover:bg-gray-50"
          type="text"
          autoFocus
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div
          className="flex items-start self-start gap-2 cursor-pointer text-gray-400 w-48 min-w-[12rem]"
          onClick={() => setAddTask(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-semibold text-sm ">New</p>
        </div>
      )}
    </>
  );
};

export { AddTask };
