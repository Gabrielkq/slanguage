import React from 'react';
class SearchBar extends React.Component{

    state = {
        searchTerm: "" 
    }

    onFocus = () => {
        this.setState({
            searchTerm: "",
            errors: []
        })
    }

    onChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    

    searchSubmitted = e =>{
        e.preventDefault()
        const target = e.target.searchTerm.value
        const searchWord = this.props.allWords.filter(word => word.spelling.toUpperCase() === this.state.searchTerm.toUpperCase())
         
               if (this.state.searchTerm.length === 0){
            this.props.addSearchErrorsToState([`Your search term must be at least one character long.`])
        }
        else if (searchWord.length === 0 && !this.props.loggedIn){
            this.props.addSearchErrorsToState([`${this.state.searchTerm} is not a word in the dictorary`])
            
         }else if (searchWord.length === 0 && this.props.loggedIn){
           this.props.displayAddWordBox(target)
         }
         else {
             this.props.redirectFromSearch(searchWord[0].spelling)
     
         }
     
  }

    render() {
            return(<>
       
    
        <section>
            
                <form  onSubmit={(e) => this.searchSubmitted(e)} >
                    <label htmlFor="search_a_word">Search a Word</label>
                    <input id="search_a_word"
                            type="text"
                            onChange={ this.onChange }
                            name="searchTerm"
                            onFocus={ this.onFocus } 
                            value={ this.state.searchTerm }
                           />
                    <input type="submit"/>
                </form>

                <br></br>
                
                <ul>{
                this.props.errors.map(error => <li>{error}</li>)
            }</ul>
            </section>

            {this.props.wordBox ? 
            <> <p>Click button to add {this.props.wordFromSearch} to the dictionary which will allow you to create the first definition</p>
            <button onClick={() => this.props.addWord(this.props.wordFromSearch)}>add {this.props.wordFromSearch} to dictionary</button>
           </>
           :
           <></>}
    
            </>

        )}

}

export default SearchBar