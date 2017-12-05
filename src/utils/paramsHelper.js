export const buildCreditCardParams = (card, userId) => (
  {
    user: userId,
    card_holder_name: card.fullName,
    card_number: sanitizeNums(card.creditCardNumber),
    card_month: card.expirationMonth.value,
    card_year: card.expirationYear.value,
    card_cvc: card.cvCode,
    address: card.address,
    city: card.city,
    state: card.state.value,
    zip: card.zipcode,
    plan: 'trial'
  }
)

export const sanitizeNums = value => {
  return value.replace(/[^\d]/gi, '')
}

export const buildAddressParams = address => (
  {
    address1: address.address1,
    city: address.city,
    state: address.state,
    zip: address.zipcode,
    account_id: address.account_id
  }
)

export const buildKeywordParams = keyword => (
  {
    id: keyword.id,
    value: keyword.label
  }
)

export const buildSignupParams = user => {
  const userName = user.fullName.split(' ')
  const first = userName[0]
  const last = userName[userName.length - 1]
  return {
    user: {
      first_name: first,
      last_name: last,
      email: user.email,
      password: user.password,
      plan: 'trial'
    }
  }
}
