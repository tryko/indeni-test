export const monthNames = ['JAN','FEB','MAR','APR','MAY','JUN', 'JUL', 'AUG','SEP','OCT','DEC']
export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri','Sat']

export const getDate = (date) => {
    const monthName = monthNames[new Date(date).getMonth()];
    const monthDay = new Date(date).getDate();
    const weekDayName = weekDayNames[new Date(date).getDay()];
    return {
        weekDayName,
        monthDay,
        monthName
    }
}
