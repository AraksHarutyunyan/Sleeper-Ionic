import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewEntryPage } from './create-new-entry';

@NgModule({
  declarations: [
    CreateNewEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewEntryPage),
  ],
})
export class CreateNewEntryPageModule {}
