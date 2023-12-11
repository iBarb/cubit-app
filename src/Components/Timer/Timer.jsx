
import './Timer.css';
import { UseTimer } from "../../Hooks/UseTimer";
import { UseSession } from '../../Context/SessionContext';



const Timer = () => {
  const { hours, minutes, seconds, hnds, getClassNameByCode, statusTimer } = UseTimer();
  const { ao5, ao12, FormatTime } = UseSession()
  
  return (
    <div className="bg-body-tertiary d-flex justify-content-center align-items-center w-100 h-100 text-center rounded">
      <div>
        <div>
          <div id='time' className={`${getClassNameByCode(statusTimer)}`}>
            <span>{hours ? hours + ":" : ''}</span>
            <span>{minutes ? minutes + ":" : ''}</span>
            <span>{seconds}</span>
            <span className='hnds'>.{hnds ? hnds : '00'}</span>
          </div>
        </div>
        <div id='avg'>
          <div>
            <span>ao5: {FormatTime(ao5[ao5.length - 1])}</span>
          </div>
          <div>
            <span> ao12: {FormatTime(ao12[ao12.length - 1])}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
