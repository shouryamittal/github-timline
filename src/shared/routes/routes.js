import Login from '../components/login';
import Timeline from '../components/timeline';
import fetchData from '../utils/fetchDataFromApi';
import Home from '../components/home';
import Insights from '../components/insights';

const routes = [
    {
        path: '/',
        exact: true,
        component: Login
    },

    {
        path: '/login',
        component: Login,
        exact: true,
    },

    {
        path: '/timeline',
        component: Timeline,
        exact: true,
    },
    {
        path: '/home',
        component: Home,
        exact: true,
    },
    {
        path: '/insights/:username',
        exact: true,
        component: Insights,
    }
];
export default routes;