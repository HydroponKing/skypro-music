import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import Playlist from './components/Playlist';
import Player from './components/Player';
import Filters from './components/Filters';

export default function HomePage() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navbar />
          <div className="main__centerblock centerblock">
            <SearchBar />
            <Filters></Filters>
            <Playlist />
          </div>
          <Sidebar />
        </main>
      </div>
    </div>
  );
}
