import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityListComponent} from './city-list/city-list.component';
import {CityCreateComponent} from './city-create/city-create.component';
import {CityEditComponent} from './city-edit/city-edit.component';
import {CityDetailComponent} from './city-detail/city-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
  },
  {
    path: 'create',
    component: CityCreateComponent,
  },
  {
    path: 'edit/:id',
    component: CityEditComponent,
  },
  {
    path: 'detail/:id',
    component: CityDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
