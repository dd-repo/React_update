export const persistData = (state, selector) => {
    try {
      const formatedState = formatState(state, selector)
      const serializedState = JSON.stringify(formatedState)
      localStorage.setItem([selector], serializedState)
    } catch (err) {
      console.log('error in saveState function')
    }
}

export const loadPersistedData = (selector) => {
  try{
    const serializedState = localStorage.getItem(selector);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

const formatState = (state, selector) => {
  switch(selector) {
    case 'currentUser':
      return {
        id: state.id,
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        access_token: state.access_token,
        isFetching: false,
        account_id: state.accounts[0].id
      }
      case 'accounts':
        return {
          accounts: state
        }
    default:
      return state;
  }
  return state;
}
