import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-xl font-bold mb-8">ProjectFlow</h1>

      <nav className="space-y-4">
        <Link to="/" className="block hover:text-gray-300">
          Dashboard
        </Link>

        <Link to="/projects" className="block hover:text-gray-300">
          Projects
        </Link>

        <Link to="/board" className="block hover:text-gray-300">
          Kanban Board
        </Link>
      </nav>
    </aside>
  );
}
