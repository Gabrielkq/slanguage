import React from 'react';
import { NavLink} from 'react-router-dom';


class Letter extends React.Component{

        render(){        
        let sortedWords = this.props.allWords
                                        .filter(word => word.spelling[0].toUpperCase() === this.props.letter.toUpperCase())
                                        .map(word => word.spelling)
                                        .sort()
      // below is my orignal code, which i'm proud of for it's readability  
       // let wordsStartingLetter = props.allWords.filter(word => word.spelling[0] === props.letter)
       // let sortedWords = wordsStartingLetter.map(word => word.spelling).sort()
        return(

                <div>
              
                
                { this.props.wordList ?
                 <>
                 <p>Words starting with the letter {this.props.letter.toUpperCase()}</p>
                <ul>
                <p>{sortedWords.map(word => {

                 return <li key={word}>  
                                <NavLink to={`/${word}`} onClick={this.props.clearErrors}       > 
                                {word[0].toUpperCase() + word.slice(1)}
                                </NavLink> </li>
                 
                   })}
                </p>

                </ul>
                </>
                : 
                <div></div>
                   }             
        </div>
        )}
    

}



export default Letter
