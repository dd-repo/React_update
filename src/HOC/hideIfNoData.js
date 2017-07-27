import { compose, renderNothing, branch } from 'recompose';

const hideIfNoData = hasNoData => (
  branch(
    hasNoData,
    renderNothing
  )
)

export default hideIfNoData
