import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 min-h-screen bg-[#1D2125] text-white flex flex-col justify-between">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="px-6 py-5 border-b border-white/10">
          <h1 className="text-lg font-semibold tracking-wide">
            ProjectFlow
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Workspace
          </p>
        </div>

        {/* NAV */}
        <nav className="mt-6 px-3 space-y-1 text-sm">
          <SidebarItem
            to="/"
            label="Dashboard"
            active={isActive("/")}
          />
          <SidebarItem
            to="/projects"
            label="Projects"
            active={isActive("/projects")}
          />
          <SidebarItem
            to="/board"
            label="Kanban Board"
            active={isActive("/board")}
          />
        </nav>
      </div>

      {/* BOTTOM SECTION (like Jira profile/workspace) */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
            P
          </div>

          <div className="leading-tight">
            <p className="text-sm font-medium">Project Admin</p>
            <p className="text-xs text-gray-400">admin@flow.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ======================= */
/* SIDEBAR ITEM COMPONENT  */
/* ======================= */

function SidebarItem({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-md transition
        ${
          active
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      {/* bullet icon like Jira */}
      <span
        className={`w-2 h-2 rounded-full ${
          active ? "bg-blue-500" : "bg-gray-600"
        }`}
      />

      {label}
    </Link>
  );
}
