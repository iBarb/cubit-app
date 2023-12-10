
import './Timer.css';
import { UseTimer } from "../../Hooks/UseTimer";



const Timer = () => {
  const { hours, minutes, seconds, hnds, getClassNameByCode, statusTimer } = UseTimer();


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
            <span>ao5: 0.00</span>
          </div>
          <div>
            <span> ao12: 0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
