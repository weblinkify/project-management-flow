import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.js';
import api from '../lib/api.js';
import { AlertCircle } from 'lucide-react';
import type { AuthResponse } from '../types/index.js';

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...payload } = formData;
      const response = await api.post<AuthResponse>('/auth/register', payload);
      const { user, token } = response.data;
      setAuth(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordStrong = formData.password.length >= 8;
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0;
  const isFormValid = formData.name && isEmailValid && isPasswordStrong && passwordsMatch;

  const roles = [
    { value: 'customer', label: '👤 Customer' },
    { value: 'employee', label: '👨‍💼 Employee' },
    { value: 'admin', label: '👑 Business Owner' }
  ];

  return (
    <div className="min-h-[93dvh] bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center p-4 py-12">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-600 to-gray-800 px-8 py-8">
            <h1 className="text-3xl font-bold text-white text-center">Join ProjectFlow</h1>
            <p className="text-gray-100 text-center mt-2">Start managing your bookings today</p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-800 font-medium text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-500 rounded-lg focus:outline-none transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  required
                  className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 ${touched.email && !isEmailValid
                      ? 'border-red-400 bg-red-50'
                      : formData.email && isEmailValid
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400 focus:border-gray-500'
                    }`}
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  required
                  className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 ${isPasswordStrong && formData.password
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400 focus:border-gray-500'
                    }`}
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-600 mt-1">Minimum 8 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  required
                  className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 ${passwordsMatch && formData.confirmPassword
                      ? 'border-green-400 bg-green-50'
                      : formData.confirmPassword && !passwordsMatch
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400 focus:border-gray-500'
                    }`}
                  placeholder="••••••••"
                />

                {formData.confirmPassword && (
                  <p className={`text-sm mt-1 ${passwordsMatch ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Type
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-500 rounded-lg focus:outline-none transition-all duration-200"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-700 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
