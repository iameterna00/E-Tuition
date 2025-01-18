import './App.css';
import ThemeProvider from './utilities/themeprovider';
import Navbar from './navbar';
import OnlineClasses from './Pages/onlineclass'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Pages/homepage';
import BecomeTuitor from './Pages/betuitor';
import ApplyForTuitor from './Pages/applyfortuitot';
import CourseDetails from './Pages/coursedetail';
import ScrollToTop from './services/scrolltotop';

function App() {
  return (
    <Router>
    <ThemeProvider>
      <Navbar />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onlineclasses" element={<OnlineClasses />} />
        <Route path="/coursesdetails/:id" element={<CourseDetails />} />
        <Route path="/iamatuitor" element={<BecomeTuitor />} />
        <Route path="/applyfortuitor" element={<ApplyForTuitor />} />
      </Routes>
    </ThemeProvider>
  </Router>
  );
}

export default App;
