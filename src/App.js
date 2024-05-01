import './App.css';
import './components/style.css';
import './components/responsive.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import WeatherApp from './components/WeatherApp';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/weather-app' exact element={<WeatherApp />} />
          <Route path='*' element={<Error/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
