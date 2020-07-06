import Home from '../components/home';
import Timeline from '../components/timeline';
import fetchData from '../utils/fetchDataFromApi';

const routes = [
    {
        path: '/home',
        component: Home,
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
    }
];
export default routes;