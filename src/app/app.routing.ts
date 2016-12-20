import {Routes, RouterModule} from '@angular/router'
import {InputComponent} from './input/input.component'
import {ConfigComponent} from './config/config.component'

const appRoutes: Routes = [
  {
    path     : '',
    component: InputComponent
  },
  {
    path     : 'config',
    component: ConfigComponent,
  },
  {
    path     : '**',
    component: InputComponent
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
