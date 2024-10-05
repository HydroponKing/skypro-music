import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import Playlist from './components/Playlist';
import PlaylistPage from './components/PlaylistPage';
import Filters from './components/Filters';

export default function HomePage() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navbar />
          <div className="main__centerblock centerblock">
            <SearchBar />
            <Playlist />
            <PlaylistPage/>
          </div>
          <Sidebar />
        </main>
      </div>
    </div>
  );
}
