import Sidebar from "../components/Sidebar";

export default function Projects() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>

        <div className="grid grid-cols-3 gap-6">
          {["BookFlow", "ProjectFlow", "ProjectFlow"].map(
            (name) => (
              <div
                key={name}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="font-semibold">{name}</h2>
                <p className="text-gray-500 text-sm mt-2">
                  SaaS Project
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
