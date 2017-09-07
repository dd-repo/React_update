const BASE_URL = {
  'development': 'http://localhost:3000',
  'production' : 'https://api.clickadilly.com',
  'test'       : 'http://localhost:3000'
}

export default BASE_URL[process.env.NODE_ENV]
