import logo from './logo.svg';
import './App.css';
import MainPage from './MainPage';
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import axios from 'axios'
function App() {
  return (
   <div>
     <Router>
       <Routes>
      <Route path = "/" element = {<MainPage/>}/>
      <Route path = "/Login" element = {<Login/>}/>
      <Route path = "/signUp" element = {<SignUp/>}/>
      </Routes>
     </Router>
   </div>
  );
}

export default App;
