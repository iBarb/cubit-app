import { UseSession } from '../../Context/SessionContext';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import SessionManage from '../SesionManage/SessionManage';
import { AnimatePresence, motion } from "framer-motion";
import { Toast } from '../../General/Alert';
import { FormatDate_Time, FormatTime } from '../../General/Function';

function Stats() {
    const { session, CurrentSessionId } = UseSession()
    const [InfoTime, setInfoTime] = useState({})
    const [AVGTime, setAVGTime] = useState("")
    const [ModalTime, setModalTime] = useState("")
    const [ModalAVG, setModalAVG] = useState("")

    function OnClickTime(value, item) {
        if (!value || value === '-') {
            return
        }
        ModalTime.show();
        item.text = `${FormatTime(item.time)} @${FormatDate_Time(item.date)}`

        setInfoTime(item)
        return
    }

    function OnClickAVG(value, item, flagAo5) {
        let avg = []
        if (!value || value === '-') {
            return
        }
        else if (flagAo5) {
            avg = session.slice(item.id - 5, item.id)
        } else {
            avg = session.slice(item.id - 12, item.id)
        }

        avg = addMinMaxFlag(avg)

        let text_AVG = "\n"
        text_AVG = text_AVG + `Generated By csTimer on ${FormatDate(item.date)}\n`
        text_AVG = text_AVG + `avg of ${avg.length}: ${FormatTime(avg.length === 5 ? item.ao5 : item.ao12)}\n\n`
        text_AVG = text_AVG + `Time List:\n`

        avg.length > 0 && avg.map((time, index) => {
            const timeString = time.flag ? `(${FormatTime(time.time)})` : FormatTime(time.time)
            return (
                text_AVG = text_AVG + `${index + 1}. ${timeString}\u00A0\u00A0\u00A0D' U F2 R2 U R2 D' B2 U' B2 R U2 L2 B' L D2 B F' D' U \n`
            )
        }).join('\n')

        setInfoTime(item)
        setAVGTime(text_AVG)

        ModalAVG.show();
    }

    function SetClickableClass(value) {
        if (!value || value === '-') {
            return ""
        }
        return "clickable"
    }

    function CopyToClipboard(text) {
        // Copy the text inside the text field
        navigator.clipboard.writeText(text);

        // Alert the copied text
        Toast.fire({
            icon: "success",
            title: "Copied to Clipboard!"
        });
    }

    const renderSessionRows = (session) => {
        const sessionData = session[CurrentSessionId]
        return sessionData && sessionData.length > 0 && sessionData
            .slice()
            .reverse()
            .map((item, index, array) => {
                const reverseIndex = array.length - index;
                return (
                    <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{ opacity: { duration: 0.25 } }}
                        key={item.id}
                    >
                        <td>{reverseIndex}</td>
                        <td className={SetClickableClass(item.time)} onClick={() => OnClickTime(item.time, item)}>{FormatTime(item.time)}</td>
                        <td className={SetClickableClass(item.ao5)} onClick={() => OnClickAVG(item.ao5, item, true)}>{FormatTime(item.ao5)}</td>
                        <td className={SetClickableClass(item.ao12)} onClick={() => OnClickAVG(item.ao12, item, false)}>{FormatTime(item.ao12)}</td>
                    </motion.tr>
                );
            });
    };

    return (
        <>
            <div className='d-flex sidebar flex-column flex-shrink-0 py-3 px-2 bg-body-tertiary h-100 rounded'>
                <div className='pb-3 d-flex align-items-center justify-content-center'>
                    <SessionManage />
                </div>
                <div className="out-table">
                    <table className="table table-sm text-center" style={{ width: '100%' }} >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Time</th>
                                <th>ao5</th>
                                <th>ao12</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {renderSessionRows(session)}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal id="ModalTime" setModal={setModalTime}>
                <div className="modal-body">
                    <div className='title'>
                        Solve No.{InfoTime.id}
                    </div>
                    <div className='body'>
                        <div className='text-center time'>
                            {FormatTime(InfoTime.time)}
                        </div>
                        <div className='options'>
                            <span onClick={() => CopyToClipboard(InfoTime.text)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width='13px' viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" /></svg>
                            </span>
                            |
                            <span>OK</span>
                            |
                            <span >+2</span>
                            |
                            <span>DNF</span>
                            |
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width='11px' viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                            </span>
                        </div>
                        <div className='scramble'>
                            L B' D2 F U' L2 B L' B U R2 U' F2 R2 B2 U2 F2 U' B2 L2 F2
                        </div>
                        <div className='date'>
                            {FormatDate_Time(InfoTime.date)}
                        </div>
                    </div>
                    <div className='footer'>
                        <button className='btn btn-sm btn-secondary d-flex align-items-center justify-content-center' data-bs-dismiss="modal" style={{ height: '32px' }}>
                            OK
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal id="ModalAVG" setModal={setModalAVG}>
                <div className="modal-body">
                    <div className='title '>
                        Current Round Statistics
                    </div>
                    <div className='body'>
                        <span className='CopyAVG' onClick={() => CopyToClipboard(AVGTime)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width='15px' viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" /></svg>
                        </span>
                        <p className='avg-generated'>
                            {AVGTime}
                        </p>
                    </div>
                    <div className='footer'>
                        <button className='btn btn-sm btn-secondary d-flex align-items-center justify-content-center' data-bs-dismiss="modal" style={{ height: '32px' }}>
                            OK
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Stats