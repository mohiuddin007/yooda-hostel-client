
import React from 'react';
import AllRoutes from "./Routes";
import Sidebar from './Components/Sidebar/Sidebar';


// react tostify import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//global css import 
import './Assets/Css/global.css';


function App() {

  return (
    <>
      <ToastContainer/>
      <div className="row">
          <div className="col-md-3">
             <Sidebar/>
          </div>
          <div className="col-md-9">
            <AllRoutes/>           
          </div>
      </div>
    </>
  );
}

export default App;
