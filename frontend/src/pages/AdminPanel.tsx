import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth.js';
import api from '../lib/api.js';
import type { Appointment, Service, Employee } from '../types/index.js';

export default function AdminPanel() {
  const { logout } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'employees'>('appointments');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [aptsRes, srvRes, empRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/services'),
        api.get('/employees')
      ]);
      setAppointments(aptsRes.data);
      setServices(srvRes.data);
      setEmployees(empRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[93dvh] bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-gray-600">{appointments.length}</div>
            <p className="text-gray-600 mt-2">Total Appointments</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">{services.length}</div>
            <p className="text-gray-600 mt-2">Services</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600">{employees.length}</div>
            <p className="text-gray-600 mt-2">Employees</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-orange-600">
              €{appointments.reduce((sum, a) => sum + a.service.price, 0).toFixed(2)}
            </div>
            <p className="text-gray-600 mt-2">Total Revenue</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'appointments'
                  ? 'border-b-2 border-gray-600 text-gray-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'services'
                  ? 'border-b-2 border-gray-600 text-gray-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Services ({services.length})
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'employees'
                  ? 'border-b-2 border-gray-600 text-gray-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Employees ({employees.length})
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : activeTab === 'appointments' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold">Service</th>
                      <th className="text-left py-3 px-4 font-semibold">Employee</th>
                      <th className="text-left py-3 px-4 font-semibold">Date & Time</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(apt => (
                      <tr key={apt.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{apt.customer.name}</td>
                        <td className="py-3 px-4">{apt.service.name}</td>
                        <td className="py-3 px-4">{apt.employee.user.name}</td>
                        <td className="py-3 px-4">{new Date(apt.date).toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            apt.status === 'SCHEDULED' ? 'bg-gray-100 text-gray-800' :
                            apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'services' ? (
              <div className="grid md:grid-cols-2 gap-4">
                {services.map(service => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg">{service.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Duration: {service.duration} mins</span>
                      <span className="font-bold text-gray-600">€{service.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {employees.map(emp => (
                  <div key={emp.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg">{emp.user.name}</h3>
                    <p className="text-gray-600 text-sm">{emp.user.email}</p>
                    {emp.specialization && (
                      <p className="text-gray-600 text-sm mt-2">Specialization: {emp.specialization}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
