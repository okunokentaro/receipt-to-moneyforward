/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {RouterTestingModule} from '@angular/router/testing'

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
      ]
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
