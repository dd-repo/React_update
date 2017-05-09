export const formatDate = date => {
  let d = date.replace(/-/g, '\/')
  return new Date(d).toDateString()
}
