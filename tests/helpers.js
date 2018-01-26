const keywords = {
  all: [
    { id: 1, label: 'keyword 1' },
    { id: 2, label: 'keyword 2' },
    { id: 3, label: 'keyword 3' },
    { id: 4, label: 'keyword 4' }
  ],
  currentKeyword: { id: 1, label: 'keyword 1' }
}

const user = {
  id: 1,
  first_name: 'first',
  last_name: 'last',
  email: 'email@email.com',
  role: 'client',
  group: 'frontend'
}

const googleResults = {
  isFetchin: false,
  all: [
    { id: 1, title: 'title 1', description: 'description 1', url: 'url/1', friendly_url: 'friendlyUrl/1', rank: 1, page_position: 1, page_number: 1, source: 'google', listing_site_id: null },
    { id: 2, title: 'title 2', description: 'description 2', url: 'url/2', friendly_url: 'friendlyUrl/2', rank: 2, page_position: 2, page_number: 1, source: 'google', listing_site_id: 123 },
    { id: 3, title: 'title 3', description: 'description 3', url: 'url/3', friendly_url: 'friendlyUrl/3', rank: 3, page_position: 3, page_number: 1, source: 'google', listing_site_id: null },
    { id: 4, title: 'title 4', description: 'description 4', url: 'url/4', friendly_url: 'friendlyUrl/4', rank: 4, page_position: 4, page_number: 1, source: 'google', listing_site_id: null },
    { id: 5, title: 'title 5', description: 'description 5', url: 'url/5', friendly_url: 'friendlyUrl/5', rank: 5, page_position: 5, page_number: 1, source: 'google', listing_site_id: null },
    { id: 6, title: 'title 6', description: 'description 6', url: 'url/6', friendly_url: 'friendlyUrl/6', rank: 6, page_position: 6, page_number: 1, source: 'google', listing_site_id: null },
    { id: 7, title: 'title 7', description: 'description 7', url: 'url/7', friendly_url: 'friendlyUrl/7', rank: 7, page_position: 7, page_number: 1, source: 'google', listing_site_id: null },
    { id: 8, title: 'title 8', description: 'description 8', url: 'url/8', friendly_url: 'friendlyUrl/8', rank: 8, page_position: 8, page_number: 1, source: 'google', listing_site_id: null },
    { id: 9, title: 'title 9', description: 'description 9', url: 'url/9', friendly_url: 'friendlyUrl/9', rank: 9, page_position: 9, page_number: 1, source: 'google', listing_site_id: null },
    { id: 10, title: 'title 10', description: 'description 10', url: 'url/1', friendly_url: 'friendlyUrl/10', rank: 10, page_position: 10, page_number: 1, source: 'google', listing_site_id: null }
  ],
  pagination: { page: 1, limit: 10, total: 30 }
}

const completedRequests = [
  { id: 1, completed_at: "2017-08-14T14:01:20.875-07:00", removed_url: 'www.whitepages.com/1', site: 'whitepages', requested_at: "2017-08-10T00:00:00.000-07:00" },
  { id: 2, completed_at: "2017-07-14T14:01:20.875-07:00", removed_url: 'www.whitepages.com/2', site: 'peoplefinder', requested_at: "2017-06-10T00:00:00.000-07:00" },
  { id: 1, completed_at: "2017-06-14T14:01:20.875-07:00", removed_url: 'www.whitepages.com/3', site: 'radaris', requested_at: "2017-05-10T00:00:00.000-07:00" }
]

const privacyRemovalStats = [
  { site: "addresses.com", value: 1 },
  { site: "peekyou.com", value: 1 },
  { site: "intelius.com", value: 1 },
  { site: "beenverified.com", value: 1 },
  { site: "spokeo.com", value: 1 },
  { site: "usa-people-search.com", value: 1 },
  { site: "publicrecordsnow.com", value: 1 },
  { site: "ussearch.com", value: 1 },
  { site: "peoplelookup.com", value: 1 },
  { site: "whitepages.com", value: 1 },
  { site: "zabasearch.com", value: 1 },
  { site: "peoplefinder.com", value: 1 },
  { site: "privateeye.com", value: 1 },
  { site: "peeepls.com", value: 1 },
  { site: "radaris.com", value: 1 },
  { site: "instantcheckmate.com", value: 1 },
  { site: "peoplefinders.com", value: 1 },
]

const privacyRemovalStatus = [
 {name: 'In Progress', value: 3},
 {name: 'In Queue', value: 3},
 {name: 'Potential Risks', value: 11}
]

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

export {
  keywords,
  user,
  googleResults,
  completedRequests,
  privacyRemovalStats,
  privacyRemovalStatus,
  errorRes
}

