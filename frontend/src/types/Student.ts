//
// SHARED TYPES
// Purpose: TypeScript interfaces for Student data
//
export interface Student {
  id: string;
  name: string;
  nim: string;
  email: string;
  class: string;
  year: number;
  gpa: number;
  status: 'active' | 'graduated' | 'dropout';
  createdAt: Date;
}

export interface StudentFormData {
  // Same as Student but without auto-generated fields
  name: string;
  nim: string;
  email: string;
  class: string;
  year: number;
  gpa: number;
  status: 'active' | 'graduated' | 'dropout';
}
// Usage in other files:
// import { Student, StudentFormData } from '../types/Student';
