import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import {CityEditComponent} from './city-edit/city-edit.component';
import {CityListComponent} from './city-list/city-list.component';
import {CityCreateComponent} from './city-create/city-create.component';
import {FormsModule} from '@angular/forms';
import {CityDetailComponent} from './city-detail/city-detail.component';


@NgModule({
  declarations: [
    CityEditComponent,
    CityListComponent,
    CityCreateComponent,
    CityDetailComponent,
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    FormsModule
  ]
})
export class CityModule { }
