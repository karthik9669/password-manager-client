import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Pages/SignUp/Signup';
import Passwords from './Pages/Passwords/Passwords';
import Logout from './Pages/Logout/Logout';
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setName, setEmail, setPasswords } from "./redux/actions";
import { checkAuthenticated } from "./axios/instance";

function App()
{

  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() =>
  {
    if(isAuthenticated) return;
    console.log("verify user in app");
    const token = localStorage.getItem('jwtToken')
    updateUser(token);
  }, [isAuthenticated]);

  const updateUser = async(token) => {
    try{
      const res = await checkAuthenticated(token);
      dispatch(setAuth(true));
      dispatch(setName(res.data.name));
      dispatch(setEmail(res.data.email));
      dispatch(setPasswords(res.data.passwords));
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="App">

      <Router>

        <Navbar />

        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route exact path="/signin"> <Login /> </Route>
          <Route exact path="/signup"> <Signup /> </Route>
          <Route exact path="/passwords"> <Passwords /> </Route>
          <Route exact path="/logout"> <Logout /> </Route>
          <Redirect to="passwords"/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
