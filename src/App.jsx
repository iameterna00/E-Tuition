import './App.css';
import HomePageForm from './widgets/homepageForm';
import ThemeProvider from './utilities/themeprovider';
import Navbar from './navbar';
import OnlineClasses from './Pages/onlineclass'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Pages/homepage';

function App() {
  return (
    <Router>
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onlineclasses" element={<OnlineClasses />} />
      </Routes>
    </ThemeProvider>
  </Router>
  );
}

export default App;
