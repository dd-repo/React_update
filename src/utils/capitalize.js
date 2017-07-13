export default function (value) {
  if(typeof value === 'string') {
    const values = value.split(' ')
    const capitalizedWords = values.map(word => {
      return word !== '' ? word[0].toUpperCase() + word.slice(1) : ''
    })
    return capitalizedWords.join(' ')
  }
  return value
}
