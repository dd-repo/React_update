import capitalize from 'utils/capitalize';

describe('capitalize', () => {
  it('should return the string caplitalized', () => {
    const string = 'name'

    expect(capitalize(string)).to.eql('Name')
  })

  it('should return value if not a string', () => {
    const number = 37

    expect(capitalize(number)).to.eql(number)
  })

  it('should capitalize each word', () => {
    const fullName = 'first last'

    expect(capitalize(fullName)).to.eql('First Last')
  })
})
