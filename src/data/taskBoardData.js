import { v4 as uuid } from "uuid";

const taskBoardData = [
  {
    groupId: uuid(),
    groupName: "In-Queue",
    groupTasks: [
      {
        taskId: uuid(),
        taskTitle: "Cleaning",
        taskDescription: "Clean the house.",
      },
      {
        taskId: uuid(),
        taskTitle: "Blogging",
        taskDescription: "Write a blog on DnD.",
      },
    ],
  },
  {
    groupId: uuid(),
    groupName: "In-Progress",
    groupTasks: [
      {
        taskId: uuid(),
        taskTitle: "Coding",
        taskDescription: "Project Coding.",
      },
      {
        taskId: uuid(),
        taskTitle: "Sleeping",
        taskDescription: "Sleeping is necessary.",
      },
      {
        taskId: uuid(),
        taskTitle: "Studying",
        taskDescription: "Study some React concepts.",
      },
    ],
  },
  {
    groupId: uuid(),
    groupName: "Done",
    groupTasks: [
      {
        taskId: uuid(),
        taskTitle: "Frontend Assignment",
        taskDescription: "Do the Frontend Assignment.",
      },
    ],
  },
];

export { taskBoardData };
