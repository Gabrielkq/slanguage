import React, { Component } from 'react';
import Letter from './Letter';
import './App.css';
import Word from './Word';
import Signup from "./Signup";
import Login from "./Login"
import SearchBar from "./SearchBar"
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

class App extends Component {

 

    state = {
      token: null,
      user_id: null,
      loggedIn: false,
      allWords: [],
      allDefinitions: [],
      letters: [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    }

    componentDidMount(){
      fetch(`http://localhost:3000/words`)
      .then(r => r.json())
      .then(data => {
        this.setState({
        allWords: data
        })
      })
      fetch(`http://localhost:3000/definitions`)
      .then(r => r.json())
      .then(data => {
        this.setState({
        allDefinitions: data
        })
      })
      this.setState({
        token: localStorage.token,
        user_id: parseInt(localStorage.user_id)
      })

    }

    setToken = data => {
      localStorage.token = data.token
     localStorage.user_id = data.user_id
      fetch(`http://localhost:3000/users/${data.user_id}`)
      .then(r => r.json())
      .then()
      this.setState({
        token: data.token,
        user_id: data.user_id,
        loggedIn: true
      })
    }

    logout = () =>{
      //console.log(this.state.token + " token just got deleted along with user" + this.state.user_id)
      this.setState({
        token: null,
      user_id: 0,
      loggedIn: false
      })
    }
 
 
    render(){


  return (
    <BrowserRouter>
    <div className="App">
       <div>
         {!!this.state.loggedIn ?
        <button onClick={() => this.logout()}>
            logout</button>
        :
         <> </>}
         {!this.state.loggedIn ?
          <NavLink to={"/Login"} > Login </NavLink>
          :
        <>  </>}
        {!this.state.loggedIn ?
          <NavLink to={"/Signup"} > signup </NavLink>
          :
        <>  </>}

      </div>

      <div>


      </div>
        
       <ul>
        {this.state.letters.map(letter => <NavLink to={"/" + letter} key={letter}> {letter} </NavLink> )}  
      </ul>
      <div>
        <SearchBar allWords={this.state.allWords}/>
      </div>

<Switch>
<Route path={"/signup"}>
  <Signup setToken={ this.setToken }/>
</Route>
<Route path={"/login"}>
  <Login setToken={ this.setToken }/>
</Route>
{this.state.letters.map(letter => {
      return <Route path={"/" + letter}  key={letter}>
         <Letter letter={letter}
         allWords={this.state.allWords}
         allDefinitions={this.state.allDefinitions}
         key={letter}
         token={ this.state.token }/>
      </Route> }
      )}  
{this.state.allWords.map(word => {
      return <Route path={"/" + word.spelling} key={word}>
         <Word word={word}
         allDefinitions={this.state.allDefinitions}
         key={word.spelling}
         token={ this.state.token }
         />
      </Route> }
      )}  
</Switch>
    
    </div>
    </BrowserRouter>
  );
}



}

export default App
