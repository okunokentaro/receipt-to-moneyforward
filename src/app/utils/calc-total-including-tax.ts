import {Receipt} from '../services/receipts.service'

export const calcTotalIncludingTax = (receipt: Receipt, taxRate: number): Receipt => {
  const transactionsIncludingTax = receipt.transactions.reduce((acc, transaction) => {
    const amountIncludingTax = transaction.isTaxIncluded
      ? transaction.amount
      : transaction.amount * taxRate

    const obj = {
      sortNumber   : acc.currentSortNumber,
      amountFloored: void 0 as number,
      amountFixed  : void 0 as number,
      amountIncludingTax
    }

    obj.amountFloored = Math.floor(obj.amountIncludingTax)

    acc.currentSortNumber += 1
    acc.returnArray.push(obj)
    return acc
  }, {
    currentSortNumber: 0,
    returnArray: []
  }).returnArray

  const totalIncludingTax = transactionsIncludingTax.reduce((acc, transaction) => {
    return acc + transaction.amountFloored
  }, 0)
  const diff = receipt.total - totalIncludingTax

  const sorted = transactionsIncludingTax.sort((a, b) => {
    return (b.amountIncludingTax - b.amountFloored) - (a.amountIncludingTax - a.amountFloored)
  })

  const fixed = sorted.reduce((acc, transaction) => {
    if (acc.remainDiff < 1) {
      transaction.amountFixed = transaction.amountFloored
      acc.returnArray.push(transaction)
      return acc
    }
    transaction.amountFixed = transaction.amountFloored + 1
    acc.remainDiff -= 1
    acc.returnArray.push(transaction)
    return acc
  }, {
    remainDiff: diff,
    returnArray: []
  }).returnArray.sort((a, b) => {
    return a.sortNumber - b.sortNumber
  })

  fixed.forEach((transaction, i) => {
    receipt.transactions[i].amountFixed = transaction.amountFixed
  })
  return receipt
}
