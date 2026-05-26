import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import Footer from './components/Footer'
import Register from './pages/Register'
import About from './pages/About'
import ScrollToTop from './components/ScrollToTop';



function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/home" element={<Home />} />
          <Route path = "/contact" element={<Home />} />
          <Route path = "/about" element ={<About />} />
          <Route path = "/schedule" element = {<Home />} />
          <Route path = "/register" element = {<Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
