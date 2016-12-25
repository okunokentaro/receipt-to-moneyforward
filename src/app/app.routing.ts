import {Routes, RouterModule} from '@angular/router'
import {InputComponent} from './input/input.component'
import {ConfigComponent} from './config/config.component'
import {CONFIG_PATH} from './constants'

const appRoutes: Routes = [
  {
    path     : '',
    component: InputComponent
  },
  {
    path     : CONFIG_PATH,
    component: ConfigComponent,
  },
  {
    path     : '**',
    component: InputComponent
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
