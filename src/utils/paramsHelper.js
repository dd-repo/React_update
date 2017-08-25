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

const sanitizeNums = value => {
  return value.replace(/[^\d]/gi, '')
}

