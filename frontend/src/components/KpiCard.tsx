type Props = {
  title: string;
  value: number;
  subtitle?: string;
  tone?: "slate" | "blue" | "green" | "amber" | "red";
};

const tones = {
  slate: "bg-white border-slate-200 text-slate-900",
  blue: "bg-white border-sky-200 text-sky-700",
  green: "bg-white border-emerald-200 text-emerald-700",
  amber: "bg-white border-amber-200 text-amber-700",
  red: "bg-white border-rose-200 text-rose-700",
};

export default function KpiCard({
  title,
  value,
  subtitle,
  tone = "slate",
}: Props) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${tones[tone]}`}>
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <h2 className="text-3xl font-semibold mt-2">{value}</h2>

      {subtitle && (
        <p className="text-xs mt-2 text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}
