import React from 'react';
import { Redirect } from "react-router-dom";

class SearchBar extends React.Component{

    state = {
        searchTerm: "",
        errors: [],
        redirect: null
    }

    onChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    searchSubmitted = e =>{
        e.preventDefault()
        const searchWord = this.props.allWords.filter(word => word.spelling === this.state.searchTerm)
        if (searchWord.length === 0){
            this.setState({
                errors: ["That word is not in the dictorary"]
            })
        }else {
            this.setState({
               redirect: searchWord[0].spelling
            })
    }}
    render() {
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        return(<>
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

        </>)
    }

}

export default SearchBar