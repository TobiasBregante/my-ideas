import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pdw, setPdw] = useState('');
    const [credentialDenied, setCredentialDenied] = useState('d-none');
    const [credentialSuccess, setCredentialSuccess] = useState('d-none');
    const AuthSignup = async user => {
        const confi = {
            headers: {
                'Content-Type': 'application/json'
            }
        },
        data = user;
        const AuthSend = await axios.post('https://small-project-api.herokuapp.com/users', data, confi),
        AuthRes = await AuthSend.data;
        return AuthRes;
    },
    HandlerSubmit = e => {
        e.preventDefault()
        const data = {
            "email": email,
            "name": user,
            "password": pdw
        }
        console.log(data)
        AuthSignup(data)
        .then(success => {
            console.log(success)
            setCredentialSuccess('')
            setTimeout(() => {
                setCredentialSuccess('d-none')    
            }, 1500)
        })
        .catch(err => {
            setCredentialDenied('')
            setTimeout(() => {
                setCredentialDenied('d-none')    
            }, 1500)
        })
    },
    HandlerEmail = e => {
        setEmail(e.target.value);
    }, 
    HandlerUser = e => {
        setUser(e.target.value);
    },
    HandlerPdw = e => {
        setPdw(e.target.value);
    }
    return(
        <>
        <section className='row auth-frm'>
            <article className='col-12 col-sm-6 col-lg-5 col-xl-4 m-auto'>
                <article className='col-12 text-light'>
                    <p><strong>Sign In</strong></p>
                </article>
                <form onSubmit={HandlerSubmit} className='col-12 text-light'>
                    <article className={`${credentialDenied} credential-denied form-group bg-danger`}>
                        <p>This user is not available!</p>
                    </article>
                    <article className={`${credentialSuccess} credential-denied form-group bg-success`}>
                        <p>Successful creation!</p>
                    </article>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail11">Username</label>
                        <input onChange={HandlerUser} type="text" className="form-control" id="exampleInputEmail11" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input onChange={HandlerEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted-light">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={HandlerPdw} type="password" className="form-control" id="exampleInputPassword1"/>
                        <small className='p-1 text-dark bg-warning mt-1 d-block'>
                            at least 8 characters, including 1 uppercase letter,<br/>
                            1 lowercase letter, and 1 number</small>
                    </div>
                    <input type="submit" className="btn btn-primary d-block col-12" value='Sign in'/>
                    <Link to='/login' className='nav-link text-light'>or Log In</Link>
                </form>
            </article>
        </section>
        </>
    )
}

export default Register;