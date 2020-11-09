import { useState } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRef } from 'react';

const Add = prop => {
    const closeAdd = useRef(null);
    const [content, setContent] = useState('');
    const [impact, setImpact] = useState('');
    const [ease, setEase] = useState('');
    const [confidence, setConfidence] = useState('');
    const [cookies] = useCookies(['user']);
    const UpdateIdea = async idea => {
        const confi = {
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Token': cookies.user.jwt 
            }
        }
        const updateSend = await axios.post(`https://small-project-api.herokuapp.com/ideas`, idea, confi);
        const updateRes = await updateSend.data;
        return updateRes;
    }
    const HandlerSubmit = e => {
        e.preventDefault()
        UpdateIdea({
            "content": content,
            "impact": impact,
            "ease": ease,
            "confidence": confidence
            })
            .then(success => {
                closeAdd.current.classList.add('d-none');
                setContent('')
                setImpact('')
                setEase('')
                setConfidence('')
                window.location.reload();
            })
    },
    HandlerChangeContent = e => {
        setContent(e.target.value);
    },
    HandlerChangeImpact = e => {
        setImpact(e.target.value);
    },
    HandlerChangeEase = e => {
        setEase(e.target.value);
    },
    HandlerChangeConfidence = e => {
        setConfidence(e.target.value);
    }
    return(
        <>
        <article ref={closeAdd} className={`${prop.openForm} content-update col-12 col-sm-12 col-lg-6 col-xl-4 bg-dark`}>
            <form onSubmit={HandlerSubmit} className='col-12 text-light'>
                <article className="form-group">
                    <label htmlFor="exampleInputPassword1">Content</label>
                    <input onChange={HandlerChangeContent} type="text" className="form-control" id="exampleInputPassword1" value={`${content}`}/>
                </article>
                <article className="form-group">
                    <label htmlFor="exampleInputPassword2">Impact</label>
                    <input min="1" max="10" onChange={HandlerChangeImpact} type="number" className="form-control" id="exampleInputPassword2" value={parseInt(impact)}/>
                </article>
                <article className="form-group">
                    <label htmlFor="exampleInputPassword3">Ease</label>
                    <input min="1" max="10" onChange={HandlerChangeEase} type="number" className="form-control" id="exampleInputPassword3" value={parseInt(ease)}/>
                </article>
                <article className="form-group">
                    <label htmlFor="exampleInputPassword4">Confidence</label>
                    <input min="1" max="10" onChange={HandlerChangeConfidence} type="number" className="form-control" id="exampleInputPassword4" value={parseInt(confidence)}/>
                </article>
                <button type="submit" className="btn btn-success m-2">Add</button>
                {prop.children}
            </form>
        </article>
        </>
    )
}

export default Add;