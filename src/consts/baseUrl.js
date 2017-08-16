const BASE_URL = {
  'development': 'http://localhost:3000',
  'production' : 'http://staging-app.clickadilly.com:3000',
  'test'       : 'http://localhost:3000'
}

export default BASE_URL[process.env.NODE_ENV]
