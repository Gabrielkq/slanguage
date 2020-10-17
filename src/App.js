import React, { Component } from 'react';
import Letter from './Letter';
import './App.css';
import Word from './Word';
import Signup from "./Signup";
import Login from "./Login";
import SearchBar from './SearchBar';
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

class App extends Component {



  state = {
    redirect: null,
    token: null,
    user_id: null,
    loggedIn: true,
    allWords: [],
    allDefinitions: [],
    wordFromSearch: "",
    wordBox: false,
    newMeaning: "",
    newExample: "",
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  }

  componentDidMount() {
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

  logout = () => {
    this.setState({
      token: null,
      user_id: 0,
      loggedIn: false
    }, () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id")
    })
  }

  addToState = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    })
  }


  addWord = (spelling) => {
    fetch("http://localhost:3000/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        spelling: spelling
      })
    }
    )
      .then(r => r.json())
      .then(obj => this.setState({
        allWords: [...this.state.allWords, obj]
      })
      )
      .then(() => {
       this.setState({
         redirect: this.state.allWords.slice(-1)[0].spelling
       })
     });
    this.hideWordBox()
  }

  addUsersDef = (e, word_id) => {
    e.preventDefault()
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
      .then(obj => this.setState({
        allDefinitions: [...this.state.allDefinitions, obj]
      })
      )
  }

  removeUsersDef = (delDef) => {
    fetch(`http://localhost:3000/definitions/${delDef.id}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(console.log(delDef), () => {
        const removeDefArr = this.state.allDefinitions.filter(definition => definition.id !== delDef.id)
        this.setState({
          newMeaning: "",
          newExample: "",
          allDefinitions: removeDefArr
        })
      })
  }

  displayWordBox = (target) => {
    let wordFromSearch = target
    this.setState({
      wordBox: true,
      wordFromSearch
    })
  }

  hideWordBox = () => {
    this.setState({
      wordBox: false
    })
  }

 redirectFromSearch = (redirect) => {
   this.setState({
     redirect
   })
 }

  render() {

    return (
      <BrowserRouter>
        <div className="App">

          <div>
            {!!this.state.loggedIn ?
             <button onClick={() => this.logout()}>
                logout</button>
                
              :
              <></>}
            {!this.state.loggedIn ?
              <NavLink to={"/Login"} > Login </NavLink>
              :
              <>  </>}
            {!this.state.loggedIn ?
              <NavLink to={"/Signup"} > signup </NavLink>
              : <></>}

          </div>

          <div>
           
          <ul>
              {this.state.letters.map(letter => <NavLink onClick={this.hideWordBox} to={"/" + letter} key={letter}> {letter} </NavLink>)}
            </ul>

           <SearchBar 
            key={"searchBar235711"} 
            allWords={this.state.allWords}
              user_id={this.state.user_id}
              loggedIn={this.state.loggedIn}
              addWord={this.addWord}
              displayWordBox={this.displayWordBox}
              wordBox={this.state.wordBox}
              wordFromSearch={this.state.wordFromSearch} 
              redirectFromSearch={this.redirectFromSearch}/>
         
         
          </div>


          {this.state.redirect ? <Redirect to={this.state.redirect} /> : <> </>
          }


          <Switch>

            <Route path={"/signup"}>
              <Signup loggedIn={this.state.loggedIn}
                setToken={this.setToken} />
            </Route>
            <Route path={"/login"}>
              <Login loggedIn={this.state.loggedIn}
                setToken={this.setToken} />
            </Route>

            {this.state.letters.map(letter => {
              return <Route path={"/" + letter} key={letter}>
                <Letter letter={letter}
                  allWords={this.state.allWords}
                  key={letter}
                />
              </Route>
            }
            )}

            {this.state.allWords.map(word => {
              return <Route path={"/" + word.spelling} key={word.spelling[0].toUppercase + word.spelling.slice(1)}
                render={ () => {
                 return (<Word
                  key={word.spelling[0].toUppercase + word.spelling.slice(1)}
                  word={word}
                  allWords={this.state.allWords}
                  allDefinitions={this.state.allDefinitions}
                  token={this.state.token} 
                  user_id={this.state.user_id}
                  loggedIn={this.state.loggedIn}
                  removeUsersDef={this.removeUsersDef}
                  addUsersDef={this.addUsersDef}
                  newExample={this.state.newExample}
                  newMeaning={this.state.newMeaning}
                  addToState={this.addToState}
               

                />)}
                  }
              />
            }
            )}
          </Switch>

        </div>
      </BrowserRouter>
    );
  }



}

export default App
