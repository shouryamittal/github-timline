import React from 'react';
import {renderToString} from 'react-dom/server';
import {matchPath, StaticRouter} from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';
import App from '../../shared/app';
import routes from '../../shared/routes/routes';

function handleRender(req, res, next) {

    //function will handle rendering of react app
    let activeRoute = routes.find(route => matchPath(req.url, route)) || {};
    let routeInfo = matchPath(req.url, activeRoute.path);
    let userName = routeInfo.params.username;
    let promise = activeRoute.component.fetchInitialData ? activeRoute.component.fetchInitialData(userName): Promise.resolve();
    promise
        .then((response) => {
            let html = renderToString(
                <StaticRouter location = {req.url} context = {{data:response}}>
                    <App/>
                </StaticRouter>
            );
            fs.readFile(path.resolve("public/index.html"), 'utf8', (err, data) => {
                if(err) {
                    return res.status(500).send("No HTML file found to serve");
                }
                let fileData = data.replace('<script src="#"></script>', `<script>window.__INITIAL_DATA__=${serialize(response)}</script>`);
                return res.status(200).send(fileData.replace('<div id = "app"></div>', `<div id = "app">${html}</div>`));
            });
        })
        .catch((err) => {
            console.log(err)
            next();
        })
}


export default handleRender;