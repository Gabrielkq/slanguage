import React from 'react';
import { useState } from 'react'

const Login = (props) => {

    // if user logged in redirect to main 
    props.user_id && props.history.push("/")

    // fuctional component now, useState hook instead of state
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    const logInSubmitted = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password
            })
        })
        .then(r => r.json())
        .then(data => {
            if (data.errors) {
                setErrors(data.errors)
            } else { 
                props.setToken(data);
            }
        })
    }

    return( 
    <>
        <ul>
            {
                errors.map(error => <li> { error } </li>)
            }
        </ul>

        <section>
            <h2>Login</h2>
            <form  onSubmit={logInSubmitted} >
                <label htmlFor="log_in_username">Username</label>
                <input id="log_in_username"
                        type="text"
                        onChange={e => setName(e.target.value)}
                        name="name"
                        value={ name }
                       />
                <br></br>
            <label  htmlFor="log_in_password">Password</label>    
                <input  id="log_in_password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        value={ password }
                        />
                        <br></br>
                <input type="submit"/>
            </form>
            <br></br>    
        </section>
    </>
    )
    
};

export default Login
