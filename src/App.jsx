import './App.css';
import HomePageForm from './widgets/homepageForm';
import ThemeProvider from './utilities/themeprovider';
import Navbar from './navbar';

function App() {
  return (
    <ThemeProvider>
      <Navbar/>
      <HomePageForm />
    </ThemeProvider>
  );
}

export default App;
