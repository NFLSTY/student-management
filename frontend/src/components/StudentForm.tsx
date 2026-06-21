//
// STUDENT FORM - Complete Example
//
import { useState } from 'react';
//
// INTERFACES
//
interface StudentFormData {
  name: string;
  nim: string;
  email: string;
  class: string;
  year: number;
  gpa: number;
  status: 'active' | 'graduated' | 'dropout';
}
interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
  // Callback function to parent
  onClose: () => void;
  initialData?: StudentFormData; // For edit mode
}
//
// COMPONENT
//
export function StudentForm({
  onSubmit,
  onClose,
  initialData,
}: StudentFormProps) {
  //
  // STATE
  //
  const [formData, setFormData] = useState<StudentFormData>(
    initialData || {
      // Use initialData if provided (edit mode)
      // Otherwise use default values (add mode)
      name: '',
      nim: '',
      email: '',
      class: '',
      year: 2023,
      gpa: 0,
      status: 'active',
    },
  );
  //
  // EVENT HANDLERS
  //
  //
  // Handle Input Change (for text, email, select)
  //
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    // Union type: bisa HTMLInputElement OR HTMLSelectElement
  ) => {
    const { name, value } = e.target;
    // Destructure:
    // name = input name attribute
    // value = input current value
    // Example:
    // <input name="nim" value="23.11.5001" />
    // name = "nim"
    // value = "23.11.5001"
    setFormData({
      ...formData, // Copy all existing fields
      [name]: value, // Update specific field
      // [name] = computed property name
      // If name = "nim", this becomes: nim: value
      // If name = "email", this becomes: email: value
    });
    // Example execution:
    // User types in NIM input
    // name = "nim", value = "23.11.5001"
    // setFormData({
    // ...formData,
    // nim: "23.11.5001" // Update nim field
    // })
  };
  //
  // Handle Number Input Change
  //
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value), // Convert string to number
      // Input value is always string: "3.75"
      // Number("3.75") → 3.75 (number type)
    });
  };
  //
  // Handle Form Submit
  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prevent default form behavior (page reload)
    // Without this, browser akan reload page saat submit
    // Validation
    if (!formData.name || !formData.nim || !formData.email) {
      alert('Please fill all required fields');
      return; // Stop execution
    }
    // Call parent's onSubmit dengan form data
    onSubmit(formData);
    // Parent akan handle ini (add to list, send to API, etc)
  };
  //
  // RENDER
  //
  return (
    <div className="modal-overlay">
      {/* Overlay: semi-transparent background */}
      <div className="modal-content">
        {/*        */}
        {/* HEADER */}
        {/*        */}
        <div className="modal-header">
          <h2>{initialData ? 'Edit' : 'Add'} Student</h2>
          {/* Ternary: show "Edit" or "Add" based on mode */}
          <button
            className="close-button"
            onClick={onClose}
            type="button" // Prevent form submit
          ></button>
        </div>
        {/*      */}
        {/* FORM */}
        {/*      */}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">
              {/* htmlFor bukan 'for' (reserved keyword) */}
              Nama Lengkap <span className="required">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              // Controlled: value from state
              onChange={handleChange}
              // Update state saat user type
              placeholder="Contoh: Ahmad Santoso"
              required
              // HTML5 validation
            />
          </div>
          {/* NIM Field */}
          <div className="form-group">
            <label htmlFor="nim">
              NIM <span className="required">*</span>
            </label>
            <input
              id="nim"
              name="nim"
              type="text"
              value={formData.nim}
              onChange={handleChange}
              placeholder="Contoh: 23.11.5001"
              pattern="[0-9]{2}\.[0-9]{2}\.[0-9]{4}"
              // Regex pattern validation
              // Format: XX.XX.XXXX
              title="Format: XX.XX.XXXX"
              // Tooltip saat hover
              required
            />
          </div>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              // type="email" = HTML5 email validation
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@student.amikom.ac.id"
              required
            />
          </div>
          {/* Class Field */}
          <div className="form-group">
            <label htmlFor="class">
              Kelas <span className="required">*</span>
            </label>
            <input
              id="class"
              name="class"
              type="text"
              value={formData.class}
              onChange={handleChange}
              placeholder="Contoh: IF-A"
              required
            />
          </div>
          {/* Year Field */}
          <div className="form-group">
            <label htmlFor="year">
              Tahun Masuk <span className="required">*</span>
            </label>
            <input
              id="year"
              name="year"
              type="number"
              // type="number" = HTML5 number input
              // Shows spinner controls
              value={formData.year}
              onChange={handleNumberChange}
              // Use handleNumberChange to convert to number
              min="2020"
              max="2030"
              // Min/max validation
              required
            />
          </div>
          {/* GPA Field */}
          <div className="form-group">
            <label htmlFor="gpa">
              IPK <span className="required">*</span>
            </label>
            <input
              id="gpa"
              name="gpa"
              type="number"
              value={formData.gpa}
              onChange={handleNumberChange}
              step="0.01"
              // Allow decimals: 3.75, 3.76, etc.
              min="0"
              max="4"
              // IPK range 0-4
              placeholder="0.00 - 4.00"
              required
            />
          </div>
          {/* Status Field */}
          <div className="form-group">
            <label htmlFor="status">
              Status <span className="required">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Aktif</option>
              <option value="graduated">Lulus</option>
              <option value="dropout">Dropout</option>
            </select>
          </div>
          {/*         */}
          {/* ACTIONS */}
          {/*         */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              // type="button" prevents form submit
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
