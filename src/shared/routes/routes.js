import Login from '../components/login';
import Timeline from '../components/timeline';
import fetchData from '../utils/fetchDataFromApi';
import Home from '../components/home';
import Insights from '../components/insights';

const routes = [
    {
        path: '/login',
        component: Login,
        exact: true,
        callback: fetchData,
        apiUrl: 'https://run.mocky.io/v3/163e9f2f-66ed-435c-9d0d-6e2caf6a4f1e'
    },

    {
        path: '/timeline',
        component: Timeline,
        exact: true,
        callback: fetchData,
        apiUrl: 'https://run.mocky.io/v3/163e9f2f-66ed-435c-9d0d-6e2caf6a4f1e'
    },
    {
        path: '/home',
        component: Home,
        exact: true,
    },
    {
        path: '/insights',
        component: Insights,
        exact: true,
    }
];
export default routes;