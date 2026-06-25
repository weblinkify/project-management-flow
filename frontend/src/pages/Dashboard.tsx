import Sidebar from "../components/Sidebar";
import { useMemo } from "react";

type TaskStatus = "todo" | "progress" | "done" | "blocked";

type Task = {
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

const generateTasks = (): Task[] => {
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
      title: getRandomTaskName(), // ✅ REALISTIC NAME
      status,
    });
  }

  return tasks;
};


export default function Dashboard() {
  const tasks = useMemo(() => generateTasks(), []);

  const total = tasks.length;

  const todo = tasks.filter((t) => t.status === "todo").length;
  const progress = tasks.filter((t) => t.status === "progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const blocked = tasks.filter((t) => t.status === "blocked").length;

  const active = todo + progress;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Project Overview
          </h1>
          <p className="text-gray-500 mt-1">
            420 tasks across active projects
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <p className="text-gray-500 text-sm">Total</p>
            <h2 className="text-3xl font-bold">{total}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <p className="text-gray-500 text-sm">Active</p>
            <h2 className="text-3xl font-bold">{active}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <p className="text-gray-500 text-sm">Done</p>
            <h2 className="text-3xl font-bold text-green-500">
              {done}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <p className="text-gray-500 text-sm">In Progress</p>
            <h2 className="text-3xl font-bold text-indigo-600">
              {progress}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <p className="text-gray-500 text-sm">Blocked</p>
            <h2 className="text-3xl font-bold text-red-500">
              {blocked}
            </h2>
          </div>
        </div>

        {/* JIRA STYLE HEALTH BAR */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <h2 className="font-semibold mb-4">
            Project Health (420 tasks)
          </h2>

          <div className="flex h-4 rounded-full overflow-hidden">
            <div
              className="bg-green-400"
              style={{ width: `${(done / total) * 100}%` }}
            />
            <div
              className="bg-indigo-600"
              style={{ width: `${(progress / total) * 100}%` }}
            />
            <div
              className="bg-gray-400"
              style={{ width: `${(todo / total) * 100}%` }}
            />
            <div
              className="bg-red-500"
              style={{ width: `${(blocked / total) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Done</span>
            <span>In Progress</span>
            <span>To Do</span>
            <span>Blocked</span>
          </div>
        </div>

        {/* WORK SUMMARY GRID */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="font-semibold mb-4">
              Work Distribution
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Done</span>
                <span>{done}</span>
              </div>

              <div className="flex justify-between">
                <span>Progress</span>
                <span>{progress}</span>
              </div>

              <div className="flex justify-between">
                <span>Todo</span>
                <span>{todo}</span>
              </div>

              <div className="flex justify-between text-red-500">
                <span>Blocked</span>
                <span>{blocked}</span>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="col-span-2 bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="font-semibold mb-4">
              Recent Activity
            </h3>

            <div className="space-y-2">
              {tasks.slice(0, 8).map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between bg-gray-50 p-3 rounded-xl"
                >
                  <span>{t.title}</span>

                  <span className="text-xs text-gray-500">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
