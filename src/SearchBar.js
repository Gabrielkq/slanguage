import React from 'react';
import { Redirect } from "react-router-dom";

class SearchBar extends React.Component{

    state = {
        searchTerm: "",
        errors: [],
        redirect: null,
        definitionBox: false,
        wordBox: false,
        addMeaning: "",
        addExample: "",
        newWordId: null,
    }

    onChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addDeff = () =>{
        fetch("http://localhost:3000/definitions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                meaning: this.state.addMeaning,
                example: this.state.addExample,
                word_id: this.state.newWordId,
                user_id: this.props.user_id
            }).then(r => r.json())
            .then(data => console.log(data))
    })};

    addWord = () =>{
        fetch("http://localhost:3000/words", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                spelling: this.state.searchTerm
            })
            }
        ).then(r => r.json())
        .then(data => this.setState({
            newWordId: data.id,
            definitionBox: true
        }))
  
        alert("spelling = " + this.state.searchTerm +"user " + this.props.user_id)
    }

    searchSubmitted = e =>{
        e.preventDefault()
        const searchWord = this.props.allWords.filter(word => word.spelling.toUpperCase() === this.state.searchTerm.toUpperCase())
        if (searchWord.length === 0 && !this.props.loggedIn){
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
            <button onClick={() => this.addWord()}>add {this.state.searchTerm} to dictionary</button>
           </> )
        }
        if (this.state.definitionBox){
        return(<>
        <ul>{
            this.state.errors.map(error => <li>{error}</li>)
        }</ul>

    <p>Fill out to create the word {this.state.searchTerm} in the slanguage dictionary and create it's first definition</p>
    <form onSubmit={e => this.addDeff(e)}>
        <label>Your slanguage definition for {this.state.searchTerm}'s meaning</label>
        <input id="add_meaning"
                type="text"
                onChange={this.onChange}
                name="addMeaning"
                value={this.state.addMeaning}/>
        <label>Use {this.state.searchTerm} in an example sentence</label>
        <input id="add_example"
                type="text"
                onChange={this.onChange}
                name="addExample"
                value={this.state.addExample}/>
        
        <input type="submit"/>
    </form>

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

        </>)
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