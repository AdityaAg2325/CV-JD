import './App.css';
import AtsHome from './pages/AtsHome';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
      <Route path="/ats-home" element={<AtsHome />}/>
      </Routes>
    </div>
  );
}

export default App;
