import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickerPage } from './picker';

@NgModule({
  declarations: [
    PickerPage,
  ],
  imports: [
    IonicPageModule.forChild(PickerPage),
  ],
})
export class PickerPageModule {}
