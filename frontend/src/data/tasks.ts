export type TaskStatus = "todo" | "progress" | "done" | "blocked";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

const taskNames = [
  "Fix authentication bug in login flow",
  "Implement invoice PDF export",
  "Add drag & drop for Kanban board",
  "Design analytics revenue chart",
  "Optimize dashboard performance",
  "Create user profile settings page",
  "Build team invitation system",
  "Improve notification system UI",
  "Add file upload for tasks",
  "Implement comment system",
  "Fix sidebar responsiveness issue",
  "Add task priority labels",
  "Create project overview page",
  "Integrate activity feed system",
  "Improve loading states across app",
  "Refactor API service layer",
  "Add due date validation logic",
  "Implement real-time task updates",
  "Design mobile responsive layout",
  "Add search & filter for tasks",
];

const getRandomTaskName = () =>
  taskNames[Math.floor(Math.random() * taskNames.length)];

export const generateTasks = (): Task[] => {
  const tasks: Task[] = [];

  for (let i = 1; i <= 420; i++) {
    const status: TaskStatus =
      i < 180
        ? "done"
        : i < 320
        ? "progress"
        : i < 400
        ? "todo"
        : "blocked";

    tasks.push({
      id: i.toString(),
      title: getRandomTaskName(),
      status,
    });
  }

  return tasks;
};
