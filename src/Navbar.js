import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { Link , NavLink } from 'react-router-dom';


class Navbar extends Component {


        render(){
            return (
              
    <div>
      <div className="dropdown">
  <button className="dropbtn">Browse by Letter</button>
  <div className="dropdown-content">
  <ul>
      {this.props.letters.map(letter =>
        <Link onClick={this.props.hideAddWordBox}
          to={`/${letter}`} key={letter} >
       <li> <button>{letter}</button>  </li> </Link>)}
    </ul>
  </div>
</div>

    {!!this.props.user_id &&
      <button onClick={this.props.logout}>
        logout</button>}
    {!this.props.user_id && <>
      <NavLink to={"/Login"} > Login </NavLink>

      <NavLink to={"/Signup"} > signup </NavLink>
      </>}

 
     
    <SearchBar
 
      key={"searchBar235711"}
      allWords={this.props.allWords}
      user_id={this.props.user_id}
      //loggedIn={this.state.loggedIn}
      addWord={this.props.addWord}
      displayAddWordBox={this.props.displayAddWordBox}
      wordBox={this.props.wordBox}
      wordFromSearch={this.props.wordFromSearch}
      redirectFromSearch={this.props.redirectFromSearch}
      addSearchErrorsToState={this.props.addSearchErrorsToState}
      errors={this.props.errors}
      hideAddWordBox={this.props.hideAddWordBox} />

 
  </div>
  )
        }

}



export default Navbar 