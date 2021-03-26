import React from 'react';
import { NavLink} from 'react-router-dom';
import {
        useRouteMatch
      } from "react-router-dom";

      

const Letter = (props) => {
        const { path, url } = useRouteMatch();
                
        let sortedWords = props.allWords
                                        .filter(word => word.spelling[0].toUpperCase() === props.letter.toUpperCase())
                                        .map(word => word.spelling)
                                        .sort()
      // below is my orignal code, which i'm proud of for it's readability  
       // let wordsStartingLetter = props.allWords.filter(word => word.spelling[0] === props.letter)
       // let sortedWords = wordsStartingLetter.map(word => word.spelling).sort()
        return(

                <div>
              
                
                { props.wordList ?
                 <>
                 <p>Words starting with the letter {props.letter.toUpperCase()}</p>
                <ul>
                <p>{sortedWords.map(word => {

                 return <li key={word}>  
                                <NavLink to={`/${word}`} onClick={props.clearErrors} > 
                                {word[0].toUpperCase() + word.slice(1)}
                                </NavLink> </li>
                 
                   })}
                </p>

                </ul>
                </>
                : 
                <div><p>loading....</p></div>
                   }             
        </div>
        )
}
    





export default Letter
