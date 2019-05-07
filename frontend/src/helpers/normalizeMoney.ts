export const normalizeMoney = (amount: string = ''): string => {
  if (amount === '') return ''

  const amountNum = parseFloat(amount)
  const decimalCount = 2
  const thousands = ','
  const decimal = '.'

  let i = parseInt(
    Math.abs(Number(amount) || 0).toFixed(decimalCount),
  ).toString()
  let j = i.length > 3 ? i.length % 3 : 0

  return (
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
    (decimalCount
      ? decimal +
        Math.abs(amountNum - parseFloat(i))
          .toFixed(decimalCount)
          .slice(2)
      : '')
  )
}
