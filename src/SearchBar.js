import React from 'react';
import { Redirect } from "react-router-dom";

class SearchBar extends React.Component{

    state = {
        searchTerm: "",
        errors: [],
        redirect: null,
        wordBox: false,
    }

    onChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    resetWordBox = () =>{
        this.setState({
            wordBox: false
        })
    }

    searchSubmitted = e =>{
        e.preventDefault()
        const searchWord = this.props.allWords.filter(word => word.spelling.toUpperCase() === this.state.searchTerm.toUpperCase())
       if (this.state.searchTerm.length === 0){
           this.setState({
               errors: [`Your word must be at least one character long.`]
           })
       }
       else if (searchWord.length === 0 && !this.props.loggedIn){
            this.setState({
                errors: [`${this.state.searchTerm} is not a word in the dictorary`]
            })
        }else if (searchWord.length === 0 && this.props.loggedIn){
            this.setState({
            errors: [`${this.state.searchTerm} is not a word in the dictorary, you're logged in, would you like to create the first definition?`],
            wordBox: true
            })}
        else {
            this.setState({
               redirect: searchWord[0].spelling
            })
    }}

    render() {
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        if (this.state.wordBox){
            return(<> <p>Click button to add the word which will allow you to create a definition</p>
            <button onClick={() => this.props.addWord(this.state.searchTerm)}>add {this.state.searchTerm} to dictionary</button>
           </> )
        }
        
            else return(<>
            <ul>{
                this.state.errors.map(error => <li>{error}</li>)
            }</ul>
    
        <section>
            
                <form  onSubmit={(e) => this.searchSubmitted(e)} >
                    <label htmlFor="search_a_word">Search a Word</label>
                    <input id="search_a_word"
                            type="text"
                            onChange={ this.onChange }
                            name="searchTerm"
                            value={ this.state.searchTerm }
                           />
                    <input type="submit"/>
                </form>
                <br></br>
        
                
            </section>
    
            </>

        )}

}

export default SearchBar