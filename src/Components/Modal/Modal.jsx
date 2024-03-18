import React from 'react'
import { useEffect } from 'react';
import { UseTimer } from '../../Context/TimerContext';

const Modal = ({ children , id, setModal}) => {
    const { setTimerAviable } = UseTimer();

    useEffect(() => {
        const modalElement = document.getElementById(id);
        setModal(new bootstrap.Modal(modalElement));

        modalElement.addEventListener('shown.bs.modal', handleModalShown);
        modalElement.addEventListener('hidden.bs.modal', handleModalHidden);

        return () => {
            modalElement.removeEventListener('shown.bs.modal', handleModalShown);
            modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
        };
    }, []);

    const handleModalShown = () => {
        setTimerAviable(false);
    };

    const handleModalHidden = () => {
        setTimerAviable(true);
    };


    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal