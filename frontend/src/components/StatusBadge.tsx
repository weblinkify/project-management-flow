import type { TaskStatus } from "../data/tasks";

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const styles =
    status === "done"
      ? "bg-emerald-100 text-emerald-700"
      : status === "progress"
      ? "bg-blue-100 text-blue-700"
      : status === "todo"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${styles}`}
    >
      {status}
    </span>
  );
}
