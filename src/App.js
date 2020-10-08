import React, { Component } from 'react';
import Letter from './Letter';
import './App.css';
import Word from './Word';
import Signup from "./Signup";
import Login from "./Login"
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

class App extends Component {

 

    state = {
      token: null,
      user_id: null,
      loggedIn: false,
      allWords: [],
      allDefinitions: [],
      newMeaning: "",
      newExample: "",
      letters: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
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

    addToState = (event) => {
     
      this.setState({
        [event.target.name]: event.target.value
      })
    }
 
    addUsersDef = (e, word_id) =>{
      e.preventDefault()
      console.log(this.state.newExample +" " + this.state.newMeaning + " " + word_id)
      fetch('http://localhost:3000/definitions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          meaning: this.state.newMeaning,
          example: this.state.newExample,
          user_id: this.state.user_id,
          word_id: word_id
        })
      })
      .then(r => r.json())
      .then(obj => {
        const newDefArr = [...this.state.allDefinitions, obj]; 
        console.log(newDefArr)
        this.setState({
          allDefinitions: newDefArr
        })
        
      })
    }

    removeUsersDef = (delDef) =>{
      fetch(`http://localhost:3000/definitions/${delDef.id}`, {
    method: "DELETE"})
       .then(r => r.json()) 
      .then(console.log(delDef), () => { 
        const removeDefArr = this.state.allDefinitions.filter(definition => definition.id !== delDef.id)
      this.setState({
        allDefinitions: removeDefArr
      })})
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
         token={ this.state.token }
         user_id={ this.state.user_id }
         loggedIn={ this.state.loggedIn }
         removeUsersDef={this.removeUsersDef}
         addUsersDef={this.addUsersDef}/>
      </Route> }
      )}  
{this.state.allWords.map(word => {
      return <Route path={"/" + word.spelling} key={word.spelling[0].toUppercase + word.spelling.slice(1)}>
         <Word 
         key={word.id}
         word={word}
         allWords={this.state.allWords}
         allDefinitions={this.state.allDefinitions}
         key={word.spelling}
         token={ this.state.token }
         user_id={ this.state.user_id }
         loggedIn={ this.state.loggedIn }
         removeUsersDef={this.removeUsersDef}
         addUsersDef={this.addUsersDef}
         newExample={this.state.newExample}
         newMeaning={this.state.newMeaning}
         addToState={this.addToState}
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
