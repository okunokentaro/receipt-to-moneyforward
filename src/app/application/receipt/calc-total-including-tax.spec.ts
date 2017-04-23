import { calcTotalIncludingTax } from './calc-total-including-tax'

const fixtureDefault = {
  date:    new Date(),
  place:   'place',
  account: 'account',
}

const base = {lCatIndex: 0, mCatIndex: 0, content: ''}

const fixtureWithoutTax = Object.assign({
  transactions: [
    Object.assign({amount: 138, isTaxIncluded: false}, base),
    Object.assign({amount: 135, isTaxIncluded: false}, base),
    Object.assign({amount: 398, isTaxIncluded: false}, base),
    Object.assign({amount: 199, isTaxIncluded: false}, base),
    Object.assign({amount: 258, isTaxIncluded: false}, base),
    Object.assign({amount: 298, isTaxIncluded: false}, base),
  ],
  total:        1540
}, fixtureDefault)

const fixtureIncludingTax = Object.assign({
  transactions: [
    Object.assign({amount: 100, isTaxIncluded: true}, base),
    Object.assign({amount: 200, isTaxIncluded: true}, base),
    Object.assign({amount: 300, isTaxIncluded: true}, base),
  ],
  total:        600
}, fixtureDefault)

const fixtureMixTax = Object.assign({
  transactions: [
    Object.assign({amount: 100, isTaxIncluded: true},  base),
    Object.assign({amount: 200, isTaxIncluded: true},  base),
    Object.assign({amount: 300, isTaxIncluded: true},  base),
    Object.assign({amount: 101, isTaxIncluded: false}, base),
  ],
  total:        709
}, fixtureDefault)

const taxRate = 1.08

describe('calcTotalIncludingTax()', () => {
  it('should return with fixed tax when transactions have no tax', () => {
    const items    = calcTotalIncludingTax(fixtureWithoutTax as any, taxRate).transactions
    const result   = items.map((item) => item.amountFixed)
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
    const items    = calcTotalIncludingTax(fixtureIncludingTax as any, taxRate).transactions
    const result   = items.map((item) => item.amountFixed)
    const expected = [
      100,
      200,
      300,
    ]
    expect(expected).toEqual(result)
  })

  it('should return when mix tax', () => {
    const items    = calcTotalIncludingTax(fixtureMixTax as any, taxRate).transactions
    const result   = items.map((item) => item.amountFixed)
    const expected = [
      100,
      200,
      300,
      109,
    ]
    expect(expected).toEqual(result)
  })
})
