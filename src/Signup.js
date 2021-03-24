import React from 'react';
import { useState } from "react";

const Signup = (props) => {
    
     // if user logged in redirect to main 
     props.user_id && props.history.push("/")
     
    // fuctional component now, useState hook instead of state
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])

    const signUpSubmitted = (event) => {
        event.preventDefault()
        if (password !== passwordConfirmation){
            setErrors([`Your password and password confirmation do not match, please try again`])
        } else {
           fetch("http://localhost:3000/users", {
               method: "POST",
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify({name, password})
           })
           .then(r => r.json())
           .then(data => {
               if (data.errors) {
                   setErrors(data.errors)
               } else {
               props.setToken(data);
                   setErrors([])
               }
           })
        }
    }
    
    return( 
    <>
        <ul>
            {
                errors.map(error => <li> { error } </li>)
            }
        </ul>

        <section>
            <h2>Sign up</h2>
            <form  onSubmit={signUpSubmitted} >
                <label htmlFor="sign_ip_username">Username</label>
                <input id="sign_up_username"
                        type="text"
                        onChange={e => setName(e.target.value)}
                        name="name"
                        value={ name }
                       />
                <br></br>
            <label  htmlFor="sign_up_password">Password</label>    
                <input  id="sign_up_password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        value={ password }
                        />
                        <br></br>
            <label  htmlFor="password_confirmation">Password Confirmation</label>    
                <input  id="password_confirmation"
                        type="password"
                        onChange={e => setPasswordConfirmation(e.target.value) }
                        name="password_confirmation"
                        value={ passwordConfirmation }
                        />
                        <br></br>
                <input type="submit"/>
            </form>
            <br></br>
        </section>
    </>
    )

};

export default Signup


