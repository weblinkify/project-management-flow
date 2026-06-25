import Sidebar from "../components/Sidebar";

export default function Analytics() {
  const stats = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2400 },
    { month: "Apr", revenue: 2000 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold">€12,400</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Invoices Sent</p>
            <h2 className="text-2xl font-bold">84</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Paid Rate</p>
            <h2 className="text-2xl font-bold">92%</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Overdue</p>
            <h2 className="text-2xl font-bold">5</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Revenue
          </h2>

          <div className="space-y-4">
            {stats.map((item) => (
              <div key={item.month}>
                <div className="flex justify-between mb-1">
                  <span>{item.month}</span>
                  <span>€{item.revenue}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-indigo-400 h-4 rounded-full"
                    style={{ width: `${item.revenue / 30}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
