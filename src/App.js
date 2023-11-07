import Search from './components/search.js';
import Homepage from './components/homepage/homepage.js'
import RecipeDetail from './components/recipeDetail.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
    <div className="app-container">
      <header className="app-header">
        <h1>Recipe Seeker</h1>
        <nav>
          <ul>
            <li key="home"><a href="/">Home</a></li>
          </ul>
        </nav>
      </header>
      <main className='main-container'>
        <Routes>
          <Route path="/" key="home" element={<Homepage />} />
          <Route path="/search" key="search" element={<Search />} />
          <Route path="/recipe/:id" key="detail" element={<RecipeDetail/>} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Recipe Seeker. Made with ❤️ by Dev Sharma & Ruiqi Xu.</p>
      </footer>
    </div>
    </Router>
  );
}

export default App;
