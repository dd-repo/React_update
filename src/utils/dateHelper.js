export const formatDate = date => {
  if(date) {
    const strippedDate = date.substr(0, date.indexOf('T') === -1 ? date.length : date.indexOf('T'))
    const d = strippedDate.replace(/-/g, '\/')
    return new Date(d).toDateString()
  }
  return
}
