export default Array.from((function*() {
  for (let i = 1; i < 32; i++) {
    yield {value: i, label: i}
  }
})())

