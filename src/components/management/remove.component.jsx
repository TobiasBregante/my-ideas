import { useCookies } from "react-cookie";
import axios from 'axios';

const Remove = prop => {
    const [cookies, setCookie] = useCookies(['user']);
    const RemoveIdea = async idIdea => {
        const confi = {
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Token': cookies.user.jwt 
            }
        }
        const removeSend = await axios.delete(`https://small-project-api.herokuapp.com/ideas/${idIdea}`, confi);
        const removeRes = await removeSend;
        return removeRes;
    }
    const HandlerClick = e => {
        RemoveIdea(prop.keyId)
        .then(success => window.location.reload())
    }
    return(
        <>
        <article className="modal fade text-dark" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <article className="modal-dialog">
                <article className="modal-content">
                <article className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Warning</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </article>
                <article className="modal-body">
                    <p>
                        Are you sure you want to delete it?
                    </p>
                </article>
                <article className="modal-footer">
                    <button onClick={HandlerClick} type="button" className="btn btn-primary" data-dismiss="modal">Remove idea</button>
                </article>
                </article>
            </article>
        </article>
        </>
    )
}

export default Remove;