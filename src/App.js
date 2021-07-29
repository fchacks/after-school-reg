import React from "react";
import Signup from './components/authentication/Signup.js';
import {Container} from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Profile from "./components/authentication/Profile"
import Login from "./components/authentication/Login"
import PrivateRoute from './components/authentication/PrivateRoute'
import ForgotPassword from './components/authentication/ForgotPassword'
import UpdateProfile from './components/authentication/UpdateProfile'
import Dashboard from './components/drive/Dashboard'
// import {Provider} from 'react-redux'
// import {createStore, applyMiddleware } from 'redux'
// import rootReducer from "./redux/reducers"
// import thunk from 'redux-thunk'
// const store = createStore(rootReducer, applyMiddleware(thunk))
//import MainScreen from ''


function App() {
  return (
      <Router>
            <AuthProvider>

              <Switch>

                {/* Other */}
                <PrivateRoute exact path = '/' component = {Dashboard}/>
                

                

                {/* Profile */}
                <PrivateRoute path = "/user" component = {Profile}/>
                <PrivateRoute path = "/update-profile" component = {UpdateProfile}/>


                {/* Auth */}
                <Route path = "/signup" component = {Signup}/>
                <Route path = "/login" component =   {Login}/>
                <Route path = "/forgot-password" component =   {ForgotPassword}/>
              </Switch>

            </AuthProvider>
          </Router>
  )
}
export default App;

  // return (
  //   <Router>

  //     <div className="App">
  //     <header className="App-header">
  //       <Nav />
  //       <Switch>
  //         <Route path = "/" exact component = {Home} />
  //         <Route path = "/tweets" exact component = {Tweet} />
  //       </Switch>
  //     </header>
  //   </div>

  //   </Router>
    
  // );