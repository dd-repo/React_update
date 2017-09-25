import { formatDate, getNumberOfDays } from 'utils';

describe('Date Helpers', () => {
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

  describe('getNumberOfDays', () => {
    it('should return a number of 10', () => {
      const startDate = '2017-09-01'
      const endDate = '2017-09-11'
      const numberOfDays = getNumberOfDays(startDate, endDate)
      const expected = 10
      expect(numberOfDays).to.eql(expected)
      expect(numberOfDays).to.be.a('number')
    })
  })
})
