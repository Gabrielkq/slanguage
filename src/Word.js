
import React from 'react';
import SearchBar from './SearchBar';

class Word extends React.Component{



render(){

    const likeIt = d =>{
        alert("liked " + d.meaning + " by " + d.user.name)
    }

    const wordDefinitions = this.props.allDefinitions.filter(definition => definition.word_id === this.props.word.id)
  
    const userPresent = wordDefinitions.filter(definition => definition.user_id === this.props.user_id)


    if (this.props.loggedIn && userPresent.length === 1 ){
    return(       
      
        <div>
         <SearchBar allWords={this.props.allWords}
                    user_id={this.props.user_id}
                    loggedIn={this.props.loggedIn}
        />
            <p>click here to edit or delete your definition user# {this.props.user_id}</p>
        <h1>Word Spelling: {this.props.word.spelling[0].toUpperCase() + this.props.word.spelling.slice(1)} </h1>
            
        {this.props.allDefinitions.filter(definition => definition.word_id === this.props.word.id).map(definition =>{
            return <><div key={definition.id}>
                <h3>Meaning: {definition.meaning}</h3>
                <h4>Example: {definition.example}</h4>
        <p>definition by user: {definition.user.name}</p>
                
            
            <button onClick={(e) => likeIt(definition)}>placeholder like button</button></div> <hr /></>
           
        })}
    
        </div>
    )} else     if (this.props.loggedIn && userPresent.length === 0 ){
        return(       
          
            <div>
             <SearchBar allWords={this.props.allWords}
                        user_id={this.props.user_id}
                        loggedIn={this.props.loggedIn}
            />
                <p>click here to add definition user# {this.props.user_id}</p>
            <h1>Word Spelling: {this.props.word.spelling[0].toUpperCase() + this.props.word.spelling.slice(1)} </h1>
                
            {this.props.allDefinitions.filter(definition => definition.word_id === this.props.word.id).map(definition =>{
                return <><div key={definition.id}>
                    <h3>Meaning: {definition.meaning}</h3>
                    <h4>Example: {definition.example}</h4>
            <p>definition by user: {definition.user.name}</p>
                    
                
                <button onClick={(e) => likeIt(definition)}>placeholder like button</button></div> <hr /></>
               
            })}
        
            </div>
        )}


    else return (
        <div><p>not logged in</p></div>
    )

}}

export default Word
