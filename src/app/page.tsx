import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';

export default function HomePage() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navbar />
          <div className="main__centerblock centerblock">
            <SearchBar />
            {/* ДЛЯ СЛЕД ДЗ */}
          </div>
          <Sidebar />
        </main>
      </div>
    </div>
  );
}
