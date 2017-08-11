import { branch, renderComponent } from 'recompose';
import { Loader } from 'components';

const SpinnerWhileLoading = isFetching => (
  branch(
    isFetching,
    renderComponent(Loader)
  )
)

export default SpinnerWhileLoading;

