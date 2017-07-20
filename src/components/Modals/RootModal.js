import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'modules/modal';
import UserModal from './components/User';
import AccountModal from './components/UpdateAccount';
import TransactionModal from './components/UpdateTransaction';
import KeywordModal from './components/UpdateKeyword';
import AddressModal from './components/UpdateAddress';
import PhoneModal from './components/UpdatePhone';
import ProfileModal from './components/UpdateProfile';
import SubscriptionModal from './components/UpdateSubscription';
import CardModal from './components/Card';

const MODAL_COMPONENTS = {
  'USER':         UserModal,
  'ACCOUNT':      AccountModal,
  'TRANSACTION':  TransactionModal,
  'KEYWORD':      KeywordModal,
  'ADDRESS':      AddressModal,
  'PHONE':        PhoneModal,
  'PROFILE':      ProfileModal,
  'SUBSCRIPTION': SubscriptionModal,
  'CARD':         CardModal
}

const ModalRoot = ({ modalType, modalProps, dispatch }) => {
  if(!modalType) {
    return <span />
  }

  const _hideModal = () => {
    dispatch(hideModal())
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal initialValues={modalProps} hideModal={_hideModal} />
}

export default connect(
  state => state.modal
)(ModalRoot)
