import { TaskStatus } from "../types/task";
import TaskCard from "./TaskCard";

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

export default function KanbanColumn({
  title,
  statusKey,
  tasks,
  onDropTask,
}: {
  title: string;
  statusKey: TaskStatus;
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: TaskStatus) => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow p-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("taskId");
        onDropTask(taskId, statusKey);
      }}
    >
      <h2 className="font-semibold mb-4">{title}</h2>

      <div className="space-y-3 min-h-[300px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
