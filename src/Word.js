
import React from 'react';

function Word(props){
    //this obviously is being taken out, just building around skeleton adding meat later
    function like(d){
        alert('you liked the definition of "' + d + '"')
    }

    return(       
      
        <div>
              
        <h1>Spelling: {props.word.spelling} </h1>
            
        {props.allDefinitions.filter(definition => definition.word_id === props.word.id).map(definition =>{
            return <><div>
                <h3>Meaning: {definition.meaning}</h3>
                <p>Example: {definition.example}
            <button onClick={(e) => like(definition.example)}>like</button>
            </p></div> <hr /></>
           
        })}
    
        </div>
    )

}

export default Word
