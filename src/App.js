import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from './Screens/LoginScreen';
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom';
import SplashScreen from './Screens/SplashScreen';
import DashBoard from './Screens/DashBoard';
import RegisterScreen from './Screens/RegisterScreen';
import SellItemScreen from './Screens/SellItemScree';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
              {/*<Route exact path='/' element={<SplashScreen/>}/>*/} // add this to take time to connect remote server
              <Route path='/' element={<LoginScreen/>}/> // change path to /login
              <Route exact path='/dashboard' element={<DashBoard/>}/>
              <Route path='/register' element={<RegisterScreen/>}/>
              <Route path='/sellItem' element={<SellItemScreen/>}/>
        </Routes>
      </Router>     
    </div>
  );
} 

export default App;