import { useState } from "react";
import Sidebar from "../components/Sidebar";
import KanbanColumn from "../components/KanbanColumn";

type Task = {
  id: string;
  title: string;
  status: "todo" | "progress" | "done";
};

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [newTask, setNewTask] = useState("");

  // ✅ ADD TASK LOGIC
  const addTask = () => {
    const trimmed = newTask.trim();

    if (!trimmed) return;

    const newItem: Task = {
      id: Date.now().toString(),
      title: trimmed,
      status: "todo",
    };

    setTasks((prev) => [newItem, ...prev]);
    setNewTask("");
  };

  // 🔁 MOVE TASK (for drag & drop)
  const moveTask = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status } : t
      )
    );
  };

  const columns = [
    { key: "todo", title: "To Do" },
    { key: "progress", title: "In Progress" },
    { key: "done", title: "Done" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Kanban Board
        </h1>

        {/* ➕ ADD TASK UI */}
        <div className="flex gap-3 mb-6">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            placeholder="Enter new task..."
            className="flex-1 p-3 border rounded-xl bg-white"
          />

          <button
            onClick={addTask}
            className="bg-gray-900 text-white px-5 rounded-xl hover:bg-gray-800 transition"
          >
            + Add Task
          </button>
        </div>

        {/* 🧩 BOARD */}
        <div className="grid grid-cols-3 gap-6">
          {columns.map((col) => (
            <KanbanColumn
              key={col.key}
              title={col.title}
              statusKey={col.key as Task["status"]}
              tasks={tasks.filter(
                (t) => t.status === col.key
              )}
              onDropTask={moveTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const initialTasks: Task[] = [
  // TODO (8 tasks)
  { id: "1", title: "Setup project structure", status: "todo" },
  { id: "2", title: "Define API contracts", status: "todo" },
  { id: "3", title: "Create authentication flow", status: "todo" },
  { id: "4", title: "Design database schema", status: "todo" },
  { id: "5", title: "Setup routing system", status: "todo" },
  { id: "6", title: "Create base layout", status: "todo" },
  { id: "7", title: "Install UI dependencies", status: "todo" },
  { id: "8", title: "Setup state management", status: "todo" },

  // IN PROGRESS (8 tasks)
  { id: "9", title: "Build login UI", status: "progress" },
  { id: "10", title: "Implement dashboard layout", status: "progress" },
  { id: "11", title: "Create sidebar navigation", status: "progress" },
  { id: "12", title: "Build Kanban column component", status: "progress" },
  { id: "13", title: "Setup task state logic", status: "progress" },
  { id: "14", title: "Design API integration layer", status: "progress" },
  { id: "15", title: "Add form validation", status: "progress" },
  { id: "16", title: "Implement responsive layout", status: "progress" },

  // DONE (8 tasks)
  { id: "17", title: "Initialize project repo", status: "done" },
  { id: "18", title: "Setup Tailwind CSS", status: "done" },
  { id: "19", title: "Configure routing", status: "done" },
  { id: "20", title: "Create basic UI layout", status: "done" },
  { id: "21", title: "Setup sidebar", status: "done" },
  { id: "22", title: "Build header component", status: "done" },
  { id: "23", title: "Configure linting rules", status: "done" },
  { id: "24", title: "Setup folder structure", status: "done" },
];
