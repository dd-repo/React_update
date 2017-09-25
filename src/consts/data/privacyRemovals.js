const date = new Date()
const createDate = time => {
  date.setHours(date.getHours() - time)
  return date.toISOString()
}

export default [
  {
    id: 1,
    completed_at: createDate(10),
    requested_at: createDate(30),
    removed_url: 'http://www.whitepages.com/your-personal-information',
    site: 'http://www.whitepages.com'
  },
  {
    id: 2,
    completed_at: createDate(24),
    requested_at: createDate(60),
    removed_url: 'http://www.radaris.com/your-personal-information',
    site: 'http://www.radaris.com'
  },
  {
    id: 3,
    completed_at: createDate(48),
    requested_at: createDate(90),
    removed_url: 'http://www.peoplefinder.com/your-personal-information',
    site: 'http://www.peoplefinder.com'
  },
  {
    id: 4,
    completed_at: createDate(72),
    requested_at: createDate(120),
    removed_url: 'http://www.spokeo.com/your-personal-information',
    site: 'http://www.spokeo.com'
  },
  {
    id: 5,
    completed_at: createDate(100),
    requested_at: createDate(150),
    removed_url: 'http://www.peekyou.com/your-personal-information',
    site: 'http://www.peekyou.com'
  }
]
