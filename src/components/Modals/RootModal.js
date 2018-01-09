import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hideModal } from 'modules/modal'
import {
  UpdateUserModal,
  DeleteUserModal,
  AccountModal,
  TransactionModal,
  KeywordModal,
  CreateAddressModal,
  UpdateAddressModal,
  ProfileModal,
  PhoneModal,
  UpdateSubscriptionModal,
  CreateSubscriptionModal,
  CardModal,
  RemovalInstructionsModal,
  IdRequiredModal,
  PaymentFormModal,
  PaymentSuccessModal,
  TermsOfServiceModal,
  PrivacyPolicyModal,
  CancelSubscriptionModal,
  CanceledSubscriptionModal,
  AdminModal,
  DashboardWelcome
} from './components'

const MODAL_COMPONENTS = {
  'USER': UpdateUserModal,
  'DELETE_USER': DeleteUserModal,
  'ADMIN_UPDATE': AdminModal,
  'ACCOUNT': AccountModal,
  'TRANSACTION': TransactionModal,
  'KEYWORD': KeywordModal,
  'UPDATE_ADDRESS': UpdateAddressModal,
  'CREATE_ADDRESS': CreateAddressModal,
  'PHONE': PhoneModal,
  'PROFILE': ProfileModal,
  'UPDATE_SUBSCRIPTION': UpdateSubscriptionModal,
  'CREATE_SUBSCRIPTION': CreateSubscriptionModal,
  'CARD': CardModal,
  'REMOVAL_INSTRUCTIONS': RemovalInstructionsModal,
  'MONITORING_REQUEST_ID_REQUIRED': IdRequiredModal,
  'PAYMENT_FORM': PaymentFormModal,
  'PAYMENT_SUCCESS': PaymentSuccessModal,
  'TOS': TermsOfServiceModal,
  'PRIVACY_POLICY': PrivacyPolicyModal,
  'CANCEL_SUBSCRIPTION': CancelSubscriptionModal,
  'CANCELED_SUBSCRIPTION': CanceledSubscriptionModal,
  'DASHBOARD_WELCOME': DashboardWelcome
}

const ModalRoot = ({ ...otherProps, modalType, modalProps, dispatch }) => {
  const _hideModal = () => {
    dispatch(hideModal())
  }

  if (!modalType) {
    return <span />
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal
    initialValues={modalProps}
    hideModal={_hideModal}
    {...otherProps}
    />
}

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => state.modal
)(ModalRoot)
