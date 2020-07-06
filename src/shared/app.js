import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from '../shared/routes/routes';
import Header from '../shared/components/header';

function App() {
    return(
        <div>
            <Header/>
            <Switch>
                {routes.map((route, i)=> <Route key= {i} {...route}/>)}
            </Switch>
        </div>
    );
}

export default App;