import './App.css';
import AtsHome from './pages/AtsHome';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/ats-home" element={<AtsHome />}/>
      </Routes>
    </div>
  );
}

export default App;
