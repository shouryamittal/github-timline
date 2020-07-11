import React, {Component} from 'react';
import axios from 'axios';
import RepoCard from '../components/repoCard';
import '../styles/insights.scss';

class Insights extends Component {
    constructor(props) {
        super(props);
        let repos;
        if(__isBrowser__) {
            if(window.__INITIAL_DATA__) {
                repos = window.__INITIAL_DATA__;
                delete window.__INITIAL_DATA__;
            }
        }
        else {
            if(props.staticContext && props.staticContext.data) {   
                repos = props.staticContext.data;
            }
        }

        this.state = {username: this.props.match.params.username, repos: repos, loading: repos ? false: true};
    }

    componentDidMount() {
        console.log('called');
         if(!this.state.repos){
             console.log('hey there is something in repos', this.state.repos)
            Insights.fetchInitialData(this.state.username)
            .then((response) => {
                console.log("response", response);
                this.setState({repos: response, loading: false})
            })
        }
        else {
            console.log('THere is something', this.state.repos)
        }
    }
    render() {
        console.log("render")
        if(this.state.loading) {
            return (
                <div className = "insights text-center">
                    <div className = "ownerName">{this.state.username}</div>
                    <div>LOADING....</div>
                </div>
            )
        }
        else 
        {
            let html;
            let repos = this.state.repos;
            console.log('render:', this.state.repos)
            if(repos.length > 0) {
                html = repos.map((repo) => {
                return <RepoCard repoDetails = {repo} key = {repo.id} />
            })
         }
            return (
                <div className = "insights text-center">
                    <div className = "ownerName">@ {this.state.username}</div>
                    <div className = "repos d-grid">
                        {html}
                    </div>
                </div>
            )
        }
    }

    static fetchInitialData(username) {
        let headers = {
            'User-Agent' : 'Github-Timeline'
        }
        let url = "https://api.github.com/users/"+username+"/repos"
        console.log(url);
        return axios.get(url,headers)
                .then(res => {
                    return res.data
                })
                .catch(err => err)
    }
}

export default Insights;