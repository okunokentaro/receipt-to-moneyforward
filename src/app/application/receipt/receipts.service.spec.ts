import {TestBed, inject} from '@angular/core/testing'

import {ReceiptsService} from './receipts.service'
import {ConfigService} from '../config/config.service'

describe('ReceiptsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ReceiptsService, useClass: ReceiptsService, deps: [ConfigService]},
        ConfigService,
      ]
    })
  })

  it('should ...', inject([ReceiptsService], (service: ReceiptsService) => {
    expect(service).toBeTruthy()
  }))
})
