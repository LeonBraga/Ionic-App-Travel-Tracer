import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddGastoModalPage } from './add-gasto-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddGastoModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddGastoModalPage]
})
export class AddGastoModalPageModule {}
