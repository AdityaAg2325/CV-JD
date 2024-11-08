import './App.css';
import AtsHome from './pages/AtsHome';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import CustomTable from './pages/ApplicantList';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
      <Route path="/ats-home" element={<AtsHome />}/>
      <Route path="/ats-listing" element={<CustomTable/>}/>
      </Routes>
    </div>
  );
}

export default App;
