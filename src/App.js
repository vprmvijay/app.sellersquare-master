import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Servicemanager from './pages/Service manager';
import Deletepage from './pages/Deletepage';
import PropsManager from './pages/Props Manager'
import ViewPagrprop from './pages/ViewPagrprop';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/service_manager' element={<Servicemanager/>}/>
          <Route path='/service_manager/delete' element={<Deletepage/>}/>
          <Route path='/props_manager' element ={<PropsManager/>}/>
          <Route path='/props_manager/view' element={<ViewPagrprop/>}/>
        </Routes>
     
    </div>
  );
}

export default App;
