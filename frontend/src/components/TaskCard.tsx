type Task = {
  id: string;
  title: string;
  status: string;
};

export default function TaskCard({
  task,
}: {
  task: Task;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
      }}
      className="p-3 bg-gray-50 border rounded-lg cursor-grab active:cursor-grabbing hover:shadow transition"
    >
      <p className="text-sm font-medium">{task.title}</p>
    </div>
  );
}
