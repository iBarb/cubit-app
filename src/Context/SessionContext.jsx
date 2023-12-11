import { useState } from "react";
// import { useCallback } from "react";
import { useContext } from "react";
import { createContext } from "react";
import PropTypes from 'prop-types';

const SessionContext = createContext(null);

export function UseSession() {
    return useContext(SessionContext)
}

export function SessionProvider({ children }) {
    const [session, setSession] = useState([]);
    const [times, setTimes] = useState([]);
    const [ao5, setAo5] = useState([]);
    const [ao12, setAo12] = useState([]);

    function calculateAverage(timesArray) {
        let timesMS = timesArray.map(timeObj => timeToMs(timeObj));

        timesMS.sort((a, b) => {
            return a - b;
        })

        // Eliminar los tiempos mas altos y mas bajos
        timesMS = timesMS.slice(1, -1);

        const sum = timesMS.reduce((total, numero) => total + numero, 0)

        const average = sum / timesMS.length;

        return msToTime(average);
    }

    function addTime(hours, minutes, seconds, hnds) {
        let ArrTimes = []
        let ArrAo5 = []
        let ArrAo12 = []
        let ArrSession = []

        let newTime = {
            hours: ~~hours,
            minutes: ~~minutes,
            seconds: ~~seconds,
            hnds: ~~hnds
        };

        ArrTimes = [...times, newTime];

        let averageTime5 = "-"
        let averageTime12 = "-"

        if (ArrTimes.length >= 5) {
            let lastFive = ArrTimes.slice(-5);
            averageTime5 = calculateAverage(lastFive)
        }
        if (ArrTimes.length >= 12) {
            let lastTwelve = ArrTimes.slice(-12);
            averageTime12 = calculateAverage(lastTwelve)
        }

        ArrAo5 = [...ao5, averageTime5];
        ArrAo12 = [...ao12, averageTime12];

        ArrSession = [...session, {
            id: session.length + 1,
            time: newTime,
            ao5: averageTime5 || "-",
            ao12: averageTime12 || "-",
        }];

        setTimes(ArrTimes);
        setAo5(ArrAo5);
        setAo12(ArrAo12);
        setSession(ArrSession);

    }

    const timeToMs = (timeObj) => {
        const ms = (
            timeObj.hours * 3600000 +
            timeObj.minutes * 60000 +
            timeObj.seconds * 1000 +
            timeObj.hnds * 10
        )
        return ms;
    }

    const msToTime = (ms) => {
        let remainingMs = ms;

        const hours = Math.floor(remainingMs / 3600000);
        remainingMs %= 3600000;

        const minutes = Math.floor(remainingMs / 60000);
        remainingMs %= 60000;

        const seconds = Math.floor(remainingMs / 1000);
        remainingMs %= 1000;

        const hnds = Math.floor(remainingMs / 10);

        return {
            hours,
            minutes,
            seconds,
            hnds
        };
    };

    function FormatTime(ObjTime) {
        if (!ObjTime || ObjTime === "-") {
            return "-";
        }

        const formatPart = (value) => (value < 10 ? `0${value}` : `${value}`);

        const { hours, minutes, seconds, hnds } = ObjTime;

        const timeParts = [
            hours > 0 ? hours + ':' : '',
            minutes> 0 ? minutes + ':' : '',
            seconds + '.',
            hnds >= 0 ? formatPart(hnds) : hnds,
        ];

        return timeParts.join('');
    }

    const values = {
        session,
        addTime,
        FormatTime,
        ao5,
        ao12
    }

    return (
        <SessionContext.Provider value={values}>
            {children}
        </SessionContext.Provider>
    )
}

SessionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};