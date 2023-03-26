import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from './pages/PageNotFound';
import { Dashboard } from './pages/Dashboard';

function App() {
   
  return (
       <>
        <BrowserRouter>
          <Routes>
            <Route path='/' index element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
       </>
  );
}

export default App;

