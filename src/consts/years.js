export default Array.from((function*() {
  for (let i = 1; i < 100; i++) {
    let year = new Date().getFullYear() - i
    yield { value: year, label: year}
  }
})())

