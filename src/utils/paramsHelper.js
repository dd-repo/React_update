export const buildCreditCardParams = card => (
  {
    card_holder_name: card.fullName,
    card_number: sanitizeNums(card.creditCardNumber),
    card_month: card.expirationMonth.value,
    card_year: card.expirationYear.value,
    card_cvc: card.cvCode,
    address: card.address,
    city: card.city,
    state: card.state.value,
    zip: card.zipcode,
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

