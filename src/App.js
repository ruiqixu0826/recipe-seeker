import Search from './components/search.js';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Recipe Seeker</h1>
        <p>Discover a world of culinary delights!</p>
      </header>
      <main>
        <Search />
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Recipe Seeker. Made with ❤️ by Dev Sharma & Ruiqi Xu.</p>
      </footer>
    </div>
  );
}

export default App;
