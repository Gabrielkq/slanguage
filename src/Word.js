
import React from 'react';
import SearchBar from './SearchBar';

function Word(props){
    //this obviously is being taken out, just building around skeleton adding meat later
    function like(d){
        alert('you liked the definition of "' + d.example + '" by ' + d.user.name)
    }

    return(       
      
        <div>
        <SearchBar allWords={props.allWords}/>

        <h1>Word Spelling: {props.word.spelling[0].toUpperCase() + props.word.spelling.slice(1)} </h1>
            
        {props.allDefinitions.filter(definition => definition.word_id === props.word.id).map(definition =>{
            return <><div key={definition.id}>
                <h3>Meaning: {definition.meaning}</h3>
                <h4>Example: {definition.example}</h4>
        <p>definition by user: {definition.user.name}</p>
                
            
            <button onClick={(e) => like(definition)}>placeholder like button</button></div> <hr /></>
           
        })}
    
        </div>
    )

}

export default Word
