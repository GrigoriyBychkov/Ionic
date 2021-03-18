import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StateService} from '../services/state.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
      StateService
  ]
})
export class SharedModule { }
