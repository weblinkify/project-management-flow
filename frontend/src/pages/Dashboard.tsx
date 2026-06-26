import Sidebar from "../components/Sidebar";
import { useMemo } from "react";
import { generateTasks } from "../data/tasks";
import StatusBadge from "../components/StatusBadge";
import TaskPieChart from "../components/TaskPieChart";

export default function Dashboard() {
  const tasks = useMemo(() => generateTasks(), []);

  const total = tasks.length;

  const todo = tasks.filter((t) => t.status === "todo").length;
  const progress = tasks.filter((t) => t.status === "progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const blocked = tasks.filter((t) => t.status === "blocked").length;

  const active = todo + progress;

  return (
    <div className="flex min-h-screen bg-[#F4F5F7]">
      <Sidebar />

      <main className="flex-1 p-10 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Project Overview
          </h1>
          <p className="text-slate-500 mt-2">
            Clean Jira-style analytics dashboard
          </p>
        </div>

        {/* KPI ROW */}
        <div className="grid grid-cols-4 gap-6">
          {[
            ["Total Tasks", total],
            ["Active", active],
            ["Done", done],
            ["Blocked", blocked],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white border border-slate-200 rounded-2xl p-6"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <h2 className="text-3xl font-semibold mt-2 text-slate-900">
                {value}
              </h2>
            </div>
          ))}
        </div>

        {/* ANALYTICS GRID (IMPORTANT — MORE AIRY LIKE JIRA) */}
        <div className="grid grid-cols-2 gap-8">
          {/* LEFT: PIE CHART */}
          <TaskPieChart
            done={done}
            progress={progress}
            todo={todo}
            blocked={blocked}
          />

          {/* RIGHT: SIMPLE METRICS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 mb-6">
              Work Breakdown
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Done</span>
                <span className="text-emerald-600 font-semibold">
                  {done}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">In Progress</span>
                <span className="text-blue-600 font-semibold">
                  {progress}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">To Do</span>
                <span className="text-amber-600 font-semibold">
                  {todo}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Blocked</span>
                <span className="text-rose-600 font-semibold">
                  {blocked}
                </span>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-8">
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(done / total) * 100}%` }}
                />
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(progress / total) * 100}%` }}
                />
                <div
                  className="bg-amber-400 h-full"
                  style={{ width: `${(todo / total) * 100}%` }}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${(blocked / total) * 100}%` }}
                />
              </div>

              {/* labels */}
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Done</span>
                <span>In Progress</span>
                <span>To Do</span>
                <span>Blocked</span>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY (CLEAN + AIRY LIKE JIRA) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-semibold text-slate-800 mb-5">
            Recent Activity
          </h2>

          <div className="space-y-3">
            {tasks.slice(0, 2).map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition"
              >
                <span className="text-slate-700">{t.title}</span>

                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
