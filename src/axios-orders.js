import axios from 'axios';
const instance = axios.create({
        baseURL:"https://react-my-burger-f42be.firebaseio.com/"
});

export default instance;