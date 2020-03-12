import axios from 'axios';

export default axios.create({
    baseURL: 'http://5e6882d4d426c00016b7de1d.mockapi.io/',
    headers: { 'Content-Type': 'application/json' }
});
