//
// COMPLETE STUDENT MANAGEMENT APP
//
import { useState } from 'react';
import { StudentCard } from './components/StudentCard';
import { StudentForm } from './components/StudentForm';
import './App.css';
//
// INTERFACES
//
interface Student {
  id: string; // Unique identifier
  name: string;
  nim: string;
  email: string;
  class: string;
  year: number;
  gpa: number;
  status: 'active' | 'graduated' | 'dropout';
  createdAt: Date; // Timestamp
}
interface StudentFormData {
  // Same as Student tapi without id & createdAt
  // Untuk form input (user tidak input id & createdAt)
  name: string;
  nim: string;
  email: string;
  class: string;
  year: number;
  gpa: number;
  status: 'active' | 'graduated' | 'dropout';
}
//
// MAIN APP COMPONENT
//
function App() {
  //
  // STATE
  //
  // List of students
  const [students, setStudents] = useState<Student[]>([
    // Initial mock data
    {
      id: '1',
      name: 'Ahmad Santoso',
      nim: '23.11.5001',
      email: 'ahmad@student.amikom.ac.id',
      class: 'IF-A',
      year: 2023,
      gpa: 3.75,
      status: 'active',
      createdAt: new Date('2023-09-01'),
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      nim: '23.11.5002',
      email: 'siti@student.amikom.ac.id',
      class: 'IF-B',
      year: 2023,
      gpa: 3.92,
      status: 'active',
      createdAt: new Date('2023-09-01'),
    },
    {
      id: '3',
      name: 'Budi Setiawan',
      nim: '22.11.5015',
      email: 'budi@student.amikom.ac.id',
      class: 'IF-A',
      year: 2022,
      gpa: 3.45,
      status: 'active',
      createdAt: new Date('2022-09-01'),
    },
  ]);
  // UI state: show/hide add form
  const [showAddForm, setShowAddForm] = useState(false);
  // UI state: which student is being edited
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  // null = tidak ada yang di-edit
  // Student object = ada yang di-edit
  //
  // CRUD OPERATIONS
  //
  //
  // CREATE - Add New Student
  //
  const handleAddStudent = (studentData: StudentFormData) => {
    // Create complete Student object
    const newStudent: Student = {
      id: Date.now().toString(),
      // Simple ID generation: timestamp
      // Example: "1708424567890"
      // In real app: use UUID or database-generated ID
      ...studentData,
      // Spread all fields from form data
      // name, nim, email, class, year, gpa, status
      createdAt: new Date(),
      // Current timestamp
    };
    // Add to students array (immutable way)
    setStudents([...students, newStudent]);
    // [...students, newStudent] creates NEW array
    // Old array: [{id:1}, {id:2}, {id:3}]
    // New array: [{id:1}, {id:2}, {id:3}, {id:4}]
    // Close form
    setShowAddForm(false);
    // Optional: Show success message
    alert(`Student ${newStudent.name} added successfully!`);
  };
  //
  // READ - Already handled by rendering students.map()
  //
  //
  // UPDATE - Edit Existing Student
  //
  const handleEditStudent = (id: string, updates: StudentFormData) => {
    // Update students array (immutable way)
    setStudents(
      students.map((student) => {
        // Loop through all students
        if (student.id === id) {
          // This is the student to update
          return {
            ...student, // Keep existing fields (id, createdAt)
            ...updates, // Override with new data
          };
          // Example:
          // student = { id: '1', name: 'John', gpa: 3.5, createdAt: ... }
          // updates = { name: 'Johnny', gpa: 3.75, ... }
          // Result: { id: '1', name: 'Johnny', gpa: 3.75, createdAt: ... }
        } else {
          // Not the one to update, keep as is
          return student;
        }
      }),
    );
    // Shorter version (ternary):
    setStudents(students.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    // Close edit form
    setEditingStudent(null);
    // Show success message
    alert('Student updated successfully!');
  };
  //
  // DELETE - Remove Student
  //
  const handleDeleteStudent = (id: string) => {
    // Confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this student?\n\n' +
        'This action cannot be undone.',
    );
    if (!confirmed) {
      // User clicked Cancel
      return; // Stop execution
    }
    // User clicked OK, proceed with delete
    setStudents(
      students.filter((student) => student.id !== id),
      // filter creates NEW array
      // Keep only students where id !== id to delete
      // Example:
      // students = [{id:'1'}, {id:'2'}, {id:'3'}]
      // Delete id='2'
      // filter(s => s.id !== '2')
      // Iteration 1: {id:'1'} → '1' !== '2' → true → KEEP
      // Iteration 2: {id:'2'} → '2' !== '2' → false → REMOVE
      // Iteration 3: {id:'3'} → '3' !== '2' → true → KEEP
      // Result: [{id:'1'}, {id:'3'}]
    );
    // Show success message
    alert('Student deleted successfully!');
  };
  //
  // HELPER FUNCTIONS
  //
  const getTotalStudents = () => students.length;
  const getActiveStudents = () =>
    students.filter((s) => s.status === 'active').length;
  const getAverageGPA = () => {
    if (students.length === 0) return 0;
    const total = students.reduce((sum, s) => sum + s.gpa, 0);
    // reduce: sum all GPAs
    // Start with 0, add each student's GPA
    return (total / students.length).toFixed(2);
  };
  //
  // RENDER
  //
  return (
    <div className="app">
      {/*        */}
      {/* HEADER */}
      {/*        */}
      <header className="app-header">
        <h1>Student Management System</h1>
        <p className="subtitle">Universitas Amikom Yogyakarta</p>
      </header>
      {/*            */}
      {/* STATISTICS */}
      {/*            */}
      <div className="stats">
        <div className="stat-card">
          <h3>{getTotalStudents()}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{getActiveStudents()}</h3>
          <p>Active Students</p>
        </div>
        <div className="stat-card">
          <h3>{getAverageGPA()}</h3>
          <p>Average GPA</p>
        </div>
      </div>
      {/*         */}
      {/* ACTIONS */}
      {/*         */}
      <div className="actions">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add New Student
        </button>
      </div>
      {/*               */}
      {/* STUDENTS LIST */}
      {/*               */}
      <div className="students-container">
        {students.length === 0 ? (
          // Empty state
          <div className="empty-state">
            <p>No students yet.</p>
            <p>Click "Add New Student" to get started!</p>
          </div>
        ) : (
          // Students grid
          <div className="students-grid">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                // key WAJIB untuk list!
                // Must be unique & stable
                {...student}
                // Spread all student properties as props
                // Equivalent to:
                // name={student.name}
                // nim={student.nim}
                // email={student.email}
                // etc.
                onEdit={() => setEditingStudent(student)}
                // Arrow function: pass student object to edit
                onDelete={() => handleDeleteStudent(student.id)}
                // Arrow function: pass student ID to delete
              />
            ))}
          </div>
        )}
      </div>
      {/*                */}
      {/* ADD FORM MODAL */}
      {/*                */}
      {showAddForm && (
        // Conditional rendering
        // Show hanya jika showAddForm = true
        <StudentForm
          onSubmit={handleAddStudent}
          onClose={() => setShowAddForm(false)}
        />
      )}
      {/*                 */}
      {/* EDIT FORM MODAL */}
      {/*                 */}
      {editingStudent && (
        // Show hanya jika ada student yang di-edit
        <StudentForm
          initialData={editingStudent}
          // Pass student data untuk pre-fill form
          onSubmit={(updates) => handleEditStudent(editingStudent.id, updates)}
          // Arrow function: pass student ID + updates
          onClose={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
}

export default App;
