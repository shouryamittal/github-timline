import React, {Component} from 'react';
import '../styles/homepage.scss';
import axios from 'axios';

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {username: '', validUser: false};
        this.handleUserName = this.handleUserName.bind(this);
        this.handleUserTimline = this.handleUserTimline.bind(this);
    }

    handleUserName(event) {
        this.setState({username: event.target.value});
    }

    handleUserTimline() {
        let headers = {
            'User-Agent': 'Github-Timeline',
        }
        if(this.state.username.length) {
            let url = "https://api.github.com/users/"+this.state.username;
            axios.get(url, {}, headers)
            .then((response) => {
                this.props.history.push({
                    pathname: '/insights/'+this.state.username,
                    state: response.data
                })
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    render() {
        return(
            <div className = "homePage">
                <div className = "head text-center">
                    Enter any valid github username to get insights.
                </div>
                <div className = "d-flex justify-center flex-column align-items-center">
                    <div className = "userName">
                        <input onChange = {this.handleUserName} type = "text" placeholder = "Github Username" maxLength = "50"/>
                    </div>
                    <div className = "actionButtons d-flex justify-space-between align-items-center">
                        <div className = "timlineButton">
                            <button onClick = {this.handleUserTimline} type = "button">Show User Timeline</button>
                        </div>
                        <div className = "repoButton">
                            <button type = "button">Show User Repo Insights</button>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default Home;