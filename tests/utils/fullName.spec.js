import getFullName from 'utils/fullName';

describe('getFullName()', () => {
  it('returns first and last name in a string', () => {
    const user = { first_name: 'first', last_name: 'last' }

    expect(getFullName(user)).to.eql('first last')
  })

  it('returns value if not an object', () => {
    const user = 'first last'
    const userList = ['first', 'last']
    const number = 55

    expect(getFullName(user)).to.eql(user)
    expect(getFullName(userList)).to.eql(userList)
    expect(getFullName(number)).to.eql(number)
  })
})
