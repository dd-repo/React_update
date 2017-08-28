import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'modules/modal';
import UserModal from './components/User';
import AccountModal from './components/Account';
import TransactionModal from './components/Transaction';
import KeywordModal from './components/Keyword';
import { CreateAddressModal, UpdateAddressModal } from './components/Address';
import PhoneModal from './components/Phone';
import ProfileModal from './components/Profile';
import { UpdateSubscriptionModal, CreateSubscriptionModal } from './components/Subscription';
import CardModal from './components/Card';
import RemovalInstructionsModal from './components/Monitoring/RemovalInstructions';
import { PaymentFormModal, PaymentSuccessModal } from './components/Payment';
import TermsOfServiceModal from './components/TOS';
import PrivacyPolicyModal from './components/PrivacyPolicy';

const MODAL_COMPONENTS = {
  'USER':                UserModal,
  'ACCOUNT':             AccountModal,
  'TRANSACTION':         TransactionModal,
  'KEYWORD':             KeywordModal,
  'UPDATE_ADDRESS':      UpdateAddressModal,
  'CREATE_ADDRESS':      CreateAddressModal,
  'PHONE':               PhoneModal,
  'PROFILE':             ProfileModal,
  'UPDATE_SUBSCRIPTION': UpdateSubscriptionModal,
  'CREATE_SUBSCRIPTION': CreateSubscriptionModal,
  'CARD':                CardModal,
  'REMOVAL_INSTRUCTIONS': RemovalInstructionsModal,
  'PAYMENT_FORM':        PaymentFormModal,
  'PAYMENT_SUCCESS':     PaymentSuccessModal,
  'TOS':                 TermsOfServiceModal,
  'PRIVACY_POLICY':      PrivacyPolicyModal,
  'REMOVAL_INSTRUCTIONS': RemovalInstructionsModal
}

const ModalRoot = ({...otherProps, modalType, modalProps, dispatch }) => {
  if(!modalType) {
    return <span />
  }

  const _hideModal = () => {
    dispatch(hideModal())
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal
    initialValues={modalProps}
    hideModal={_hideModal}
    {...otherProps}
    />
}

export default connect(
  state => state.modal
)(ModalRoot)
