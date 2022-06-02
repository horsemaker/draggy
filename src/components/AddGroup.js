import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useBoard } from "../contexts";
import { useOnClickOutside } from "../hooks";

const AddGroup = () => {
  const { board, setBoard } = useBoard();

  const [addGroup, setAddGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const inputRef = useRef();

  useOnClickOutside(inputRef, () => {
    if (groupName !== "") {
      setBoard([...board, { groupId: uuid(), groupName, groupTasks: [] }]);
      setGroupName("");
    }
    setAddGroup(false);
  });

  const handleKeyDown = (e) => {
    if (groupName !== "") {
      if (e.key === "Enter") {
        setBoard([...board, { groupId: uuid(), groupName, groupTasks: [] }]);
        setAddGroup(false);
        setGroupName("");
      }
    }
  };

  return (
    <>
      {addGroup ? (
        <input
          ref={inputRef}
          className="self-start rounded h-6 w-40 bg-gray-50 p-0 text-sm px-1"
          type="text"
          autoFocus
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div
          className="flex items-start self-start gap-2 cursor-pointer text-gray-400 w-48 min-w-[12rem]"
          onClick={() => setAddGroup(true)}
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
          <p className="font-semibold text-sm ">Add a Group</p>
        </div>
      )}
    </>
  );
};

export { AddGroup };
