export function Footer() {
  // Arrow function syntax (alternative)
  const currentYear = new Date().getFullYear();
  // JavaScript di dalam component body
  // Execute every render
  return (
    <footer className="app-footer">
      <p>
        © {currentYear} Universitas Amikom Yogyakarta
        {/* Display current year dynamically */}
      </p>
      <p className="version">Version 1.0.0</p>
    </footer>
  );
}
