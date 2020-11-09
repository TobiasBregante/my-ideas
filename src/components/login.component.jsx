import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../components/auth/auth.component';

const Login = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [email, setEmail] = useState('');
    const [auth, setAuth] = useState('d-none')
    const [pdw, setPdw] = useState('');
    const AuthLogin = async (email, pdw) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        },
        data = {
            "email": email,
            "password": pdw
        }
        const getAuth = await axios.post('https://small-project-api.herokuapp.com/access-tokens', data, config),
        resAuthUser = await getAuth.data;
        resAuthUser.credential = resAuthUser.jwt ? true : false;
        Auth(resAuthUser.jwt)
        .then(success => {
            resAuthUser.profile = success;
            setCookie('user', resAuthUser, { maxAge: 86400 })
        })
        return resAuthUser;
    },
    HandlerSubmit = e => {
        e.preventDefault()
        AuthLogin(email, pdw)
        .catch(err => setAuth(''))
    },
    HandlerChangeEmail = e => {
        setEmail(e.target.value);
    },
    HandlerChangePdw = e => {
        setPdw(e.target.value);
    }
    return(
        <>
        <section className='row auth-frm'>
            <article className='col-12 col-sm-6 col-lg-5 col-xl-4 m-auto'>
                <article className='col-12 text-light'>
                    <p><strong>Log In</strong></p>
                </article>
                <form onSubmit={HandlerSubmit} className='col-12 text-light'>
                    <article className={`${auth} credential-denied form-group bg-danger`}>
                        <p>The email or password is incorrect!</p>
                    </article>
                    <article className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input onChange={HandlerChangeEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted-light">We'll never share your email with anyone else.</small>
                    </article>
                    <article className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={HandlerChangePdw} type="password" className="form-control" id="exampleInputPassword1"/>
                    </article>
                    <input type="submit" className="btn btn-primary d-block col-12" value='Submit'/>
                    <Link to='/signin' className='nav-link text-light'>or Sign In</Link>
                </form>
            </article>
        </section>
        </>
    )
}

export default Login;