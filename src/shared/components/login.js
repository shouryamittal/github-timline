import React, {Component} from 'react';
import axios from 'axios';
import '../styles/login.scss';
import responseLogger from '../utils/responseLogger';
import validateInput from '../utils/validateInput';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', confirmPassword: '', loginError: false, loginErrorMsg: ''};

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
    handleConfirmPassword(event) {
        this.setState({confirmPassword: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault();
        let status = validateInput(this.state.password, this.state.confirmPassword);
        axios.post('http://localhost:3000/user/create', {email:this.state.email, password: this.state.password})
        .then((response) => {

            
            if(response.status == 201) {
                this.props.history.push('/home');
            }
            else {
                this.setState({email: '', passoword: '', confirmPassword: '', loginError: false, loginErrorMsg: responseLogger(response.status)});
            }
        })
        .catch(() => {
            console.log('Error: Cant create user')
        });
    }   
    render() {
        return (
            <div className = "loginPage">
                <div className = "hero">
                    <div className = "tagLine">Get Insights of a github repository!</div>
                    <p>Guthub Timline provides detailed information about any public repository.</p>
                    <div className = "registrationForm text-center">
                        <form onSubmit = {this.handleSubmit} name = "signupForm" className = "registerForm">
                           <div className = "email">
                                <input id = "email" placeholder = "Email" type = "text" name = "email" onChange = {this.handleEmail}/>
                           </div>
                            <div className = "password">
                                <input id = "password" placeholder = "Password" type = "password" name = "password" onChange = {this.handlePassword}/>
                            </div>
                            <div className = "cnfPassword">
                                <input id = "confirmPassword" placeholder = "Confirm Password" type = "password" name = "confirmPassword" />
                            </div>
                            <button>Sign me up</button>
                        </form>
                        {
                            this.state.loginError ? 
                            <div className = "loginError d-flex justify-content-center align-items-center text-center">
                                <div className = "errorMsg">{this.state.loginErrorMsg}</div>
                            </div>:null
                        }
                    </div>
                </div>

            </div>)
    }
}

export default Login;