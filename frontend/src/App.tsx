//
// COMPLETE STUDENT MANAGEMENT APP
//
import { useState, useEffect } from 'react';
import { studentsApi } from './services/api';
import { StudentCard } from './components/StudentCard';
import { StudentForm } from './components/StudentForm';
import './App.css';

//
// MAIN APP COMPONENT
//
function App() {
  //
  // STATE
  //
  // List of students
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // UI state: show/hide add form
  const [showAddForm, setShowAddForm] = useState(false);
  // UI state: which student is being edited
  const [editingStudent, setEditingStudent] = useState(null);
  // null = tidak ada yang di-edit
  // Student object = ada yang di-edit

  //
  // FETCH ON MOUNT
  //
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // START LOADING
        setLoading(true);
        setError(null); // Clear previous errors
        // FETCH
        const response = await studentsApi.getAll();
        // SUCCESS
        setStudents(response.data);
      } catch (err) {
        // ERROR
        console.error('Error:', err);
        setError('Failed to load students. Please try again.');
      } finally {
        // ALWAYS RUN (success or error)
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  //
  // CONDITIONAL RENDERING
  //
  // Loading state
  if (loading) {
    return <div className="loading">Loading students...</div>;
  }
  // Error state
  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  //
  // CRUD OPERATIONS
  //
  //
  // CREATE - Add New Student
  //
  const handleAddStudent = async (studentData: unknown) => {
    try {
      const response = await studentsApi.create(studentData);
      // Create complete Student object
      setStudents([...students, response.data]);
      // [...students, newStudent] creates NEW array
      // Close form
      setShowAddForm(false);
      // Optional: Show success message
      alert(`Student added successfully!`);
    } catch (error) {
      alert('Failed to add student');
      console.error(error);
    }
  };

  //
  // READ - Already handled by rendering students.map()
  //

  //
  // UPDATE - Edit Existing Student
  //
  const handleEditStudent = async (id: string, updates: unknown) => {
    try {
      const response = await studentsApi.update(id, updates);
      // Shorter version (ternary):
      setStudents(students.map((s) => (s._id === id ? response.data : s)));
      // Close edit form
      setEditingStudent(null);
      // Show success message
      alert('Student updated successfully!');
    } catch (error) {
      alert('Failed to update student');
      console.error(error);
    }
  };

  //
  // DELETE - Remove Student
  //
  const handleDeleteStudent = async (id: string) => {
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
    try {
      await studentsApi.delete(id);
      setStudents(students.filter((s) => s._id !== id));
      alert('Student deleted!');
    } catch (error) {
      alert('Student deleted successfully!');
      console.error(error);
    }
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
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                key={student._id}
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
                onDelete={() => handleDeleteStudent(student._id)}
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
          onSubmit={(updates) => handleEditStudent(editingStudent._id, updates)}
          // Arrow function: pass student ID + updates
          onClose={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
}

export default App;
