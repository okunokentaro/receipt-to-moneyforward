/* tslint:disable:no-unused-variable */
import {calcTotalIncludingTax} from './calc-total-including-tax'

const fixtureWithoutTax = {
  date: new Date(),
  place: 'place',
  account: 'account',
  transactions: [
    {amount: 138, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: false},
    {amount: 135, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: false},
    {amount: 398, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: false},
    {amount: 199, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: false},
    {amount: 258, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: false},
    {amount: 298, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: false},
  ],
  total: 1540
}

const fixtureIncludingTax = {
  date: new Date(),
  place: 'place',
  account: 'account',
  transactions: [
    {amount: 100, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: true},
    {amount: 200, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: true},
    {amount: 300, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: true},
  ],
  total: 600
}

const fixtureMixTax = {
  date: new Date(),
  place: 'place',
  account: 'account',
  transactions: [
    {amount: 100, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: true},
    {amount: 200, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: true},
    {amount: 300, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: true},
    {amount: 101, lCatIndex: 0, mCatIndex: 0, content: '', isTaxIncluded: false},
  ],
  total: 709
}

const taxRate = 1.08

describe('calcTotalIncludingTax()', () => {
  it('should return with fixed tax when transactions have no tax', () => {
    const items  = calcTotalIncludingTax(fixtureWithoutTax, taxRate).transactions
    const result = items.map((item) => item.amountFixed)
    const expected = [
      149,
      146,
      430,
      215,
      278,
      322,
    ]
    expect(expected).toEqual(result)
  })

  it('should return amount as it is when already including tax', () => {
    const items  = calcTotalIncludingTax(fixtureIncludingTax, taxRate).transactions
    const result = items.map((item) => item.amountFixed)
    const expected = [
      100,
      200,
      300,
    ]
    expect(expected).toEqual(result)
  })

  it('should return when mix tax', () => {
    const items  = calcTotalIncludingTax(fixtureMixTax, taxRate).transactions
    const result = items.map((item) => item.amountFixed)
    const expected = [
      100,
      200,
      300,
      109,
    ]
    expect(expected).toEqual(result)
  })
})
