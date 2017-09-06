const formatPrice = (value) => {
  let price = '';

  if(value) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });

    if(typeof value === 'number') { price = formatter.format(value) }
    if(typeof value === 'string') { price = formatter.format(parseInt(value)) }
    return price
  }
  return value
}

export default formatPrice;
