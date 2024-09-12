const Moment = require('moment-timezone');

function formatDate(date) {

    const newDate = new Date(date);
    const currentDate = new Date();

    newDate.setHours(currentDate.getHours());
    newDate.setMinutes(currentDate.getMinutes());
    newDate.setSeconds(currentDate.getSeconds());
    newDate.setMilliseconds(currentDate.getMilliseconds());

    const timeZone = 'America/Sao_Paulo';
    const setTime = Moment.tz(newDate, timeZone)
    const formatDate = new Date(setTime.format('YYYY-MM-DDTHH:mm:ss.SSS') + "Z");

    return formatDate;
}

module.exports = { formatDate };