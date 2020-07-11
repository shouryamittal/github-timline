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
         if(!this.state.repos){
            Insights.fetchInitialData(this.state.username)
            .then((response) => {
                this.setState({repos: response, loading: false})
            });
        }
    }
    render() {
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
            if(repos.length > 0) {
                html = repos.map((repo) => {
                return <RepoCard repoDetails = {repo} key = {repo.id} />
            })
         }
            return (
                <div className = "insights text-center">
                    <div className = "ownerName">@{this.state.username}</div>
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
        let url = "https://api.github.com/users/"+username+"/repos";
        return axios.get(url,headers)
                .then(res => {
                    return res.data
                })
                .catch(err => err)
    }
}

export default Insights;