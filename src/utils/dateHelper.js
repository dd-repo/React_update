const formatDate = date => {
  if(date) {
    const strippedDate = date.substr(0, date.indexOf('T') === -1 ? date.length : date.indexOf('T'))
    const d = strippedDate.replace(/-/g, '\/')
    return new Date(d).toDateString()
  }
  return date
}

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d
}

const getNumberOfDays = (startDate, endDate) => {
  const end = endDate || new Date().toDateString()
  const start = formatDate(startDate)
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  return Math.ceil((Date.parse(end) - Date.parse(start)) / millisecondsPerDay)
}

export {
  formatDate,
  addDays,
  getNumberOfDays
}
