export const buildCreditCardParams = card => (
  {
    card_holder_name: card.fullName,
    card_number: sanitizeNums(card.creditCardNumber),
    card_month: card.expirationDate.slice(0,2),
    card_year: card.expirationDate.slice(3),
    card_cvc: card.cvCode,
    address: card.address,
    city: card.city,
    state: card.state,
    zip: card.zipcode,
  }
)

const sanitizeNums = value => {
  return value.replace(/[^\d]/gi, '')
}

