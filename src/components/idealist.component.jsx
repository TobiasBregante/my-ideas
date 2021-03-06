import { useState } from 'react';
import EditIdea from './management/edit.component';
import RemoveIdea from './management/remove.component';

const IdeaList = prop => {
    const [dataOne, setDataOne] = useState('d-none');
    const [dataOneRemove, setDataOneRemove] = useState('d-none');
    const OpenEdit = e => {
        setDataOne('')
    },
    CloseEdit = e => {
        setDataOne('d-none')
    },
    OpenRemove = e => {
        setDataOneRemove('')
    },
    CloseRemove = e => {
        setDataOneRemove('d-none')
    }
    return(
        <>
        <tr>
            <th scope="row">{prop.keyId + 1}</th>
            <td>{prop.dataList.content}</td>
            <td>{parseInt(prop.dataList.impact)}</td>
            <td>{parseInt(prop.dataList.ease)}</td>
            <td>{parseInt(prop.dataList.confidence)}</td>
            <td>{parseInt(prop.dataList.average_score)}</td>
            <td>{new Date(prop.dataList.created_at * 1e3).toLocaleDateString()}</td>
            <td>
                <RemoveIdea openFormRemove={dataOneRemove} keyId={prop.dataList.id}>
                    <button onClick={CloseRemove} type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </RemoveIdea>
                <button onClick={OpenRemove} data-toggle="modal" data-target="#exampleModal" type='button' className='btn btn-danger'>
                    <svg viewBox="0 0 16 16" 
                        className="bi bi-trash" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" 
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </td>
            <td>
                <EditIdea openForm={dataOne} UpdateIdea={prop.dataList}>
                    <button onClick={CloseEdit} type="button" className='btn btn-secondary'>Cancel</button>
                </EditIdea>
                <button onClick={OpenEdit} type='button' className='btn btn-warning'>
                    <svg viewBox="0 0 16 16" 
                        className="bi bi-pen" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" 
                        d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                    </svg>
                </button>
            </td>
        </tr>
        </>
    )
}

export default IdeaList;