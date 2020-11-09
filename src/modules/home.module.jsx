import { Link } from 'react-router-dom';

const HomeModule = () => {
    return(
        <>
        <section className='row home'>
            <article className='col-12 col-sm-12 col-lg-12 col-xl-12'>
                <p className='text-home'>
                    Organize your tasks and start to be more productive with 
                    <span className='text-warning'> My Ideas</span>
                </p>
                <Link to='/signin' className='btn btn-primary col-3 d-block'>Get started!</Link>
                <Link to='/login' className='nav-link col-2 d-block'>or Log In</Link>
            </article>
        </section>
        </>
    )
}

export default HomeModule;