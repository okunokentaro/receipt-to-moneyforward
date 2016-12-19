import * as jQuery from 'jquery'
import {Component} from '@angular/core'
import {ReceiptsService} from './receipts.service'

const rerenderDropdown = () => {
  requestAnimationFrame(() => (<any>jQuery('.ui.dropdown')).dropdown())
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Receipt to Money Forward'

  constructor(public receiptsService: ReceiptsService) {}

  onClickNew() {
    this.receiptsService.newReceipt()
    rerenderDropdown()
  }

  onClickAddTransaction(receiptIndex: number) {
    this.receiptsService.addTransaction(receiptIndex)
    rerenderDropdown()
  }

  get receipts() {
    return this.receiptsService.items
  }
}
