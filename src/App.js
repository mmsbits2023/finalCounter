import React from "react";
import { Routes, Route} from 'react-router-dom';
//import Layout from "./Component/Layout";
import "./App.css";
import Header from "./Component/Header";
//import  Footer from "./Component/Footer";
import UserLogin from "./Pages/UserLogin";
import UserRegister from "./Pages/UserRegister";
import UserLogout from "./Pages/UserLogout";
import HomePage from './Pages/HomePage';
import AmountDate from "./Pages/AmountDate";
import DownloadFile from "./Pages/DownloadFile";
//import SearchData from "./Pages/SearchPageData";
import AllData from "./Pages/AllData";




function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/register' element={<UserRegister/>} />
        <Route path='/logout' element={<UserLogout/>} />
        <Route path='/amountDate' element={<AmountDate/>}/>
        <Route path="/downloadfile" element={<DownloadFile/>}/>
        <Route path="/allData" element={<AllData/>}/>
      </Routes> 
      </div>
   
    
  );
}

export default App;
