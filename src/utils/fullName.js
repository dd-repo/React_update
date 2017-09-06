import capitalize from 'utils/capitalize';

export default function(obj) {
  if(typeof obj === 'object' && !Array.isArray(obj)) {
    const {first_name, last_name} = obj

    return capitalize(`${first_name} ${last_name}`)
  }
  return obj
}
