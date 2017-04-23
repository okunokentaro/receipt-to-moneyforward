import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FormsModule} from '@angular/forms'
import {RouterTestingModule} from '@angular/router/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

import {ConfigComponent} from './config.component'
import {ConfigService} from '../../application/config/config.service'

describe('ConfigComponent', () => {
  let component: ConfigComponent
  let fixture: ComponentFixture<ConfigComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfigComponent,
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      providers: [
        ConfigService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
