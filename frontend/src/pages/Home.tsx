import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[93dvh] bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center p-4">

      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="w-full max-w-md relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden text-center">

        <div className="bg-gradient-to-r from-gray-600 to-gray-800 px-8 py-8">
          <h1 className="text-3xl font-bold text-white">
            ProjectFlow
          </h1>
          <p className="text-gray-100 mt-2">
            Modern appointment booking system.
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-6">

          <p className="text-gray-600 text-sm leading-relaxed">
            Manage appointments, employees, and services in one simple platform.
          </p>

          <Link to="/book">
            <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg shadow-lg transition">
              Book Appointment
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}