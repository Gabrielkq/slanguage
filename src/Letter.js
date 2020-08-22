import React from 'react';
import { NavLink} from 'react-router-dom';

function Letter (props){

        
        let sortedWords = props.allWords
                                        .filter(word => word.spelling[0] === props.letter)
                                        .map(word => word.spelling)
                                        .sort()
      // below is my orignal code, which i'm proud of for it's readability  
       // let wordsStartingLetter = props.allWords.filter(word => word.spelling[0] === props.letter)
       // let sortedWords = wordsStartingLetter.map(word => word.spelling).sort()
        return(
                <div>
                <ul>
                <p>{props.letter}</p>

                </ul>
                <p>{sortedWords.map(word => {

                 return <li key={word}>  <NavLink to={"/" + word}> {word} </NavLink> </li>
                })}</p>

        
        </div>
        )
    

}



export default Letter
