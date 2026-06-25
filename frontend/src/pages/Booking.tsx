import { useState } from "react";

interface BookingForm {
  service: string;
  employee: string;
  date: string;
  time: string;
}

interface FormErrors {
  service?: string;
  employee?: string;
  date?: string;
  time?: string;
}

export default function Booking() {
  const [form, setForm] = useState<BookingForm>({
    service: "",
    employee: "",
    date: "",
    time: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const services = ["Haircut", "Massage", "Consultation"];
  const employees = ["John", "Anna", "Mike"];
  const times = ["09:00", "10:00", "11:00", "14:00", "15:00"];

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.service.trim()) {
      newErrors.service = "Please select a service";
    }

    if (!form.employee.trim()) {
      newErrors.employee = "Please select an employee";
    }

    if (!form.date.trim()) {
      newErrors.date = "Please select a date";
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "Cannot book appointments in the past";
      }
    }

    if (!form.time.trim()) {
      newErrors.time = "Please select a time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid for submit button
  const isFormValid = (): boolean => {
    return (
      form.service.trim() !== "" &&
      form.employee.trim() !== "" &&
      form.date.trim() !== "" &&
      form.time.trim() !== "" &&
      Object.keys(errors).length === 0
    );
  };

  // Handle field change
  const handleFieldChange = (field: keyof BookingForm, value: string) => {
    setForm({ ...form, [field]: value });
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }

    // Clear success message when user modifies form
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submit
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: form
          });
        }, 1500);
      });

      console.log("Booking submitted:", response);
      
      // Show success message
      setSubmitSuccess(true);

      // Reset form
      setForm({
        service: "",
        employee: "",
        date: "",
        time: ""
      });
      setErrors({});

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Booking failed:", error);
      setErrors({ service: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[93dvh] bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center p-4">
      
      {/* Background blur blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-800 px-8 py-8">
          <h1 className="text-3xl font-bold text-white text-center">
            Book Appointment
          </h1>
          <p className="text-gray-100 text-center mt-2">
            Schedule your service easily
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mx-8 mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <p className="text-green-800 font-semibold">✅ Booking Confirmed!</p>
            <p className="text-green-700 text-sm mt-1">
              Your appointment has been scheduled. Check your email for confirmation.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service <span className="text-red-500">*</span>
            </label>
            <select
              value={form.service}
              onChange={(e) => handleFieldChange("service", e.target.value)}
              className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition ${
                errors.service
                  ? "border-red-500 focus:border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-gray-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.service && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.service}
              </p>
            )}
          </div>

          {/* Employee */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Employee <span className="text-red-500">*</span>
            </label>
            <select
              value={form.employee}
              onChange={(e) => handleFieldChange("employee", e.target.value)}
              className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition ${
                errors.employee
                  ? "border-red-500 focus:border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-gray-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Employee</option>
              {employees.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
            {errors.employee && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.employee}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition ${
                errors.date
                  ? "border-red-500 focus:border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-gray-500 hover:border-gray-400"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.date}
              </p>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time <span className="text-red-500">*</span>
            </label>
            <select
              value={form.time}
              onChange={(e) => handleFieldChange("time", e.target.value)}
              className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition ${
                errors.time
                  ? "border-red-500 focus:border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-gray-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Time</option>
              {times.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.time && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.time}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full font-bold py-3 rounded-lg shadow-lg transition ${
              isFormValid() && !isSubmitting
                ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span>
                Booking...
              </span>
            ) : (
              "Confirm Booking"
            )}
          </button>

          {/* Form Info */}
          <p className="text-gray-500 text-xs text-center mt-4">
            All fields marked with <span className="text-red-500">*</span> are required
          </p>

        </form>
      </div>
    </div>
  );
}
