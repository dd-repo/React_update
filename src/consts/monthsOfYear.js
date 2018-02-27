export default Array.from((function*() {
  for (let i = 1; i <= 12; i++)
    yield { value: i, label: i }
})())
