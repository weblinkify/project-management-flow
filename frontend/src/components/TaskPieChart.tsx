import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  done: number;
  progress: number;
  todo: number;
  blocked: number;
};

export default function TaskPieChart({
  done,
  progress,
  todo,
  blocked,
}: Props) {
  const data = [
    { name: "Done", value: done },
    { name: "In Progress", value: progress },
    { name: "To Do", value: todo },
    { name: "Blocked", value: blocked },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-slate-800 font-semibold mb-4">
        Task Distribution
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
