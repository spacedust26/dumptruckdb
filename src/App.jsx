import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Query from './components/Query';
import Footer from './components/Footer';

function App() {

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/query" element={<Query />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
