import React, {useEffect, useState} from 'react';
import '../styles/repo.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCodeBranch, faExclamationTriangle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';

function RepoCard(props) {
    let [state, setState] = useState([]);
    let language = props.repoDetails.language ? props.repoDetails.language : '';
    if(language === "C++"){language = "CPP";} 
    let clickOutUrl = props.repoDetails.clone_url;
    let starCount = props.repoDetails.stargazers_count;
    let description = props.repoDetails.description || "No Description Available.";
    let forkCount = props.repoDetails.forks_count;
    let lastUpdated = props.repoDetails.updated_at;
    let defaultBranch = props.repoDetails.default_branch;
    let hasIssues = props.repoDetails.has_issues;
    let contributorURL = props.repoDetails.contributors_url;
    let headers = {
        'User-Agent' : 'Github-Timeline'
    }
    useEffect(() => {
        axios.get(contributorURL, headers)
        .then((response) => {
            setState(response.data);
        })
        .catch(err => setState([]))
    },[]);
    let html = [];
    if(state.length) {
        if(state.length > 3) {
            for(let i = 0; i < 3; i++) {
                html.push(<div key = {state[i].id} className = "contributor position-relative" title = {state[i].login}><a href = {state[i].html_url}><img src = {state[i].avatar_url} alt = {state[i].login}/></a></div>);
            }
            html.push(<div className = "restCount d-flex justify-center align-items-center">+{state.length - 3}</div>);
        }
        else {
            for(let i = 0; i < state.length; i++) {
                html.push(<div key = {state[i].id} className = "contributor position-relative" title = {state[i].login}><a href = {state[i].html_url}><img src = {state[i].avatar_url} alt = {state[i].login}/></a></div>);
            }
        }
    }

    return (
        <div className = {"repoCard text-left base" + language}>
            
            <div className = "name"><a className = "text-none" href = {clickOutUrl}>{props.repoDetails.name}</a></div>
            <div className = "status d-flex justify-space-between">
                <div><FontAwesomeIcon icon={faStar}/><span>:{starCount}</span></div>
                {hasIssues ? <div title = "Vulnerability Found"><FontAwesomeIcon icon={faExclamationTriangle} /></div>: <div title = "No Issue Found"><FontAwesomeIcon icon={faCheckCircle} /></div>}
                <div ><FontAwesomeIcon icon={faCodeBranch} /><span>:{forkCount}</span></div>
            </div>
            <div className = "description">{description}</div>
            <div title = "Default Branch" className = "defaultBranch"><FontAwesomeIcon icon={faCodeBranch}/> : {defaultBranch}</div>
            
            <div className = "contributors d-flex">
                {html}
            </div>
            <div className = "lastUpdated">
                Updated: <Moment format = "DD/MM/YYYY">{lastUpdated}</Moment>
            </div>
            <a href = {clickOutUrl} className = "stretched-link"></a>
        </div>
    )
}

export default RepoCard;