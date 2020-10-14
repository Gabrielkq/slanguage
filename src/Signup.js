import React from 'react';
import { Redirect } from "react-router-dom";

class Signup extends React.Component{
    state = {
        username: "",
        password: "",
        password_confirmation: "",
        errors: []
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signUpSubmitted = (event) => {
        event.preventDefault()
        if (this.state.password !== this.state.password_confirmation){
            this.setState({
                errors: [`Your password and password confirmation do not match, please try again`]
            })
        } else {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.username,
                 password: this.state.password
            })
        }).then(r => r.json())
        .then(data => {
            if (data.errors) {
                this.setState({
                    errors: data.errors
                })
            }
            else if (!data.errors){
            this.props.setToken(data);
            this.setState({
                errors: []
            })}
        })
        }
    }

    render(){
        if (this.props.loggedIn) {
            return <Redirect to="/" />
          }
        return( <>
        <ul>
            {
                this.state.errors.map(error => <li> { error } </li>)
            }
        </ul>

        <section>
            <h2>Sign up</h2>
            <form  onSubmit={(e) => this.signUpSubmitted(e)} >
                <label htmlFor="sign_ip_username">Username</label>
                <input id="sign_up_username"
                        type="text"
                        onChange={ this.onChange }
                        name="username"
                        value={ this.state.username }
                       />
                <br></br>
            <label  htmlFor="sign_up_password">Password</label>    
                <input  id="sign_up_password"
                        type="password"
                        onChange={ this.onChange }
                        name="password"
                        value={ this.state.password }
                        />
                        <br></br>
            <label  htmlFor="password_confirmation">Password Confirmation</label>    
                <input  id="password_confirmation"
                        type="password"
                        onChange={ this.onChange }
                        name="password_confirmation"
                        value={ this.state.passwordConfirmation }
                        />
                        <br></br>
                <input type="submit"/>
            </form>
            <br></br>
    
            
        </section></>
        
        )
    }

}

export default Signup


