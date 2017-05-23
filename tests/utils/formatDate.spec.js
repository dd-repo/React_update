import { formatDate } from 'utils/dateHelper';

describe('formatDate', () => {

  it('should return formated date string', () => {
    const formattedDate = formatDate('2017-05-17')
    const expectedDate = new Date('2017/05/17').toDateString()
    expect(formattedDate).to.equal(expectedDate)
  })

  it('should format timestamp', () => {
    const formattedDate = formatDate('2017-05-17T13:16:17.265-07:00')
    const expectedDate = new Date('2017/05/17').toDateString()
    expect(formattedDate).to.equal(expectedDate)
  })
})
