import { ReceiptToMoneyforwardPage } from './app.po';

describe('receipt-to-moneyforward App', function() {
  let page: ReceiptToMoneyforwardPage;

  beforeEach(() => {
    page = new ReceiptToMoneyforwardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
