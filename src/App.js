import logo from './logo.svg';
import Home from './component/Home';
import './App.css';
import {  Routes, Route, } from 'react-router-dom';
import Login from './component/login';
import Chat from './component/chat';
function App() {
  return (
    <>
    <Routes>


    
      <Route path='login' element={<Login/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
   
    </>
        
  );
}

export default App;
