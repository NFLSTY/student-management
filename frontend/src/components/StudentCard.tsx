//
// STUDENT CARD COMPONENT
// Purpose: Display student information in a card layout
//
//
// INTERFACE - Define props structure
//
interface StudentCardProps {
  // Required props (no ?)
  name: string;
  nim: string;
  email: string;
  class: string; // 'class' OK dalam interface (not reserved here)
  gpa: number;
  status: 'active' | 'graduated' | 'dropout';
  // Union type: hanya boleh 3 nilai ini
  // Optional props (dengan ?)
  onEdit?: () => void;
  // Function yang tidak return apa-apa
  // Optional: bisa provided atau tidak
  onDelete?: () => void;
}
//
// COMPONENT FUNCTION
//
export function StudentCard({
  name,
  nim,
  email,
  class: className, // Rename 'class' to 'className'
  // class adalah reserved keyword di JSX
  // Solusi: destructure as different name
  gpa,
  status,
  onEdit,
  onDelete,
}: StudentCardProps) {
  //
  // HELPER FUNCTIONS
  //
  const getStatusColor = () => {
    // Return CSS class based on status
    switch (status) {
      case 'active':
        return 'status-active'; // Green
      case 'graduated':
        return 'status-graduated'; // Blue
      case 'dropout':
        return 'status-dropout'; // Red
      default:
        return '';
    }
  };
  const getStatusLabel = () => {
    // Convert status to Indonesian
    const labels = {
      active: 'Aktif',
      graduated: 'Lulus',
      dropout: 'Dropout',
    };
    return labels[status];
  };
  //
  // RENDER
  //
  return (
    <div className="student-card">
      {/*        */}
      {/* HEADER */}
      {/*        */}
      <div className="student-header">
        <h3 className="student-name">{name}</h3>
        {/* Display name from props */}
        <span className={`status-badge ${getStatusColor()}`}>
          {/* 
              Dynamic className:
              - Base: 'status-badge'
              - Dynamic: getStatusColor() result
              Example: "status-badge status-active"
          */}
          {getStatusLabel()}
          {/* Display: Aktif / Lulus / Dropout */}
        </span>
      </div>
      {/*                     */}
      {/* BODY - Student Info */}
      {/*                     */}
      <div className="student-info">
        <div className="info-row">
          <span className="label">NIM:</span>
          <span className="value">{nim}</span>
        </div>
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{email}</span>
        </div>
        <div className="info-row">
          <span className="label">Kelas:</span>
          <span className="value">{className}</span>
          {/* Use renamed variable */}
        </div>
        <div className="info-row">
          <span className="label">IPK:</span>
          <span className="value">
            {gpa.toFixed(2)}
            {/* 
                toFixed(2) = format to 2 decimal places
                Example: 3.7 → "3.70"
                3.756 → "3.76" (rounded) 
            */}
          </span>
        </div>
      </div>
      {/*                            */}
      {/* ACTIONS - Optional buttons */}
      {/*                            */}
      {(onEdit || onDelete) && (
        // Conditional rendering
        // Show hanya jika ada onEdit ATAU onDelete
        // && = AND operator untuk conditional rendering
        <div className="student-actions">
          {onEdit && (
            // Show Edit button hanya jika onEdit provided
            <button
              className="btn btn-edit"
              onClick={onEdit}
              // Call onEdit function saat diklik
            >
              Edit
            </button>
          )}
          {onDelete && (
            // Show Delete button hanya jika onDelete provided
            <button className="btn btn-delete" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
