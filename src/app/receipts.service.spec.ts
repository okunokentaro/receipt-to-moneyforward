/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReceiptsService } from './receipts.service';

describe('ReceiptsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiptsService]
    });
  });

  it('should ...', inject([ReceiptsService], (service: ReceiptsService) => {
    expect(service).toBeTruthy();
  }));
});
