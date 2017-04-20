const API_URL = {
  'development': 'http://localhost:3000',
  'production' : 'http://api.blitzmonitoring.com'
}

export const BASE_URL = API_URL[process.env.NODE_ENV]
