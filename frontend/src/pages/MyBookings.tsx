import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.js";
import { Calendar, Clock, User, Trash2, Edit2, Plus, AlertCircle } from "lucide-react";

interface Booking {
  id: string;
  service: string;
  employee: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  createdAt: string;
}

export default function MyBookings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Booking | null>(null);

  // Fetch bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      const mockBookings: Booking[] = [
        {
          id: "1",
          service: "Haircut",
          employee: "John",
          date: "2026-07-05",
          time: "10:00",
          status: "confirmed",
          createdAt: "2026-06-24"
        },
        {
          id: "2",
          service: "Massage",
          employee: "Anna",
          date: "2026-06-26",
          time: "14:00",
          status: "confirmed",
          createdAt: "2026-06-20"
        },
        {
          id: "3",
          service: "Consultation",
          employee: "Mike",
          date: "2026-06-15",
          time: "09:00",
          status: "completed",
          createdAt: "2026-06-10"
        },
        {
          id: "4",
          service: "Haircut",
          employee: "John",
          date: "2026-06-01",
          time: "11:00",
          status: "cancelled",
          createdAt: "2026-05-28"
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setBookings(mockBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings
  const getFilteredBookings = () => {
    const now = new Date();
    
    return bookings.filter(booking => {
      if (filter === "all") return true;
      if (filter === "upcoming") {
        return new Date(booking.date) > now && booking.status === "confirmed";
      }
      if (filter === "completed") return booking.status === "completed";
      if (filter === "cancelled") return booking.status === "cancelled";
      return true;
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fi-FI", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Handle cancel booking
  const handleCancelBooking = async (bookingId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: "cancelled" } : b
      ));
      
      setShowCancelModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  // Handle reschedule
  const handleReschedule = async () => {
    if (!editForm) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setBookings(bookings.map(b => 
        b.id === editForm.id ? editForm : b
      ));
      
      setShowEditModal(false);
      setEditForm(null);
    } catch (error) {
      console.error("Failed to reschedule booking:", error);
    }
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600 text-lg">Manage and track your appointments</p>
        </div>

        {/* Action Button */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => navigate("/book")}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
          >
            <Plus size={20} />
            New Booking
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {["all", "upcoming", "completed", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === tab
                    ? "bg-gray-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="ml-2 text-sm">
                  ({filteredBookings.length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin inline-block">⏳</div>
            <p className="text-gray-600 mt-4">Loading your bookings...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {filter === "all"
                ? "You haven't made any bookings yet."
                : `You have no ${filter} bookings.`}
            </p>
            <button
              onClick={() => navigate("/book")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Create Your First Booking
            </button>
          </div>
        )}

        {/* Bookings List */}
        {!loading && filteredBookings.length > 0 && (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-gray-600"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{booking.service}</h3>
                        <p className="text-gray-600 text-sm mt-1">Booking ID: #{booking.id}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar size={20} className="text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Date</p>
                          <p className="text-gray-900 font-semibold">{formatDate(booking.date)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock size={20} className="text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Time</p>
                          <p className="text-gray-900 font-semibold">{booking.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <User size={20} className="text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Professional</p>
                          <p className="text-gray-900 font-semibold">{booking.employee}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {booking.status === "confirmed" && (
                    <div className="flex gap-2 md:flex-col">
                      <button
                        onClick={() => {
                          setEditForm(booking);
                          setShowEditModal(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all"
                      >
                        <Edit2 size={18} />
                        <span className="hidden md:inline">Reschedule</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowCancelModal(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold transition-all"
                      >
                        <Trash2 size={18} />
                        <span className="hidden md:inline">Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={24} className="text-red-600" />
              <h3 className="text-2xl font-bold text-gray-900">Cancel Booking?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your {selectedBooking.service} appointment on{" "}
              <strong>{formatDate(selectedBooking.date)}</strong> at <strong>{selectedBooking.time}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(selectedBooking.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showEditModal && editForm && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Reschedule Booking</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Date
                </label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Time
                </label>
                <select
                  value={editForm.time}
                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
