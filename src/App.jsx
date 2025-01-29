import './App.css';
import ThemeProvider from './utilities/themeprovider';
import Navbar from './navbar';
import OnlineClasses from './Pages/onlineclass'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Pages/homepage';
import BecomeTuitor from './Pages/betuitor';
import ApplyForTuitor from './Pages/applyfortuitot';
import CourseDetails from './Pages/coursedetail';
import UserList from './Pages/dashboard';
import ProfilePage from './Pages/profile';
import ScrollToTop from './services/scrolltotop';

import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './services/Redux/store'; // Import your configured Redux store

function App() {
  return (
    <Provider store={store}> {/* Wrap your app in Provider */}
      <Router>
        <ThemeProvider>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/onlineclasses" element={<OnlineClasses />} />
            <Route path="/coursesdetails/:id" element={<CourseDetails />} />
            <Route path="/iamatuitor" element={<BecomeTuitor />} />
            <Route path="/tuitorform" element={<ApplyForTuitor />} />
            <Route path="/dashboard" element={<UserList />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
