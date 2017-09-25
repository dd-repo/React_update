import States from 'consts/states';

describe('States', () => {
  it('should return an array', () => {
    expect(States).to.be.an('Array')
  })

  it('should have a length of 56', () => {
    expect(States.length).to.eql(56)
  })
})
