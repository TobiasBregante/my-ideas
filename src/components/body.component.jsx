import Header from './header.component';
import HomeModule from '../modules/home.module';
import IdeaModule from '../modules/ideas.module';
import LoginModule from '../modules/login.module';
import RegisterModule from '../modules/register.module';
import Auth from './auth/auth.component';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const Body = prop => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    useEffect(() => {
        if(cookies && cookies.user && cookies.user.jwt){
            setInterval(() => {
                Auth(cookies.user.jwt)
                .catch(err => {
                    removeCookie('user');
                    document.cookie.split(";").forEach((c) => {
                        document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    });
                    window.location.reload(false);
                })
            }, 2000)
        }
    }, [])
    return(
        <Router>
            <>
            <Header/>
            <Switch>
                <Route exact path='/'>
                    <HomeModule/>
                </Route>
                <Route path='/login'>
                {cookies && cookies.user && cookies.user.jwt ? <Redirect to='/ideas'/> : <LoginModule/>}
                </Route>
                <Route path='/signin'>
                    <RegisterModule/>
                </Route>
                <Route path='/ideas'>
                    {cookies && cookies.user && cookies.user.jwt ? <IdeaModule/> : <Redirect to='/login'/>}
                </Route>
            </Switch>
            </>
        </Router>
    )
}

export default Body;