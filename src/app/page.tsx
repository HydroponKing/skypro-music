import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/SideBar/Sidebar';
import SearchBar from './components/SearchBar/SearchBar';
import Playlist from './components/Playlist/Playlist';
import PlaylistPage from './components/PlaylistPage/PlaylistPage';
import Filters from './components/Filters/Filters';

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
