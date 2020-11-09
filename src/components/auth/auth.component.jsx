import axios from 'axios';

const Auth = async token => {
    const config = {
        headers: {
            'content-type': 'application/json',
            'X-Access-Token': token
        }
    }
    const getAuth = await axios.get('https://small-project-api.herokuapp.com/me', config),
    resAuthUser = await getAuth.data;
    return resAuthUser;
}

export default Auth;