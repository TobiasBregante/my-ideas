import { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import IdeaList from './idealist.component';
import AddIdea from './management/add.component';

const IdeaComponent = () => {
    const [dataOne, setDataOne] = useState('d-none');
    const [idea, setIdea] = useState([]);
    const [cookies] = useCookies(['user']);
    const FetchIdea = async () => {
        if(cookies && cookies.user.jwt){
            const getIdea = await axios.get('https://small-project-api.herokuapp.com/ideas?page=1', {
                headers: {
                    'content-type': 'application/json',
                    'X-Access-Token': cookies.user.jwt
                }
            }),
            resIdea = await getIdea.data;
            setIdea(resIdea)
        }
    }
    const OpenAdd = e => {
        setDataOne('')
    },
    CloseAdd = e => {
        setDataOne('d-none')
    }
    useEffect(() => {
        FetchIdea()
    }, [])
    return(
        <>
        <section className='row ideas'>
            <article className='content-list-ideas col-12 col-sm-12 col-lg-12 col-xl-12'>
                {
                    idea && idea.length > 1 ?
                    <table className="table table-dark bg-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Content</th>
                            <th scope="col">impact</th>
                            <th scope="col">ease</th>
                            <th scope="col">confidence</th>
                            <th scope="col">avg</th>
                            <th scope="col">create at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {idea.map((element, i) => {
                            return(
                                <IdeaList key={i} keyId={i} dataList={element}/>
                            )
                        })}
                        </tbody>
                    </table>
                    : <p className='no-ideas-title'>
                        😬😬😬<br/>
                        Do you not have ideas!<br/>
                        Get started to think ideas!<br/>
                        😝😝😝
                    </p>
                }
            </article>
        </section>
        <button onClick={OpenAdd} type='button' className='bg-warning btn-open-add'>
            <svg viewBox="0 0 16 16" 
                className="bi bi-plus-circle" fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" 
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fillRule="evenodd" 
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </button>
        <AddIdea openForm={dataOne}>
            <button onClick={CloseAdd} type="button" className='btn btn-secondary'>Cancel</button>
        </AddIdea>
        </>
    )
}

export default IdeaComponent;