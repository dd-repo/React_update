import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'modules/modal';
import UserModal from './components/User';
import AccountModal from './components/Account';
import TransactionModal from './components/Transaction';
import KeywordModal from './components/Keyword';
import AddressModal from './components/Address';
import PhoneModal from './components/Phone';
import ProfileModal from './components/Profile';
import { UpdateSubscriptionModal, CreateSubscriptionModal } from './components/Subscription';
import CardModal from './components/Card';

const MODAL_COMPONENTS = {
  'USER':                UserModal,
  'ACCOUNT':             AccountModal,
  'TRANSACTION':         TransactionModal,
  'KEYWORD':             KeywordModal,
  'ADDRESS':             AddressModal,
  'PHONE':               PhoneModal,
  'PROFILE':             ProfileModal,
  'UPDATE_SUBSCRIPTION': UpdateSubscriptionModal,
  'CREATE_SUBSCRIPTION': CreateSubscriptionModal,
  'CARD':                CardModal
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
