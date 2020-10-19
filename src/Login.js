import React from 'react';
import { Redirect } from "react-router-dom";

class Login extends React.Component{

    state = {
        name: "",
        password: "",
        errors: []
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    logInSubmitted = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                 password: this.state.password
            })
        }).then(r => r.json())
        .then(data => {
            if (data.errors) {
                this.setState({
                    errors: data.errors
                })
            }
            else{
            this.props.setToken(data);
            this.setState({
                errors: []
            })}
        })

    }


    render(){
      

    if (this.props.user_id) {this.props.history.push("/")}

        return( <>
        <ul>
            {
                this.state.errors.map(error => <li> { error } </li>)
            }
        </ul>

        <section>
            <h2>Login</h2>
            <form  onSubmit={(e) => this.logInSubmitted(e)} >
                <label htmlFor="log_in_username">Username</label>
                <input id="log_in_username"
                        type="text"
                        onChange={ this.onChange }
                        name="name"
                        value={ this.state.name }
                       />
                <br></br>
            <label  htmlFor="log_in_password">Password</label>    
                <input  id="log_in_password"
                        type="password"
                        onChange={ this.onChange }
                        name="password"
                        value={ this.state.password }
                        />
                        <br></br>
                <input type="submit"/>
            </form>
            <br></br>
    
            
        </section></>
        
        )
    }

}



export default Login
