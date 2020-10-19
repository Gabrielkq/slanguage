import React, { Component } from 'react';
import Letter from './Letter';
import './App.css';
import Word from './Word';
import Signup from "./Signup";
import Login from "./Login";
import SearchBar from './SearchBar';
import { Route, Switch, NavLink } from 'react-router-dom';

class App extends Component {



  state = {
   //token: null,
    user_id: null,
   // loggedIn: true,
    allWords: [],
    errors: [],
    allDefinitions: [],
    wordFromSearch: "",
    wordBox: false,
    wordList: true,
    definitionList: true,
    newMeaning: "",
    newExample: "",
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  }

  componentDidMount() {
    const token = localStorage.token
    if (token){
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(r => r.json())
      .then(res => { 
        if (res.errors){
          console.log(res.errors)
        } else {
          this.setState({
            user_id: res.id
          })
        }
    })}
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


  }



  setToken = data => {
    localStorage.token = data.token
  // localStorage.user_id = data.user_id
    fetch(`http://localhost:3000/users/${data.user_id}`)
      .then(r => r.json())
      .then()
    this.setState({
    //  token: data.token,
      user_id: data.user_id
    //  loggedIn: true
    })
  }

  logout = () => {
    this.setState({
      user_id: null
    }, () => {
      localStorage.removeItem("token")
    })
  }

  addSearchErrorsToState = (errors) => {
    this.setState({
      errors
    })
  }

  addToState = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    })
  }


  addWord = (spelling) => {
    this.clearErrors()
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
      }, () => {
        this.props.history.push(`${this.state.allWords.slice(-1)[0].spelling}`)
      })
      )
    this.hideAddWordBox()
  }

  addUsersDef = (e, word_id) => {
    e.preventDefault()
    this.clearErrors()
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
    this.clearErrors()
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

  showWordList = () => {
    this.setState({
      wordList: true,
      errors: []
    })
  }

  hideWordList = () => {
    this.setState({
      wordList: false
    })
  }

  showDefList = () => {
    this.setState({
      definitionList: true,
      errors: []
    })
  }

  hideDefList = () => {
    this.setState({
      definitionList: false
    })
  }

  clearErrors = () => {
    this.setState({
      errors: []
    })
  }

  displayAddWordBox = (target) => {
    this.hideWordList()
    this.hideDefList()
    this.clearErrors()
    let wordFromSearch = target
    this.setState({
      wordBox: true,
      wordFromSearch
    })
  }

  hideAddWordBox = () => {
    this.showWordList()
    this.showDefList()
    this.setState({
      wordBox: false,
      errors: []
    })
  }

  redirectFromSearch = (redirect) => {
    this.props.history.push(`/${redirect}`)
  }

  render() {

    return (

      <div className="App">

        <div>
          {!!this.state.user_id ?
            <button onClick={() => this.logout()}>
              logout</button>

            :
            <></>}
          {!this.state.user_id ?
            <NavLink to={"/Login"} > Login </NavLink>
            :
            <>  </>}
          {!this.state.user_id ?
            <NavLink to={"/Signup"} > signup </NavLink>
            : <></>}

        </div>

        <div>

          <ul>
            {this.state.letters.map(letter =>
              <NavLink onClick={this.hideAddWordBox}
                to={`/${letter}`} key={letter} >
                {letter} </NavLink>)}
          </ul>
           
          <SearchBar
            key={"searchBar235711"}
            allWords={this.state.allWords}
            user_id={this.state.user_id}
            //loggedIn={this.state.loggedIn}
            addWord={this.addWord}
            displayAddWordBox={this.displayAddWordBox}
            wordBox={this.state.wordBox}
            wordFromSearch={this.state.wordFromSearch}
            redirectFromSearch={this.redirectFromSearch}
            addSearchErrorsToState={this.addSearchErrorsToState}
            errors={this.state.errors}
            hideAddWordBox={this.hideAddWordBox} />

       
        </div>



        <Switch>

          <Route path={"/signup"}>
            <Signup //loggedIn={this.state.loggedIn}
             user_id={this.state.user_id}
              setToken={this.setToken} />
          </Route>
          <Route path={"/login"}>
            <Login //loggedIn={this.state.loggedIn}
              user_id={this.state.user_id}
              setToken={this.setToken} 
              history={this.props.history}/>
          </Route>

          {this.state.letters.map(letter => {
            return <Route path={"/" + letter} key={letter}>
              <Letter letter={letter}
                allWords={this.state.allWords}
                wordList={this.state.wordList}
                key={letter}
                clearErrors={this.clearErrors}
              />
            </Route>
          }
          )}

          {this.state.allWords.map(word => {
            return <Route path={`/${word.spelling}`} key={word.spelling[0].toUppercase + word.spelling.slice(1)}
              render={() => {
                return (<Word
                  key={word.spelling[0].toUppercase + word.spelling.slice(1)}
                  word={word}
                  allWords={this.state.allWords}
                  allDefinitions={this.state.allDefinitions}
                 // token={this.state.token}
                  user_id={this.state.user_id}
                 // loggedIn={this.state.loggedIn}
                  removeUsersDef={this.removeUsersDef}
                  addUsersDef={this.addUsersDef}
                  newExample={this.state.newExample}
                  newMeaning={this.state.newMeaning}
                  addToState={this.addToState}
                  definitionList={this.state.definitionList}


                />)
              }
              }
            />
          }
          )}
        </Switch>

      </div>

    );
  }



}

export default App
