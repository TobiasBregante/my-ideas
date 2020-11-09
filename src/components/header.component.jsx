import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [auth, setAuth] = useState('');
    const [noAuth, setNoAuth] = useState('false');
    const [profile, setProfile] = useState('')
    const Logout = () => {
        removeCookie('user');
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    }
    const RefreshJWT = async () => {
        const confi = {
            headers: {
                'Content-Type': 'application/json'
            }
        },
        body = {
            "refresh_token": "the-token-str-2"
          }
        const refreshSend = await axios.post(`https://small-project-api.herokuapp.com/access-tokens/refresh`, body, confi);
        const refreshRes = await refreshSend;
        return refreshRes;
    }
    useEffect(() => {
        let data = cookies.user;
        setInterval(() => {
            RefreshJWT()
            .then(success => {
                data.jwt = success.jwt;
                setCookie('user', data, { maxAge: 86400 })
            })
        }, 60000)
    }, [])
    useEffect(() => {
        if(cookies && cookies.user){
            setAuth('d-none')
            setNoAuth('');
            setProfile(`url('${cookies.user.profile.avatar_url})`)
        }else{
            setNoAuth('d-none');
            setAuth('')
            setProfile('none')
        }
    })
    return(
        <>
        <header className='row bg-primary'>
            <article className='content-brand col-12 col-sm-12 col-lg-12 col-xl-12'>
                <h1 className='brand'>
                    <Link className='nav-link' to='/'>
                        My Ideas
                    </Link>
                </h1>
            </article>
            <article className='content-navlist col-12 col-sm-12 col-lg-12 col-xl-12'>
                <article className={`${noAuth} col-12 content-profile`}>
                    <article id='profile-brand' style={{backgroundImage: `${profile}`}}/>
                    <small>
                        <strong className='p-1 text-light'>
                            {cookies.user ?  cookies.user.profile.name : ''}
                        </strong>
                    </small>    
                </article><hr/>
                <ul>
                    <li className={`${auth} nav-item`}>
                        <Link className='nav-link' to='/'>
                            Home
                        </Link>
                    </li>
                    <li className={`${noAuth} nav-item`}>
                        <Link className='nav-link' to='/ideas'>
                            My ideas
                        </Link>
                    </li>
                    <li className={`${auth} nav-item`}>
                        <Link className='nav-link' to='/login'>
                            Log in
                        </Link>
                    </li>
                    <li className={`${auth} nav-item`}>
                        <Link className='nav-link' to='/signin'>
                            Sign in
                        </Link>
                    </li>
                    <li className={`${noAuth} nav-item`}>
                        <Link to='/' className='nav-link' onClick={Logout}>
                            Log out
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <a href='https://www.linkedin.com/in/tobías-nazareno-bregante-603304167' className='nav-link' target='_blank'>
                            Linkedin
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='https://github.com/tobiasbregante/my-ideas' className='nav-link' target='_blank'>
                            Github
                        </a>
                    </li>
                </ul>
            </article>
        </header>
        </>
    )
}

export default Header;