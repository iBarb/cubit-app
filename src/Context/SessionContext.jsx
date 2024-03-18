import { useState } from "react";
// import { useCallback } from "react";
import { useContext } from "react";
import { createContext } from "react";
import PropTypes from 'prop-types';
import { calculateAverage } from "../General/Function";

const SessionContext = createContext(null);

export function UseSession() {
    return useContext(SessionContext)
}

export function SessionProvider({ children }) {
    const [session, setSession] = useState({});
    const [CurrentSessionId, setCurrentSessionId] = useState(1)
    const [ArrSessions, setArrSessions] = useState([{
        id: 1,
        name: "1"
    }])
    const [times, setTimes] = useState([]);
    const [ao5, setAo5] = useState([]);
    const [ao12, setAo12] = useState([]);


    function addTime(hours, minutes, seconds, hnds) {
        let ArrTimesObj = []
        let ArrAo5 = []
        let ArrAo12 = []
        let ArrTimes = []
        let SessionsObj = {};

        let newTimeObj = {
            hours: ~~hours,
            minutes: ~~minutes,
            seconds: ~~seconds,
            hnds: ~~hnds
        };

        ArrTimesObj = [...times, newTimeObj];

        let averageTime5 = "-"
        let averageTime12 = "-"
        
        if (ArrTimesObj.length >= 5) {
            let lastFive = ArrTimesObj.slice(-5);
            averageTime5 = calculateAverage(lastFive)
        }
        if (ArrTimesObj.length >= 12) {
            let lastTwelve = ArrTimesObj.slice(-12);
            averageTime12 = calculateAverage(lastTwelve)
        }

        ArrAo5 = [...ao5, averageTime5];
        ArrAo12 = [...ao12, averageTime12];

        SessionsObj = { ...session };

        const currentSessionArray = SessionsObj[CurrentSessionId] || [];

        ArrTimes = [...currentSessionArray, {
            id: currentSessionArray.length + 1,
            time: newTimeObj,
            ao5: averageTime5 || "-",
            ao12: averageTime12 || "-",
            date: new Date()
        }];

        SessionsObj[CurrentSessionId] = ArrTimes;

        setTimes(ArrTimesObj);
        setAo5(ArrAo5);
        setAo12(ArrAo12);
        setSession(SessionsObj);

    }

    // Manejor de las sessiones
    function ResetSession(idSession) {
        if (idSession) {
            setSession({ ...session, [idSession]: [] })
        }
    }

    const values = {
        session,
        ao5,
        ao12,
        CurrentSessionId,
        setCurrentSessionId,
        ResetSession,
        ArrSessions,
        setArrSessions,
        addTime
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