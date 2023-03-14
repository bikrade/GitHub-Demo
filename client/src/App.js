// import react-tostify css
// import react-toastify
import { BrowserRouter as Router, Switch, Route, Routes, BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-center" />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
        </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
