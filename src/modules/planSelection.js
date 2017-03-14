// constants
export const PLAN_ADD = 'PLAN_ADD';


// actions
export const addPlan = plan => (
  {
    type: PLAN_ADD,
    plan
  }
);

// reducer
const reducer = (state={}, action) => {
  switch(action.type) {
    case PLAN_ADD:
      return Object.assign({}, state, {
        type: action.plan.type,
        price: action.plan.price
      })
    default:
      return state
  }
  return state
}

export default reducer;
