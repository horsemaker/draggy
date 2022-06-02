import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoard } from "../contexts";
import { useOnClickOutside } from "../hooks";

const BoardCardModal = () => {
  const { board, setBoard } = useBoard();
  const modalRef = useRef();

  const navigate = useNavigate();
  const { groupId, taskId } = useParams();

  useOnClickOutside(modalRef, () => navigate("/"));

  const currentGroup = board.find((group) => group.groupId === groupId);
  const currentTask = currentGroup.groupTasks.find(
    (task) => task.taskId === taskId
  );

  const handleTaskChange = (e, toChange) => {
    setBoard((prevBoard) =>
      prevBoard.map((group) => {
        const newGroup = group;
        if (newGroup.groupId === groupId) {
          newGroup.groupTasks = newGroup.groupTasks.map((task) => {
            const newTask = task;
            if (newTask.taskId === taskId) {
              if (toChange === "title") {
                newTask.taskTitle =
                  e.target.value === "" ? "Untitled" : e.target.value;
              } else if (toChange === "description") {
                newTask.taskDescription = e.target.value;
              }
            }
            return newTask;
          });
        }
        return newGroup;
      })
    );
  };

  const handleTaskDelete = () => {
    navigate("/", { replace: true });
    setBoard((prevBoard) =>
      prevBoard.map((group) => {
        const newGroup = group;
        if (newGroup.groupId === groupId) {
          newGroup.groupTasks = newGroup.groupTasks.filter(
            (task) => task.taskId !== taskId
          );
        }
        return newGroup;
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-400/60 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white h-3/4 w-1/2 p-8 rounded-md flex flex-col gap-2"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <input
            className="w-4/5 outline-0 text-5xl font-bold"
            type="text"
            defaultValue={
              currentTask.taskTitle === "Untitled" ? "" : currentTask.taskTitle
            }
            onChange={(e) => handleTaskChange(e, "title")}
            placeholder="Give a task title..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 p-2 text-gray-400 cursor-pointer self-start rounded-full hover:bg-gray-100"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={handleTaskDelete}
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <textarea
          className="outline-none h-full"
          type="text"
          defaultValue={currentTask.taskDescription}
          onChange={(e) => handleTaskChange(e, "description")}
          autoFocus
          onFocus={(e) => {
            const val = e.target.value;
            e.target.value = "";
            e.target.value = val;
          }}
          placeholder="Write task description..."
        />
      </div>
    </div>
  );
};

export { BoardCardModal };
