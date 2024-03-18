export function calculateAverage(timesArray) {
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

export function addMinMaxFlag(times) {
    if (times.length === 0) return;

    // Convertir tiempos a milisegundos y encontrar el mínimo y el máximo
    let minTime = Infinity;
    let maxTime = -Infinity;
    times.forEach(time => {
        const ms = timeToMs(time.time);
        minTime = Math.min(minTime, ms);
        maxTime = Math.max(maxTime, ms);
    });

    // Agregar el flag "min" al tiempo mínimo y "max" al tiempo máximo
    times.forEach(time => {
        const ms = timeToMs(time.time);
        if (ms === minTime) {
            time.flag = true;
        }
        if (ms === maxTime) {
            time.flag = true;
        }
    });

    return times;
}

export const timeToMs = (timeObj) => {
    const ms = (
        timeObj.hours * 3600000 +
        timeObj.minutes * 60000 +
        timeObj.seconds * 1000 +
        timeObj.hnds * 10
    )
    return ms;
}

export const msToTime = (ms) => {
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

export function FormatTime(ObjTime) {
    if (!ObjTime || ObjTime === "-") {
        return "-";
    }

    const formatPart = (value) => (value < 10 ? `0${value}` : `${value}`);

    const { hours, minutes, seconds, hnds } = ObjTime;

    const timeParts = [
        hours > 0 ? hours + ':' : '',
        minutes > 0 ? minutes + ':' : '',
        seconds + '.',
        hnds >= 0 ? formatPart(hnds) : hnds,
    ];

    return timeParts.join('');
}

export function FormatDate_Time(date) {
    var fecha = new Date(date)
    var year = fecha.getFullYear();
    var month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    var day = ('0' + fecha.getDate()).slice(-2);
    var hours = ('0' + fecha.getHours()).slice(-2);
    var minutes = ('0' + fecha.getMinutes()).slice(-2);
    var seconds = ('0' + fecha.getSeconds()).slice(-2);

    var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    return formattedDate;
}

export function FormatDate(date) {
    var fecha = new Date(date)
    var year = fecha.getFullYear();
    var month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    var day = ('0' + fecha.getDate()).slice(-2);

    var formattedDate = year + '-' + month + '-' + day

    return formattedDate;
}
