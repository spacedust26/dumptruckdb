import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Query from './components/Query';
import Footer from './components/Footer';

function App() {

  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/query" element={<Query />} />
    </Routes>
    <Footer />
  </Router>
  )
}

export default App
