import React from 'react';

const Word = (
    {allDefinitions, word, user_id, definitionList, removeUsersDef, addUsersDef, addToState, newMeaning, newExample} 
    ) =>{

    

    const wordDefinitions = allDefinitions.filter(definition => definition.word_id === word.id)
    const usersDef = wordDefinitions.filter(definition => definition.user_id === user_id)
    const likeIt = d => alert("liked " + d.meaning + " by " + d.user.name)
    

    if (user_id && usersDef.length === 1 && definitionList){
    return(       
      
        <div>
     
          
        <h1>Word Spelling: {word.spelling[0].toUpperCase() + word.spelling.slice(1)} </h1>
            
        {wordDefinitions.map(definition => definition.user_id === user_id
        ?
             <div key={definition.user_id}>
                <h3>Meaning: {definition.meaning}</h3>
                <h4>Example: {definition.example}</h4>
                 <p>your definition user: {definition.user.name}</p>
                
            <button onClick={() => removeUsersDef(definition)}>delete my definition</button>
            </div> 
           
        :  

            
           <div key={definition.user_id}>
                     <h3>Meaning: {definition.meaning}</h3>
        <h4>Example: {definition.example}</h4>
        <p>definition by user: {definition.user.name}</p>
        
    
    <button onClick={() => likeIt(definition)}>like</button></div> 
   
            
        )}
    
        </div>
    )} else     if (user_id   && usersDef.length === 0 && definitionList){
        return(       
          
            <div>
            
                <p>fill out here to add definition </p>
                <section>
            <h2>add Definition</h2>
           <form  onSubmit={(e) => addUsersDef(e, word.id)} >
                <label htmlFor="meaning">meaning</label>
                <input id="meaning"
                        type="text"
                        onChange={addToState}
                        name="newMeaning"
                        value={ newMeaning }
                       />
                <br></br>
            <label  htmlFor="example">example</label>    
                <input  id="example"
                        type="text"
                        onChange={addToState}
                        name="newExample"
                        value={ newExample }
                        />
                        <br></br>
                <input type="submit"/>
            </form>
            <br></br>
    
            
        </section>
            <h1>Word Spelling: {word.spelling[0].toUpperCase() + word.spelling.slice(1)} </h1>
                
            {wordDefinitions.map(definition =>{
                return <><div key={definition.user_id}>
                    <h3>Meaning: {definition.meaning}</h3>
                    <h4>Example: {definition.example}</h4>
            <p>definition by user: {definition.user.name}</p>
                    
                
                <button onClick={(e) => likeIt(definition)}>placeholder like button</button></div> <hr /></>
               
            })}
        
            </div>
        )}


    else if (definitionList){
        return (
         
        <div>   
            <p>Login or Signup to Create words and definitions</p>
            
             <h1>Word Spelling: {word.spelling[0].toUpperCase() + word.spelling.slice(1)} </h1>
                
        {wordDefinitions.map(definition =>{
            return <><div key={definition.user_id}>
                <h3>Meaning: {definition.meaning}</h3>
                <h4>Example: {definition.example}</h4>
        <p>definition by user: {definition.user.name}</p>
                
            
            <button onClick={(e) => likeIt(definition)}>placeholder like button</button></div> <hr /></>
           
        })}</div>
    )}
    else return(
        <div></div>

    )

}

export default Word
