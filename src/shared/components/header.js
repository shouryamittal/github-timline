import React from 'react';
import '../styles/header.scss';

function Header () {
    return(
        <div className = "header d-flex justify-space-around align-items-center position-relative">
            <p className = "logo d-flex justify-center align-items-center">GT</p>
            <p className = "text">Github Timline</p>
        </div>
    )
}

export default Header;