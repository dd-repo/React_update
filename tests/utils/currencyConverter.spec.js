import currencyConverter from 'utils/currencyConverter';

describe('currencyConverter', () => {
  it('should return a string', () => {
    const value = 39
    expect(currencyConverter(value)).to.be.a('string')
  })

  it('should return the value with $', () => {
    const value = 39
    expect(currencyConverter(value)).to.eql('$39')
  })

  it('should remove decimals', () => {
    const value = 39.00
    expect(currencyConverter(value)).to.eql('$39')
  })
})
