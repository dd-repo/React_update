export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = (modalType, modalProps, func) => (
  {
    type: SHOW_MODAL,
    modalType,
    modalProps,
    func
  }
)

export const hideModal = () => (
  {
    type: HIDE_MODAL
  }
)

const reducer = (state={}, action) => {
  switch(action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
        onSubmit: action.func
      }
    case HIDE_MODAL:
      return {
        modalType: null,
        modalProps: {}
      }
    default:
      return state;
  }
  return state;
}

export default reducer;
