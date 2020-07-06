import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import '../styles/homepage.scss';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', confirmPassword: ''};

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);   
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }
    handlePassword(event) {
        this.setState({password: event.target.value});
    }
    handleConfirmPassword() {
        this.setState({confirmPassword: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/user/create', {email:this.state.email, password: this.state.password})
            .then((response) => {
                return <Redirect to = "/timeline" />
            })
            .catch(() => {
                console.log('Error: Cant create user')
            })
    }   
    render() {
        return (
            <div className = "homePage">
                <div className = "hero text-center">
                    <div className = "tagLine">Get Insights of a github repository!</div>
                    <p>Guthub Timline provides detailed information about any public repository.</p>
                    <div className = "registrationForm">
                        <form onSubmit = {this.handleSubmit} name = "signupForm" className = "registerForm d-flex justify-center align-items-center flex-column">
                            <input id = "email" placeholder = "Email" type = "text" name = "email" onChange = {this.handleEmail}/>
                            <input id = "password" placeholder = "Password" type = "password" name = "password" onChange = {this.handlePassword}/>
                            <input id = "confirmPassword" placeholder = "Confirm Password" type = "password" name = "confirmPassword" />
                            <button>Sign me up</button>
                        </form>
                    </div>
                </div>

            </div>)
    }
}

export default Home;