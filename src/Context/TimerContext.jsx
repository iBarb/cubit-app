import { useState } from "react";
// import { useCallback } from "react";
import { useContext } from "react";
import { createContext } from "react";
import PropTypes from 'prop-types';
import { UseSession } from "./SessionContext";
import { useRef } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const TimerContext = createContext(null);

export function UseTimer() {
    return useContext(TimerContext)
}

export function TimerProvider({ children }) {
    const { addTime, session, CurrentSessionId } = UseSession();

    const [TimerAviable, setTimerAviable] = useState(true)

    const [hnds, setHnds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(null);
    const [hours, setHours] = useState(null);

    const [statusTimer, setStatusTimer] = useState(0);
    const [control, setControl] = useState(null);
    const [timerID, setTimerID] = useState(null);

    const hndsRef = useRef(0)
    const secondsRef = useRef(0)
    const minutesRef = useRef(0)
    const hoursRef = useRef(0)


    const getClassNameByCode = (code) => {
        const statusKeys = Object.keys(STATUS);
        for (let i = 0; i < statusKeys.length; i++) {
            const key = statusKeys[i];
            if (STATUS[key].code === code) {
                return STATUS[key].className;
            }
        }
        return '';
    };

    const STATUS = useMemo(() => ({
        IDLE: {
            code: 0,
            className: '',
        },
        PROCESS: {
            code: 1,
            className: 'text-danger',
        },
        READY_TO_START: {
            code: 2,
            className: 'text-success',
        },
        INSPECTING: {
            code: 3,
            className: 'text-warning',
        },
        READY_TO_INSPECTION: {
            code: 4,
            className: 'text-success',
        },
        START_SOLVE: {
            code: 5,
            className: '',
        },
        END_SOLVE: {
            code: 6,
            className: '',
        },
    }), []);


    const cronometro = useCallback(() => {

        if (hndsRef.current < 99) {
            hndsRef.current++;
            if (hndsRef.current < 10) { hndsRef.current = "0" + hndsRef.current }
            setHnds(hndsRef.current);
        }
        if (hndsRef.current == 99) {
            hndsRef.current = -1;
        }
        if (hndsRef.current == 0) {
            secondsRef.current++;
            if (secondsRef.current < 10) { secondsRef.current = "0" + secondsRef.current }
            setSeconds(secondsRef.current);
        }
        if (secondsRef.current == 59) {
            secondsRef.current = -1;
        }
        if ((hndsRef.current == 0) && (secondsRef.current == 0)) {
            minutesRef.current++;
            if (minutesRef.current < 10) { minutesRef.current = "0" + minutesRef.current }
            setMinutes(minutesRef.current);
        }
        if (minutesRef.current == 59) {
            minutesRef.current = -1;
        }
        if ((hndsRef.current == 0) && (secondsRef.current == 0) && (minutesRef.current == 0)) {
            hoursRef.current++;
            if (hoursRef.current < 10) { hoursRef.current = "0" + hoursRef.current }
            setHours(hoursRef.current);
        }
    }, [])

    const start = useCallback(() => {
        setControl(setInterval(cronometro, 10));
        setStatusTimer(STATUS.START_SOLVE.code);
    }, [cronometro, STATUS]);

    const Stop = useCallback(() => {
        clearInterval(control);
        addTime(hoursRef.current, minutesRef.current, secondsRef.current, hndsRef.current);

    }, [control, addTime]);

    const restart = useCallback(() => {
        clearInterval(control);
        setHnds(0);
        setSeconds(0);
        setMinutes(0);
        setHours(0);

        hndsRef.current = 0
        secondsRef.current = 0
        minutesRef.current = 0
        hoursRef.current = 0
    }, [control]);

    const handleKeyDown = useCallback((event) => {
        if (statusTimer === STATUS.START_SOLVE.code) {
            Stop()
            setStatusTimer(STATUS.PROCESS.code);
        } else if (event.keyCode === 32 && (statusTimer === STATUS.IDLE.code || statusTimer === STATUS.END_SOLVE.code)) {
            setStatusTimer(STATUS.PROCESS.code);
            setTimerID(setTimeout(() => {
                restart();
                setStatusTimer(STATUS.READY_TO_START.code);
            }, 400))
        }
    }, [statusTimer, STATUS, Stop, restart]);

    const handleKeyUp = useCallback((event) => {
        if (event.keyCode === 32 && statusTimer === STATUS.READY_TO_START.code) {
            start()
        } else if (event.keyCode === 32) {
            setStatusTimer(STATUS.IDLE.code);
            clearTimeout(timerID)
        } else if (statusTimer === STATUS.PROCESS.code) {
            setStatusTimer(STATUS.IDLE.code);
        }
    }, [timerID, STATUS, statusTimer, start]);


    useEffect(() => {
        if (TimerAviable) {
            document.addEventListener('keydown', handleKeyDown, false);
            document.addEventListener('keyup', handleKeyUp, false);
        } else {
            clearInterval(control);
            document.removeEventListener('keydown', handleKeyDown, false);
            document.removeEventListener('keyup', handleKeyUp, false);
        }

        return () => {
            clearInterval(control);
            document.removeEventListener('keydown', handleKeyDown, false);
            document.removeEventListener('keyup', handleKeyUp, false);
        };
    }, [control, handleKeyDown, handleKeyUp, TimerAviable]);

    useEffect(() => {
        const arrTimes = session[CurrentSessionId];
        const lastTime = arrTimes ? arrTimes[arrTimes.length - 1] : null;
    
        if (lastTime) {
            const { time } = lastTime;
            let { hnds, seconds, minutes, hours } = time;
    
            if (hnds !== 0 && hnds < 10) { hnds = "0" + hnds }
            if (seconds !== 0 && seconds < 10) { seconds = "0" + seconds }
            if (minutes !== 0 && minutes < 10) { minutes = "0" + minutes }
            if (hours !== 0 && hours < 10) { hours = "0" + hours }

            setHnds(hnds);
            setSeconds(seconds);
            setMinutes(minutes);
            setHours(hours);
        }
    }, [session, CurrentSessionId]);
    



    const values = {
        hours,
        minutes,
        seconds,
        hnds,
        setHnds,
        setSeconds,
        setMinutes,
        setHours,
        getClassNameByCode,
        statusTimer,
        TimerAviable,
        setTimerAviable
    }

    return (
        <TimerContext.Provider value={values}>
            {children}
        </TimerContext.Provider>
    )
}

TimerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};