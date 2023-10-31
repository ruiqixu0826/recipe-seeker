import Search from './components/search.js';
import Homepage from './components/homepage.js'
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Recipe Seeker</h1>
      </header>
      <main>
        <Homepage />
        <Search />
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Recipe Seeker. Made with ❤️ by Dev Sharma & Ruiqi Xu.</p>
      </footer>
    </div>
  );
}

export default App;
