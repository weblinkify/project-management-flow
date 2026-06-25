export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee' | 'customer';
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface Employee {
  id: string;
  user: User;
  specialization?: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  serviceId: string;
  employeeId: string;
  date: string;
  notes?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  customer: User;
  service: Service;
  employee: Employee;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}