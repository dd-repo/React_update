import { formatPrice } from 'utils';

describe('formatPrice', () => {
  it('should return a string', () => {
    const number = 39
    const string = '39'

    expect(formatPrice(number)).to.be.a('string')
    expect(formatPrice(string)).to.be.a('string')
  })

  it('should return the value with $', () => {
    const value = 39
    expect(formatPrice(value)).to.eql('$39')
  })

  it('should remove decimals', () => {
    const value = 39.00
    expect(formatPrice(value)).to.eql('$39')
  })
})
