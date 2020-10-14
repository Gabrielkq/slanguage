
import React from 'react';


class Word extends React.Component{

    
render(){
    const wordDefinitions = this.props.allDefinitions.filter(definition => definition.word_id === this.props.word.id)
    const usersDef = wordDefinitions.filter(definition => definition.user_id === this.props.user_id)
    const likeIt = d =>{
        alert("liked " + d.meaning + " by " + d.user.name)
    }

    if (this.props.loggedIn && usersDef.length === 1 ){
    return(       
      
        <div>
     
          
        <h1>Word Spelling: {this.props.word.spelling[0].toUpperCase() + this.props.word.spelling.slice(1)} </h1>
            
        {wordDefinitions.map(definition => definition.user_id === this.props.user_id
        ?
           <>  <div key={definition.user_id}>
                <h3>Meaning: {definition.meaning}</h3>
                <h4>Example: {definition.example}</h4>
        <p>your definition user: {definition.user.name}</p>
                
            <button onClick={() => this.props.removeUsersDef(definition)}>delete my definition</button>
            </div> <hr />
           </>
        :  

            <>
           <div key={definition.user_id}>
                     <h3>Meaning: {definition.meaning}</h3>
        <h4>Example: {definition.example}</h4>
        <p>definition by user: {definition.user.name}</p>
        
    
    <button onClick={(e) => likeIt(definition)}>like</button></div> <hr />
   
            </>
        )}
    
        </div>
    )} else     if (this.props.loggedIn && usersDef.length === 0 ){
        return(       
          
            <div>
            
                <p>fill out here to add definition </p>
                <section>
            <h2>add Definition</h2>
           <form  onSubmit={(e) => this.props.addUsersDef(e, this.props.word.id)} >
                <label htmlFor="meaning">meaning</label>
                <input id="meaning"
                        type="text"
                        onChange={(e) => this.props.addToState(e)}
                        name="newMeaning"
                        value={ this.props.newMeaning }
                       />
                <br></br>
            <label  htmlFor="example">example</label>    
                <input  id="example"
                        type="text"
                        onChange={(e) => this.props.addToState(e)}
                        name="newExample"
                        value={ this.props.newExample }
                        />
                        <br></br>
                <input type="submit"/>
            </form>
            <br></br>
    
            
        </section>
            <h1>Word Spelling: {this.props.word.spelling[0].toUpperCase() + this.props.word.spelling.slice(1)} </h1>
                
            {wordDefinitions.map(definition =>{
                return <><div key={definition.user_id}>
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
