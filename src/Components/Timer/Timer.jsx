
import './Timer.css';
import { UseSession } from '../../Context/SessionContext';
import { UseTimer } from '../../Context/TimerContext';
import { FormatTime } from '../../General/Function';

const Timer = () => {
  const { hours, minutes, seconds, hnds, getClassNameByCode, statusTimer } = UseTimer();
  const { ao5, ao12 } = UseSession()


  return (
    <div className={`d-flex bg-body-tertiary justify-content-center align-items-center w-100 h-100 text-center rounded`}>
      <div style={{ viewTransitionName: "Timer" }} >
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
