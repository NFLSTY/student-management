//
// Header Component
// Purpose: Display app header dengan title
//
//
// Component Function
//
export function Header() {
  // Named export (bukan default)
  // Import: import { Header } from './components/Header'
  return (
    <header className="app-header">
      {/* Semantic HTML: <header> untuk page header */}
      <h1>Sistem Manajemen Mahasiswa</h1>
      {/* Emoji di JSX work perfect! */}
      <p className="subtitle">Universitas Amikom Yogyakarta</p>
    </header>
  );
}
// Tidak ada export default
// Export sudah di function declaration
