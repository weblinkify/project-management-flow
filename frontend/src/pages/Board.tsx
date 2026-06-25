import { useState } from "react";
import Sidebar from "../components/Sidebar";
import KanbanColumn from "../components/KanbanColumn";

type Task = {
  id: string;
  title: string;
  status: "todo" | "progress" | "done";
};

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Setup project", status: "todo" },
    { id: "2", title: "Build UI", status: "progress" },
    { id: "3", title: "Deploy app", status: "done" },
  ]);

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
