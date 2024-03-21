import React from 'react'
import Swal from 'sweetalert2';
import { UseSession } from '../../Context/SessionContext';
import { UseTimer } from '../../Context/TimerContext';

function SessionManage() {
    const { CurrentSessionId, setCurrentSessionId, ResetSession, ArrSessions, addSession, editSession, removeSession } = UseSession()
    const { setHnds, setSeconds, setMinutes, setHours } = UseTimer();

    const HandleResetSession = () => {
        ResetSession(CurrentSessionId);
        setHnds(0)
        setSeconds(0)
        setMinutes(null)
        setHours(null)
    }



    const handleChange = (e) => {
        if (e.target.value === "add") {
            addSession();
        } else if (e.target.value === "edit") {
            editSession();
        } else if (e.target.value === "remove") {
            removeSession();
        } else {
            setCurrentSessionId(e.target.value);
        }
    };


    return (
        <>
            <div className='d-flex align-items-center gap-2'>
                <span>Session:</span>
                <select className="form-select form-select-sm" name="sesions" id="select_session" onChange={handleChange} value={CurrentSessionId} style={{ width: '80px' }}>
                    {ArrSessions.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )
                    })}
                    <option value="edit">Edit...</option>
                    <option value="add">New...</option>
                    <option value="remove" disabled={ArrSessions.length < 2}>Delete...</option>
                </select>
                <button onClick={HandleResetSession} className='btn btn-sm btn-secondary d-flex align-items-center justify-content-center' style={{ width: '32px', height: '32px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width='12px' viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                </button>
            </div>
        </>
    )
}

export default SessionManage