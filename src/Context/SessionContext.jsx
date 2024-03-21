import { useState } from "react";
// import { useCallback } from "react";
import { useContext } from "react";
import { createContext } from "react";
import PropTypes from 'prop-types';
import { calculateAverage } from "../General/Function";
import Swal from "sweetalert2";

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

    const Alert = Swal.mixin({
        customClass: {
            confirmButton: "btn-sm",
            cancelButton: "btn-sm",
            popup: "CustomAlert"
        },
        returnFocus: false
    });


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
        Alert.fire({
            title: "Are you sure?",
            text: "You will reset all timers of this session.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545",
            reverseButtons: true,
            returnFocus: false
        }).then((result) => {
            if (result.isConfirmed && idSession) {
                setSession({ ...session, [idSession]: [] })
                return
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                return
            }
        });
    }

    const addSession = () => {
        const CurrentSession = ArrSessions[ArrSessions.length - 1]
        setArrSessions([...ArrSessions, { id: CurrentSession.id + 1, name: CurrentSession.id + 1 }]);
        setCurrentSessionId(CurrentSession.id + 1);
    };

    const editSession = () => {
        Alert.fire({
            title: "Enter new Name",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Save",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545",
            returnFocus: false
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                let newArrSessions = [...ArrSessions];

                for (let i = 0; i < newArrSessions.length; i++) {
                    if (newArrSessions[i].id === parseInt(CurrentSessionId)) {
                        newArrSessions[i].name = result.value;
                        break;
                    }
                }
                setArrSessions(newArrSessions);
            }
        });
    };

    const removeSession = () => {
        Alert.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const newArrSessions = ArrSessions.filter((s) => {
                    if (s.id !== parseInt(CurrentSessionId)) {
                        return s;
                    }
                });
                setCurrentSessionId(CurrentSessionId - 1);
                setArrSessions(newArrSessions);
            }
        });


    };

    function DeleteTime(params) {

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
        addTime,
        addSession,
        editSession,
        removeSession,
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